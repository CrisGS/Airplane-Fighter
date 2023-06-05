let seconds = 0, stepMove = 100, asteroidId = 0;
let horizontalPositions = [10, 110, 210], airplanePosition, myInterval, fallingInterval, generateInterval;

function startGame() {
  timer();
  generateAirplane();
  generateInterval = setInterval(generateAsteroid, 2000);
  document.onkeydown = move;
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

function checkColision(x) {
  let asteroidVerticalPosition = parseInt(document.getElementById(x).style.top);
  if (asteroidVerticalPosition === 318) {
    if (parseInt(document.getElementById('airplane').style.left) === parseInt(document.getElementById(x).style.left) - 10) {
      clearInterval(fallingInterval);
      clearInterval(generateInterval);
      clearInterval(myInterval);
      document.getElementById("header").innerText = "Game Over!";
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
  if (e.keyCode == 37 && parseInt(airplanePosition.style.left) > 0) {
    airplanePosition.style.left = parseInt(airplanePosition.style.left) - 100 + 'px';
  } else if (e.keyCode == 39 && parseInt(airplanePosition.style.left) < 200) {
    airplanePosition.style.left = parseInt(airplanePosition.style.left) + 100 + 'px';
  }
}

function timer() {
  myInterval = setInterval(() => {
    ++seconds;
    if (seconds < 10) {
      seconds = '00' + seconds;
    } else if (seconds < 100) {
      seconds = '0' + seconds;
    }
    document.getElementById('time').innerText = seconds;
  }, 1000);
}

function resetGame() {
  location.reload();
}