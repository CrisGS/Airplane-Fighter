let seconds = 0, stepMove = 100, asteroidId = 0, obstacle, gameOver = false, alreadyPressed = false, displayTimes = 0;
let horizontalPositions = [10, 110, 210], airplanePosition, myInterval, generateInterval;

function startGame() {
  if (gameOver === false && alreadyPressed === false) {
    timer();
    generateAirplane();
    generateInterval = setInterval(generateObstacles, 700);
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
      checkColision(this.ids);
      if (parseInt(document.getElementById(this.ids).style.top) === 500) {
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
    score.innerText = "Your score: " + seconds;
    divElement.appendChild(gameOver);
    divElement.appendChild(score);
    document.getElementById("table-game").appendChild(divElement);
    document.getElementById("table-game").style.boxShadow = "inset 0px 0px 25px 5px red"
  }
}

function checkColision(x) {
  let asteroidVerticalPosition = parseInt(document.getElementById(x).style.top);
  if (asteroidVerticalPosition >= 318) {
    if (parseInt(document.getElementById('airplane').style.left) === parseInt(document.getElementById(x).style.left) - 10) {
      clearInterval(generateInterval);
      clearInterval(myInterval);
      ++displayTimes;
      displayScore();
      gameOver = true;
    }
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

function timer() {
  let elapsedTime;
  myInterval = setInterval(() => {
    ++seconds;
    if (seconds < 10) {
      elapsedTime = '00' + seconds;
    } else if (seconds < 100) {
      elapsedTime = '0' + seconds;
    }
    document.getElementById('time').innerText = elapsedTime;
  }, 1000);
}

function resetGame() {
  location.reload();
}