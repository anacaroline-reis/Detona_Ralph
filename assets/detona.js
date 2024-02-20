const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        left: document.getElementById('left'),
        score: document.getElementById('score'),
    },
    values: {
        timerId: null,
        gameVelocity: 700,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        countTime: setInterval(countDown,1000),
    },
};
function countDown(){
    state.values.currentTime--;
    state.view.left.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.values.countTime);
        playGameOverSound();
        alert(`Game Over!! Seu resultado foi: ${state.values.result}`);
}
    }
    

function playGameOverSound() {
    let gameOverSound = new Audio("./assets/videogame-death-sound-43894.mp3");
    gameOverSound.play();
    gameOverSound.onended = function () {
    gameOverSound.pause();
    gameOverSound.currentTime = 0;
    }
}


function playSound() {
    let audio = new Audio("./assets/src_audios_hit.m4a");
    audio.volume = 0.2;
    audio.play();
}



function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let random = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[random];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
        if(square.id === state.values.hitPosition){
            state.values.result++
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound();
    
        }
        });
    });
}

function init() {
    alert('Olá, pronto para iniciar?');
    moveEnemy();
    addListenerHitBox();
}

init();
