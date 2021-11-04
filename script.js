const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const bird = new Image(); // Создание объекта
const bg = new Image(); // Создание объекта
const fg = new Image(); // Создание объекта
const pipeUp = new Image(); // Создание объекта
const pipeBottom = new Image(); // Создание объекта

bird.src = 'images/flappy-don.png'; // Указание нужного изображения
bg.src = 'images/flappy_bird_bg.png'; // Аналогично
fg.src = 'images/flappy_bird_fg.png'; // Аналогично
pipeUp.src = 'images/flappy_bird_pipeUp.png'; // Аналогично
pipeBottom.src = 'images/flappy_bird_pipeBottom.png'; // Аналогично

// Звуковые файлы
const fly = new Audio(); // Создание аудио объекта
const score_audio = new Audio(); // Создание аудио объекта
const game_over = new Audio();

fly.src = 'audio/fly.mp3'; // Указание нужной записи
score_audio.src = 'audio/score.mp3'; // Аналогично
game_over.src = 'audio/game over.mp3';

const gap = 200;

// При нажатии на какую-либо кнопку
document.addEventListener('keydown', moveUp);

function moveUp() {
	yPos -= 25;
	fly.play();
}

// Создание блоков
let pipe = [];

pipe[0] = {
	x: cvs.width,
	y: 0,
};

let score = 0;
// Позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1.5;

function draw() {
	ctx.drawImage(bg, 0, 0);

	for (let i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

		if (pipe[i].x == 80) {
			pipe.push({
				x: cvs.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
			});
		}

		// Отслеживание прикосновений
		if (
			(xPos + bird.width >= pipe[i].x &&
				xPos <= pipe[i].x + pipeUp.width &&
				(yPos <= pipe[i].y + pipeUp.height ||
					yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
			yPos + bird.height >= cvs.height - fg.height
		) {
			location.reload(); // Перезагрузка страницы
			game_over.play();
		}

		if (pipe[i].x == 5) {
			score++;
			score_audio.play();
		}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += grav;

	ctx.fillStyle = '#000';
	ctx.font = '24px Verdana';
	ctx.fillText('Счет: ' + score, 10, cvs.height - 20);

	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
