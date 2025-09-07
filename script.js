const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');
const scoreElement = document.getElementById('score');

const audioStart = new Audio('./song/audio_theme.mp3');
const audioGameOver = new Audio('./song/audio_gameover.mp3');

let loopInterval;
let scoreInterval;
let score = 0;

const startGame = () => {
    pipe.classList.add('pipe-animation');
    start.style.display = 'none';
    gameOver.style.display = 'none';

    score = 0;
    scoreElement.textContent = score;

    audioStart.currentTime = 0;
    audioStart.play();

    scoreInterval = setInterval(() => {
        score++;
        scoreElement.textContent = score;
    }, 100);
};

const restartGame = () => {
    start.style.display = 'none';
    gameOver.style.display = 'none';

    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';
    mario.style.marginLeft = '0';
    mario.classList.remove('jump');

    pipe.classList.remove('pipe-animation');
    void pipe.offsetWidth;
    pipe.classList.add('pipe-animation');
    pipe.style.left = '';
    pipe.style.right = '0';

    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.currentTime = 0;
    audioStart.play();

    score = 0;
    scoreElement.textContent = score;

    clearInterval(scoreInterval);
    scoreInterval = setInterval(() => {
        score++;
        scoreElement.textContent = score;
    }, 100);

    clearInterval(loopInterval);
    loop();
};

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 800);
};

const loop = () => {
    loopInterval = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = parseFloat(getComputedStyle(mario).bottom);

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 90) {
            pipe.classList.remove('pipe-animation');
            pipe.style.left = `${pipePosition}px`;

            mario.src = './img/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '50px';

            audioStart.pause();
            audioGameOver.play();

            gameOver.style.display = 'flex';

            clearInterval(loopInterval);
            clearInterval(scoreInterval);
        }
    }, 10);
};

loop();

document.addEventListener('keypress', e => {
    if (e.key === ' ') {
        jump();
    } else if (e.key === 'Enter') {
        startGame();
    }
});

document.addEventListener('touchstart', e => {
    if (e.touches.length) {
        jump();
    }
});
