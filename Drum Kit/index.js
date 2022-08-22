//click listener

const drumNum1 = document.querySelectorAll('.drum');

for(let i = 0; i < drumNum1.length; i++) {
    drumNum1[i].addEventListener('click', function () {
        let buttons = this.innerHTML;   
        makeSound(buttons);
        keyAnimation(buttons);
    })
};

//key listener

    document.addEventListener('keydown', function() {;
        let keyPressed = event.key;
        makeSound(keyPressed);
        keyAnimation(keyPressed);
    });

//function for making key sounds

function makeSound(key) {
    
    switch(key) {
        case 'w':
            let tomClicked1 = new Audio('sounds/tom-1.mp3');
            tomClicked1.play();
            break;

        case 'a':
            let tomClicked2 = new Audio('sounds/tom-2.mp3');
            tomClicked2.play();
            break;

        case 's':
            let tomClicked3 = new Audio('sounds/tom-3.mp3');
            tomClicked3.play();
            break;

        case 'd':
            let tomClicked4 = new Audio('sounds/tom-4.mp3');
            tomClicked4.play();
            break;

        case 'j':
            let snareClicked = new Audio('sounds/snare.mp3');
            snareClicked.play();
            break;

        case 'k':
            let crashClicked = new Audio('sounds/crash.mp3');
            crashClicked.play();
            break;

        case 'l':
            let kickBassClicked = new Audio('sounds/kick-bass.mp3');
            kickBassClicked.play();
            break;
            
        default:
            console.log(key);
            break;
    }
}

//function for key press animations

function keyAnimation (currentKey) {
    let activeButton = document.querySelector("." + currentKey);
        activeButton.classList.add('pressed');
        setTimeout(() => {
            activeButton.classList.remove("pressed");
        }, 100);
} 

