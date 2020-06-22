(() => {
  function setup() {
    const canvas = document.getElementById('falling-snow-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return {
      canvas,
      canvasContext: canvas.getContext('2d'),
      numberOfSnowBalls: 250
    }
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createSnowBall(canvas, numberOfSnowBalls) {
    const x = [...Array(numberOfSnowBalls)].map(() => {
      return {
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        opacity: random(0, 1),
        radius: random(2, 4),
        speedX: random(-5, 5),
        speedY: random(1, 3),
      }
    });
    console.log(x);
    return x;
  }

  function drawSnowBall(canvasContext, snowBall) {
    canvasContext.beginPath();
    canvasContext.arc(snowBall.x, snowBall.y, snowBall.radius, 0, Math.PI * 2);
    canvasContext.fillStyle = `rgba(255, 255, 255, ${snowBall.opacity})`;
    canvasContext.fill();
  }

  function moveSnowBall(snowBall, canvas) {
    snowBall.x += snowBall.speedX;
    snowBall.y += snowBall.speedY;
    if(snowBall.x > canvas.width) {
      snowBall.x = 0;
    } else if (snowBall.x < 0) {
      snowBall.x = canvas.width;
    }

    if(snowBall.y > canvas.height) {
      snowBall.y = 0;
    } else if (snowBall.y < 0) {
      snowBall.y = canvas.height;
    }
  }

  function run() {
    const { canvas, canvasContext, numberOfSnowBalls } = setup();
    const snowBalls = createSnowBall(canvas, numberOfSnowBalls);
    setInterval(() => {
      canvasContext.clearRect(0,0, canvas.width, canvas.height);
      snowBalls.forEach(snowBall => drawSnowBall(canvasContext, snowBall));
      snowBalls.forEach(snowBall => moveSnowBall(snowBall, canvas));
    },50);
  }
  run();
})();
