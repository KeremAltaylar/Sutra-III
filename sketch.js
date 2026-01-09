var inc = fxrandRange(10, 20, 0.1);
var scl = fxrandRange(100, 120, 1);
var magv = fxrandRange(0.1, 1, 0.1);
var cols, rows;
var fr;
var zoff = 0;
var particles = [];
var particles2 = [];
var particles3 = [];
var initialParticles = [];
var initialParticles2 = [];
var initialParticles3 = [];
var flowfield;
var magv;
var cr = fxrandRange(0, 200, 1);
var cg = fxrandRange(100, 110, 1);
var cb = fxrandRange(200, 250, 1);
var dr = fxrandRange(0, 100, 1);
var dg = fxrandRange(150, 200, 1);
var db = fxrandRange(10, 150, 1);
var indexk = 0;
var sw1 = fxrandRange(0.1, 0.5, 0.1);
var sw2 = fxrandRange(0.1, 0.5, 0.1);
var mes1a = fxrandRange(0.1, 4, 0.1);
var mes2a = fxrandRange(0.1, 8, 0.1);
var mes1b = fxrandRange(2, 4, 0.1);
var mes2b = fxrandRange(2, 4, 0.1);

function restartSketch() {
  indexk = 0;
  zoff = 0;
  loop();

  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  flowfield = new Array(cols * rows);

  for (i = 0; i < 50; i++) {
    particles[i] = new Particle(
      cr,
      cg,
      cb,
      initialParticles[i].x,
      initialParticles[i].y,
      sw1
    );
  }
  for (i = 0; i < 100; i++) {
    particles2[i] = new Particle2(
      dr,
      dg,
      db,
      initialParticles2[i].x,
      initialParticles2[i].y,
      sw2
    );
  }
  for (i = 0; i < 100; i++) {
    particles3[i] = new Particle3(
      70,
      70,
      70,
      initialParticles3[i].x,
      initialParticles3[i].y,
      sw2,
      3
    );
  }

  background("#fbe2a3");
}

function mousePressed() {
  restartSketch();
}

function touchStarted() {
  restartSketch();
  return false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  fr = createP("");
  flowfield = new Array(cols * rows);
  for (i = 0; i < 50; i++) {
    var x1 = (fxrand() * i) / 5 + windowWidth / 2;
    var y1 = (fxrand() * i) / 4 + windowHeight / 4;
    initialParticles[i] = { x: x1, y: y1 };
    particles[i] = new Particle(
      cr,
      cg,
      cb,
      x1,
      y1,
      sw1
    );
  }
  for (i = 0; i < 100; i++) {
    var x2 = (fxrand() * i) / 10 + windowWidth / 2;
    var y2 = (fxrand() * i) / 5 + windowHeight / 2;
    initialParticles2[i] = { x: x2, y: y2 };
    particles2[i] = new Particle2(
      dr,
      dg,
      db,
      x2,
      y2,
      sw2
    );
  }
  for (i = 0; i < 100; i++) {
    var x3 = fxrand() * i * 10;
    var y3 = fxrand() * i + windowHeight / mes2b;
    initialParticles3[i] = { x: x3, y: y3 };
    particles3[i] = new Particle3(
      70,
      70,
      70,
      x3,
      y3,
      sw2,
      3
    );
  }
  // background(235, 215, 141);
  background("#fbe2a3");
}

function draw() {
  if (indexk > 400) {
    noLoop();
  }
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      flowfield[index] = v;
      var angle = fxrand() * xoff;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(magv);
      xoff += inc;
      // stroke(255, 130);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(0.1);
      // line(0, 0, scl, 0);
      // pop(); //fill(r);

      //rect(scl * x, scl * y, scl, scl);
    }
    yoff += inc;
    zoff += 0.0008;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  for (var i = 0; i < particles2.length; i++) {
    particles2[i].follow(flowfield);
    particles2[i].update();
    particles2[i].edges();
    particles2[i].show();
  }
  for (var i = 0; i < particles3.length; i++) {
    particles3[i].follow(flowfield);
    particles3[i].update();
    particles3[i].edges();
    particles3[i].show();
  }
  push();
  rectMode(RADIUS);
  //fill(255, 1 * sin(millis() * 3000));
  noStroke();
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
  pop();
  indexk = indexk + 1;
  //console.log(indexk);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  indexk = 0;
  loop();
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  //fr = createP("");
  flowfield = new Array(cols * rows);

  for (i = 0; i < 50; i++) {
    var x1 = (fxrand() * i) / 5 + windowWidth / 2;
    var y1 = (fxrand() * i) / 4 + windowHeight / 4;
    initialParticles[i] = { x: x1, y: y1 };
    particles[i] = new Particle(
      cr,
      cg,
      cb,
      x1,
      y1,
      sw1
    );
  }
  for (i = 0; i < 100; i++) {
    var x2 = (fxrand() * i) / 10 + windowWidth / 2;
    var y2 = (fxrand() * i) / 5 + windowHeight / 2;
    initialParticles2[i] = { x: x2, y: y2 };
    particles2[i] = new Particle2(
      dr,
      dg,
      db,
      x2,
      y2,
      sw2
    );
  }
  for (i = 0; i < 100; i++) {
    var x3 = fxrand() * i * 10;
    var y3 = fxrand() * i + windowHeight / mes2b;
    initialParticles3[i] = { x: x3, y: y3 };
    particles3[i] = new Particle3(
      70,
      70,
      70,
      x3,
      y3,
      sw2,
      3
    );
  }

  push();
  noStroke();
  background("#fbe2a3");
  rectMode(RADIUS);
  fill("#fbe2a3");
  //fill(alpha(50));
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );

  rectMode(RADIUS);
  fill("#fbe2a3", 1 * sin(millis() * 1000));
  noStroke();
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
  pop();
}

function fxrandRange(min, max, step) {
  value = Math.round((fxrand() * (max - min)) / step);
  return value * step + min;
}

window.$fxhashFeatures = {
  Grandeur: magv,
  Delicacy: inc,
  Tenet: scl,
};
