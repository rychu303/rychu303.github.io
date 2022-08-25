let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ['red', 'blue', 'green', 'yellow'];
let levelNum = 0;

//GAME START

function gameStart() {
    $(document).one('keydown', function(){
        $('h1').text("Level " + levelNum);
            setTimeout(() => {
                nextSequence();
            }, 800);
    });
}

gameStart();

//USER BUTTON CLICK EVENT

$('.btn').on('click', function() {
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    let previousAnswer = userClickedPattern.length-1;
    checkAnswer(previousAnswer);   
});

//CLICK CHECKER

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('Success');
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                $('h1').text("Level " + levelNum); // difference
                gamePatternReplay(); // difference
            }, 1000); // difference
        }
    }else{
        console.log("Wrong");
        let wrongSound = new Audio('sounds/wrong.mp3'); //difference
        wrongSound.play(); 
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
       $('h1').html("<h1>Game Over.<br />Press Any Key to Restart.</h1>");
       startOver()
    }
}

//COMPUTER GENERATED PATTERN

function nextSequence() { //very different
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeOut(300).fadeIn(300);
    playSound(randomChosenColor);
    levelNum++;
    // $('h1').text("Level " + levelNum);
    userClickedPattern = [];
}

//BUTTON SOUNDS

function playSound(soundName){
    let simonSound = new Audio('sounds/' + soundName + '.mp3');
    simonSound.play();
}

//BUTTON ANIMATION ON CLICK

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed')
    setTimeout(function() {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

//GAME PATTERN REPLAY FUNCTION

function gamePatternReplay() {
    let currentNumberOfClicks = userClickedPattern.length;
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => {
            let gamePatternColor = gamePattern[i];
            $('#' + gamePatternColor).fadeOut(300).fadeIn(300);
            playSound(gamePatternColor);
        }, i * 700);
    }
    setTimeout(function() {
        nextSequence();
    }, currentNumberOfClicks * 700);
}

//GAME RESTART
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    levelNum = 0;
    $(document).one('keydown', function(){
        $('h1').text("Level " + levelNum);
            nextSequence();
    });
}