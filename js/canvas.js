const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize', ()=>{
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
})
addEventListener('click', ()=>{
  init();
})

class Circle {
  constructor(config){
    this.x = config.x;
    this.y = config.y;
    this.dx = config.dx;
    this.dy = config.dy;
    this.radius = config.radius;
    this.colour = config.colour;
    this.gravity = 1;
    this.friction = 0.95;
  }
  draw(){
    c.beginPath();
    c.fillStyle = this.colour;
    c.strokeStyle = 'black';
    c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    c.fill();
    c.stroke();
    this.update();
  }
  update(){
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx * this.friction;
    }
    if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius + this.dy < 0) {
      this.dy = -this.dy * this.friction**2;
      this.dx = this.dx * this.friction**0.5;
    } else {
      this.dy += this.gravity;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}

const colourArray = ['#32e7e4', '#3e32e7', '#b732e7', '#e732c0', '#e73238'] 

let circleArray = [];

function init(){
  circleArray = []
  for (let index = 0; index < 100; index++) {
    const radius = randomIntBetween(20, 35);
    const x = randomIntBetween(radius, canvas.width - radius);
    const y = randomIntBetween(radius, canvas.height - 3*radius);
    const dx = randomIntBetween(-5, 5);
    const dy = randomIntBetween(-5, 5);
    const colour = randomColour(colourArray);

    circleArray.push(new Circle({
      radius: radius,
      x: x,
      y: y,
      dx: dx,
      dy: dy,
      colour: colour,
    }))
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height);
  circleArray.forEach(circle => {
    circle.draw();
  });
}

init();
animate();