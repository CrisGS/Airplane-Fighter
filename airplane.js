let seconds = 0, stepMove = 100, asteroidId = 0, obstacle, gameOver = false, alreadyPressed = false, displayTimes = 0;
let horizontalPositions = [15, 115, 215], xPos, airplanePosition, myInterval, generateInterval, obstaclesAvoided = 0;
let mousePosition, offset = [0,0], div, isDown = false;
let bulletsId = 0, playerPosition;

function startGame() {
  if (gameOver === false && alreadyPressed === false) {
    generateAirplane();
    bullet.generate();
    generateInterval = setInterval(generateObstacles, 1200);
    document.onkeydown = move;
    alreadyPressed = true;
  }
}

class Obstacles {
    
	constructor(ids) {
  	this.ids = ids;
  }
  
  addObstacle() {
  	obstacle = document.createElement('img');
    obstacle.src = 'asteroid.png';
    obstacle.id = this.ids;
    obstacle.classList.add('asteroid');
    obstacle.style.top = "-150px";
    obstacle.style.left = horizontalPositions[Math.floor(Math.random() * 3)] + 'px';
    document.getElementById("table-game").appendChild(obstacle);
  }

  falling() {
    let fallingInterval = setInterval(() => {
      document.getElementById(this.ids).style.top = parseInt(document.getElementById(this.ids).style.top) + 1 + 'px';
      const obstaclePosition = document.getElementById(this.ids).getBoundingClientRect();
      checkCollision(obstaclePosition);
      if (gameOver === false) {
        document.getElementById('score').innerText = obstaclesAvoided;
      }
      if (parseInt(document.getElementById(this.ids).style.top) === 500) {
        ++obstaclesAvoided;
        clearInterval(fallingInterval);
        document.getElementById(this.ids).remove();
      }
    }, 5);
  }
}

function generateAirplane() {
  let airplane = document.createElement('div');
  airplane.id = 'airplane';
  airplane.classList.add('airplane');
  document.getElementById("table-game").appendChild(airplane);
  airplanePosition = document.getElementById("airplane");
  airplanePosition.style.left = "100px";
  let torch = document.createElement('img');
  torch.src = 'fire.png';
  torch.classList.add('bullets');
  torch.style.top = '75px';
  torch.style.left = '25px';
  document.getElementById('airplane').appendChild(torch);
}

function generateObstacles() {
  let asteroid = new Obstacles(asteroidId);
  asteroid.addObstacle();
  asteroid.falling();
  ++asteroidId;
}

function displayScore() {
  if (displayTimes === 1) {
    let divElement = document.createElement('div');
    divElement.classList.add('messageContainer');
    let gameOver = document.createElement('span');
    gameOver.classList.add('gameOver');
    gameOver.innerText = "Game Over!"
    let score = document.createElement('span');
    score.classList.add('score');
    score.id = 'score';
    score.innerText = "Your score: " + obstaclesAvoided;
    divElement.appendChild(gameOver);
    divElement.appendChild(score);
    document.getElementById("table-game").appendChild(divElement);
    document.getElementById("table-game").style.boxShadow = "inset 0px 0px 25px 5px red";
  }
}

function move(e) {
  if (gameOver === false) {
    document.getElementById("play").blur();
    if (e.keyCode == 37 && parseInt(airplanePosition.style.left) > 0) {
      airplanePosition.style.left = parseInt(airplanePosition.style.left) - 100 + 'px';
    } else if (e.keyCode == 39 && parseInt(airplanePosition.style.left) < 200) {
      airplanePosition.style.left = parseInt(airplanePosition.style.left) + 100 + 'px';
    }
  }
}

function checkCollision(asteroidPosition) {
  const airplanePosition = document.getElementById('airplane').getBoundingClientRect();
  const asteroidLeft = asteroidPosition.left;
  const asteroidRight = asteroidPosition.right;
  const asteroidTop = asteroidPosition.top;
  const asteroidBottom = asteroidPosition.bottom;
  if (airplanePosition.right > asteroidLeft && airplanePosition.left < asteroidRight &&
    airplanePosition.bottom > asteroidTop && airplanePosition.top < asteroidBottom) {
    clearInterval(generateInterval);
    clearInterval(myInterval);
    ++displayTimes;
    displayScore();
    gameOver = true;
  }
}

function resetGame() {
  location.reload();
}