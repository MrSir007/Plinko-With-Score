const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var particle;
var plinko = [];
var division = [];
var divisionHeight = 300;
var ground;
var line;

var turn = 0;
var gameState = "Play";
var score = 0;

function setup() {
  createCanvas(480,800);

  engine = Engine.create();
  world = engine.world;

  line = createSprite(240,500,480,5);
  line.shapeColor = "Yellow";

  ground = new Ground(240,795,480,10);
  
  for (var k = 0; k <= width; k = k + 80) {
    division.push(new Division(k, height - divisionHeight / 2, 10, divisionHeight));
  }
  for (var j = 40; j <= width - 10; j = j + 50) {
    plinko.push(new Plinko(j,75));
  }
  for (var j = 15; j <= width - 10; j = j + 50) {
    plinko.push(new Plinko(j,175));
  }
  for (var j = 40; j <= width - 10; j = j + 50) {
    plinko.push(new Plinko(j,275));
  }
  for (var j = 15; j <= width - 10; j = j + 50) {
    plinko.push(new Plinko(j,375));
  }
}

function draw() {
  background("Gainsboro");
  Engine.update(engine);

  for (var j = 0; j < plinko.length; j++) {
    plinko[j].display();
  }
  for (var k = 0; k < division.length; k++) {
    division[k].display();
  }
  ground.display();

  text("Score = " + score, 400,50);

  if (particle != null) {
    particle.display();
    if (particle.body.position.y > 760) {
      if (particle.body.position.x < 160) {
        score += 500;
        particle = null;
        if (turn == 5) {
          gameState = "End";
        }
      }
    }
  } else if (particle != null) {
    particle.display();
    if (particle.body.position.y > 760) {
      if (particle.body.position.x > 160 && particle.body.position.x < 320) {
        score += 100;
        particle = null;
        if (turn == 5) {
          gameState = "End";
        }
      }
    }
  } else if (particle != null) {
    particle.display();
    if (particle.body.position.y > 760) {
      if (particle.body.position.x > 320) {
        score += 200;
        particle = null;
        if (turn == 5) {
          gameState = "End";
        }
      }
    }
  }

  if(gameState === "End"){
    push();
    fill("white");
    strokeWeight(3);
    stroke("white");
    textSize(50);
    text("Game Over", 240, 300);
    pop();
  }
  console.log(turn);

  drawSprites();
}

function mousePressed() { 
  if (gameState !== "End") {
    turn++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}