let seconds = 0, stepMove = 100, asteroidId = 0, obstacle, gameOver = false, alreadyPressed = false, displayTimes = 0;
let horizontalPositions = [15, 115, 215], xPos, airplanePosition, myInterval, generateInterval, autoShoot, obstaclesAvoided = 0;
let mousePosition, offset = [0,0], div, isDown = false;
let bulletsId, number = 0;


function startGame() {
  if (gameOver === false && alreadyPressed === false) {
    generateAirplane();
    generateInterval = setInterval(generateObstacles, 1200);
    document.onkeydown = move;
    alreadyPressed = true;
  }
}

class Bullets {
  constructor(ids){
    this.ids = ids;
  }

  getYpos() {
    return Math.floor(document.getElementById(this.id).getBoundingClientRect().top);
  }

  generateBullets() {
    let bullet = document.createElement('img');
    bullet.src ='fire.png';
    bullet.id = this.ids;
    bullet.classList.add('bullet');
    bullet.style.top = '0px';
    bullet.style.left = '25px';
    bullet.setAttribute('class', 'bullets');
    document.getElementById("airplane").appendChild(bullet);
  }



  fly() {
    let movingInterval = setInterval(() => {
      document.getElementById(this.ids).style.top = parseInt(document.getElementById(this.ids).style.top) - 2 + 'px';
      if(parseInt(document.getElementById(this.ids).style.top) < -400) {
        clearInterval(movingInterval);
        document.getElementById(this.ids).remove();
        if(gameOver === true) {
          clearInterval(autoShoot);
        }
      }
    }, 10);
  }
}

function shoot() {
  bulletsId = 'b' + number;
  let bullet = new Bullets(bulletsId);
  bullet.generateBullets();
  bullet.fly();
  ++number;
}

class Obstacles {
    
	constructor(ids) {
  	this.ids = ids;
    this.lifePoints = 100;
  }

  lifeRemains() {
    return this.lifePoints;
  }

  getYpos() {
    return Math.floor(document.getElementById(this.ids).getBoundingClientRect().bottom);
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
  torch.classList.add('torch');
  torch.style.top = '75px';
  torch.style.left = '25px';
  document.getElementById('airplane').appendChild(torch);
  autoShoot = setInterval(shoot, 300);
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