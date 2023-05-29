let seconds = 0;
let myInterval;
let stepMove = 10;
let airplanePosition = document.getElementById("airplane");
airplanePosition.style.left = "100px";
let asteroidPos = document.getElementById("asteroid");
asteroidPos.style.top = '10px'



function startGame() {
  timer();
  setInterval(asteroidFall, 10);
  document.onkeydown = move;
}



function asteroidFall() {
  if (parseInt(asteroidPos.style.top) < 510) {
    asteroidPos.style.top = parseInt(asteroidPos.style.top) + 1 + 'px';
  }
  console.log(document.getElementById("asteroid").style.top);
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