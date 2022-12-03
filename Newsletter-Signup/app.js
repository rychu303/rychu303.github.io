//EXPRESS
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;  
//.DOTENV
require("dotenv").config();
//BODY PARSER
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
// EXPRESS STATIC
app.use(express.static("public"));
//HTTPS REQUESTS
const https = require("https");

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res)=> {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.emailAddress;
    const MCAPI_KEY = process.env.API_KEY;
    const MCLIST_ID = process.env.LIST_ID;
    const MCAPI_SERVER = process.env.API_SERVER;

    const data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }

            }

        ]
        
    }

    let jsonData = JSON.stringify(data);

    const url = "https://" + MCAPI_SERVER + ".api.mailchimp.com/3.0/lists/" + MCLIST_ID;
    const options = {
        method: "POST",
        auth: "rchungUserName:" + MCAPI_KEY
    }

    const mcRequest = https.request(url, options, function(response) {
        console.log(response.statusCode);
        //ROUTES SUCCESS OR FAILURE PAGE DEPENDING ON THE STATUSCODE SENT BACK FROM THE SERVER
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html"); 
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data)=>{
                console.log(JSON.parse(data));
        });
    });

    mcRequest.write(jsonData);
    mcRequest.end();

});

//REDIRECTS THE RETRY BUTTON ON FAILURE PAGE BACK TO THE HOME ROUTE
app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});