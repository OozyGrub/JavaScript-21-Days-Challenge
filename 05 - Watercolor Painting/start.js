(() => {
  // เริ่มเขียนโค้ด
  const canvas = document.getElementById('painting');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const context = canvas.getContext('2d');

  let previousPoint = { x: 0, y: 0 };

  function getDistance(previousPoint, currentPoint) {
    return Math.sqrt((previousPoint.x - currentPoint.y) ** 2 + (previousPoint.y - currentPoint.y) ** 2);
  }
  function onMouseMove({ pageX, pageY }) {
    const currentPoint = { x: pageX, y: pageY };

    context.beginPath();

    const distance = getDistance(previousPoint, currentPoint);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 100 * Math.random() / distance;

    const opacity = Math.min(0.5, 10/distance);
    context.strokeStyle = `rgba(255, 10, 109, ${opacity})`;

    context.moveTo(previousPoint.x, previousPoint.y);
    context.lineTo(currentPoint.x, currentPoint.y);

    context.stroke();
    context.closePath();

    previousPoint = currentPoint;
  }

  function onMouseEnter({ pageX, pageY }) {
    previousPoint.x = pageX;
    previousPoint.y = pageY;
  }

  function run() {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseenter', onMouseEnter);
  }
  run();
})();
