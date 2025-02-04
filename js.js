const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird = {
  x: 50,
  y: 150,
  width: 20,
  height: 20,
  gravity: 0.6,
  lift: -10,
  velocity: 0,
};
let pipes = [];
let score = 0;

document.addEventListener('keydown', () => (bird.velocity = bird.lift));

function drawBird() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = 'green';
  pipes.forEach((pipe) => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  });
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;
}

function updatePipes() {
  if (frames % 90 === 0) {
    let gap = 100;
    let top = Math.random() * (canvas.height - gap);
    pipes.push({
      x: canvas.width,
      width: 40,
      top: top,
      bottom: canvas.height - top - gap,
    });
  }
  pipes.forEach((pipe) => (pipe.x -= 2));

  pipes = pipes.filter((pipe) => pipe.x + pipe.width > 0);
}

function checkCollision() {
  for (let pipe of pipes) {
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
    ) {
      resetGame();
    }
  }

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    resetGame();
  }
}

function resetGame() {
  bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.6,
    lift: -10,
    velocity: 0,
  };
  pipes = [];
  score = 0;
  frames = 0;
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 25);
}

let frames = 0;

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateBird();
  updatePipes();
  checkCollision();

  drawBird();
  drawPipes();
  drawScore();

  pipes.forEach((pipe) => {
    if (pipe.x + pipe.width === bird.x) {
      score++;
    }
  });

  frames++;
  requestAnimationFrame(gameLoop);
}

gameLoop();
