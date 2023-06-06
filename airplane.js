let seconds = 0, stepMove = 100, asteroidId = 0, gameOver = false, alreadyPressed = false;
let horizontalPositions = [10, 110, 210], airplanePosition, myInterval, fallingInterval, generateInterval;

function startGame() {
  if (gameOver === false && alreadyPressed === false) {
    timer();
    generateAirplane();
    generateInterval = setInterval(generateAsteroid, 1500);
    document.onkeydown = move;
    alreadyPressed = true;
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

function generateAsteroid() {
  asteroid = document.createElement('img');
  asteroid.src = 'asteroid.png';
  asteroid.classList.add('asteroid');
  asteroid.id = asteroidId;
  asteroid.style.left = horizontalPositions[Math.floor(Math.random() * 3)] + 'px';
  asteroid.style.top = '-150px';
  document.getElementById("table-game").appendChild(asteroid);
  asteroid.onload = asteroidFall(asteroidId);
  ++asteroidId;
}

function displayScore() {
  let divElement = document.createElement('div');
  divElement.classList.add('messageContainer');
  let gameOver = document.createElement('img');
  gameOver.src = 'Game over.png';
  gameOver.classList.add('gameOver');
  let score = document.createElement('span');
  score.classList.add('score');
  score.id = 'score';
  score.innerText = "Your score is: " + seconds;
  divElement.appendChild(gameOver);
  divElement.appendChild(score);
  document.getElementById("table-game").appendChild(divElement);
}

function checkColision(x) {
  let asteroidVerticalPosition = parseInt(document.getElementById(x).style.top);
  if (asteroidVerticalPosition === 318) {
    if (parseInt(document.getElementById('airplane').style.left) === parseInt(document.getElementById(x).style.left) - 10) {
      clearInterval(fallingInterval);
      clearInterval(generateInterval);
      clearInterval(myInterval);
      displayScore();
      gameOver = true;
    }
  }
}

function asteroidFall(imgId) {
  fallingInterval = setInterval(() => {
    document.getElementById(imgId).style.top = parseInt(document.getElementById(imgId).style.top) + 2 + 'px';
    checkColision(imgId);
    if (parseInt(document.getElementById(imgId).style.top) > 500) {
      document.getElementById(imgId).remove();
      clearInterval(fallingInterval);
    }
  }, 5);
}

function move(e) {
  if (gameOver === false) {
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