let seconds = 0;
let myInterval;
let stepMove = 10;
let airplanePosition = document.getElementById("table-game");
airplanePosition.style.justifyContent = "center";
let asteroidPos = document.getElementById("asteroid");
asteroidPos.style.marginBottom = '400px'



function startGame() {
  timer();
  setInterval(asteroidFall, 10);
  document.onkeydown = move;
}



function asteroidFall() {
  asteroidPos.style.marginBottom = parseInt(asteroidPos.style.marginBottom) - 1 + 'px';
  console.log(document.getElementById("asteroid").style.marginBottom);
}

function move(e) {
  if (e.keyCode == 37) {
    if (airplanePosition.style.justifyContent == "flex-end") {
      airplanePosition.style.justifyContent = "center";
    } else if (airplanePosition.style.justifyContent == "center") {
      airplanePosition.style.justifyContent = "flex-start";
    }
  } else if (e.keyCode == 39) {
    if (airplanePosition.style.justifyContent == "flex-start") {
      airplanePosition.style.justifyContent = "center";
    } else if (airplanePosition.style.justifyContent == "center") {
      airplanePosition.style.justifyContent = "flex-end";
    }
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