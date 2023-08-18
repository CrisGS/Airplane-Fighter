let seconds = 0, asteroidId = 0, obstacle, gameOver = false, alreadyPressed = false, displayTimes = 0, obstaclesDestroyed = 0;
let horizontalPositions = [15, 115, 215], bulletsArray = [], airplanePosition, myInterval, generateInterval, autoShoot;
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
      if (document.getElementById(this.ids) != null) {
        document.getElementById(this.ids).style.top = parseInt(document.getElementById(this.ids).style.top) - 2 + 'px';
      }
      if(gameOver === true) {
        clearInterval(autoShoot);
      }
    }, 10);
  }
}

function shoot() {
  bulletsId = 'b' + number;
  let newBullet = new Bullets(bulletsId);
  newBullet.generateBullets();
  bulletsArray.push(newBullet);
  newBullet.fly();
  ++number;
}

class Obstacles {
	constructor(ids) {
  	this.ids = ids;
    this.lifePoints = 5;
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
        document.getElementById('score').innerText = obstaclesDestroyed;
      }
      if (checkBulletsCollision(obstaclePosition) === true) {
        this.lifePoints -= 1;
        if (this.lifePoints < 0) {
          ++obstaclesDestroyed;
          clearInterval(fallingInterval);
          document.getElementById(this.ids).remove();
        }
      }
      if(document.getElementById(this.ids) != null) {
        if (parseInt(document.getElementById(this.ids).style.top) === 500) {
          clearInterval(fallingInterval);
          document.getElementById(this.ids).remove();
        }
      }
    }, 7);
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
    score.innerText = "Your score: " + obstaclesDestroyed;
    divElement.appendChild(gameOver);
    divElement.appendChild(score);
    document.getElementById("table-game").appendChild(divElement);
    document.getElementById("table-game").style.boxShadow = "inset 0px 0px 25px 5px red";
  }
}

function move(e) {
  const stepMove = 100;
  if (gameOver === false) {
    document.getElementById("play").blur();
    if (e.keyCode == 37 && parseInt(airplanePosition.style.left) > 0) {
      airplanePosition.style.left = parseInt(airplanePosition.style.left) - stepMove + 'px';
    } else if (e.keyCode == 39 && parseInt(airplanePosition.style.left) < 200) {
      airplanePosition.style.left = parseInt(airplanePosition.style.left) + stepMove + 'px';
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

function checkBulletsCollision(asteroidPosition) {
  let hited = false;
  bulletsArray.forEach((bulletObject) => {
    if (document.getElementById(bulletObject.ids) != null) {
      const bulletCurrentPosition = document.getElementById(bulletObject.ids).getBoundingClientRect();
      if (asteroidPosition.bottom > bulletCurrentPosition.top && 
        asteroidPosition.top < bulletCurrentPosition.bottom && 
        asteroidPosition.right > bulletCurrentPosition.left &&
        asteroidPosition.left < bulletCurrentPosition.right) {
          hited = true;
          document.getElementById(bulletObject.ids).remove();
          bulletsArray.shift();
      } else if(parseInt(document.getElementById(bulletObject.ids).style.top) < -400) {
        document.getElementById(bulletObject.ids).remove();
        bulletsArray.shift();
      }
    }
  });
  return hited;
}

function resetGame() {
  location.reload();
}