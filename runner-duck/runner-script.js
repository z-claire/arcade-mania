const road = document.querySelectorAll('#grid > div');
const scoreEl = document.querySelector('#score');

// add the duck to the div with index 1
const duckIdx = 1;
const duck = road[duckIdx];
duck.classList.add('duck');

let plantSpeed = 200;
let score = 0;
scoreEl.innerText = score;

let jumpSound = new Audio('./audio/jump.mp3');
let crashSound = new Audio('./audio/crash.mp3');

addPlant();

function addPlant() {
    // add the plant to the last div 
    let currentPlantIdx = road.length - 1;
    road[currentPlantIdx].classList.add('plant');

    let plantInterval = setInterval(movePlant, plantSpeed);

    function movePlant() {
        score++; 
        scoreEl.innerText = score;
    
        // when the road reach 50 increase speed
        if (score % 50 === 0) {
            plantSpeed = plantSpeed - 20;
        }
    
        // remove the plant from the current div index
        road[currentPlantIdx].classList.remove('plant');
        // decrease the div index value
        currentPlantIdx--;
        // when the index reach 0 stop the interval 
        if (currentPlantIdx < 0) {
            clearInterval(plantInterval);
            // when the plant disappear, create another plant
            addPlant();
            return;
        }
    
        // check if crash
        checkCrash();
    
        // add the plant to the next div
        road[currentPlantIdx].classList.add('plant');
    }

    function checkCrash() {
        // if there are plant and duck on the same div
        // and the duck is not jumping
        if (
            currentPlantIdx === duckIdx && 
            !road[currentPlantIdx].classList.contains('duck-jump')
        ) {
            // crash
            clearInterval(plantInterval);
            crashSound.play();
            // see the plant instead of the duck
            road[currentPlantIdx].classList.remove('duck');
            road[currentPlantIdx].classList.add('plant');
            showAlert('CRASH!');
            return;
        }
    }
}

// listen when a key is pressed
document.addEventListener('keydown', jump);

function jump(event) {
    // check if I clicked space only once
    if (event.code === 'Space' && !event.repeat) {
        jumpSound.play();
        duck.classList.add('duck-jump');
        setTimeout(function() {
            duck.classList.remove('duck-jump');
        }, 300);
    }
}