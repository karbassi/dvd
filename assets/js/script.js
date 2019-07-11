const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

const dvd = {
  x: 250,
  y: 250,
  width: 200,
  height: 200,
  speed: {
    x: 2,
    y: 2,
  },
};

function dvdDraw() {
  const image = document.getElementById("dvd");
  ctx.drawImage(image, dvd.x, dvd.y);
};

function dvdMove() {
  if ((dvd.x <= 0) || (dvd.x + dvd.width > canvas.width)) {
    dvd.speed.x *= -1;
  }

  if ((dvd.y <= 0) || (dvd.y + dvd.height > canvas.height)) {
    dvd.speed.y *= -1;
  }

  dvd.x += dvd.speed.x;
  dvd.y += dvd.speed.y;
};

function drawBackground() {
  ctx.beginPath();
  ctx.fillStyle = "#0000FF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function resizeScreen() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function fullscreen(event) {
  if (event.code == "KeyF") {
    toggleFullscreen();
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();
  dvdDraw();
  dvdMove();

  window.requestAnimationFrame(step);
}

resizeScreen();
step();

document.addEventListener("keydown", fullscreen);
window.addEventListener("resize", resizeScreen);
