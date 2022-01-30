"use strict";

let canvas, width, height, ctx;
let fireworks = [];
let particles = [];

function setup() {
   canvas = document.getElementById("canvas");
   setSize(canvas);
   // The getContext() is a built-in HTML object, with properties and methods for drawing:
   ctx = canvas.getContext("2d");
   ctx.fillStyle = "#000000";
   // The fillRect(x,y,width,height) method draws a rectangle, filled with the fill style, on the canvas:
   ctx.fillRect(0, 0, width, height);
   fireworks.push(new Firework(Math.random() * (width - 200) + 100));
   window.addEventListener("resize", windowResized);
   document.addEventListener("click", onClick);
}

setTimeout(setup, 1);

function loop() {
   ctx.globalAlpha = 0.1;
   ctx.fillStyle = "#000000";
   ctx.fillRect(0, 0, width, height);
   ctx.globalAlpha = 1;

   for (let i = 0; i < fireworks.length; i++) {
      let done = fireworks[i].update();
      fireworks[i].draw();
      if (done) fireworks.splice(i, 1);
   }

   for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].lifetime > 80) particles.splice(i, 1);
   }

   if (Math.random() < 1 / 60) fireworks.push(new Firework(Math.random() * (width - 200) + 100));
   console.log(fireworks.length);
}
setInterval(loop, 1);
//setInterval(loop, 100/60);

// phao hoa no
class Particle {
   constructor(x, y, col) {
      this.x = x;
      this.y = y;
      this.col = col; // color
      this.vel = randomVec(3);
      this.lifetime = 0;
   }

   update() {
      this.x += this.vel.x;
      this.y += this.vel.y;
      // this.vel.y += 0.02;
      this.vel.x *= 0.99;
      this.vel.y *= 0.99;
      this.lifetime++;
   }

   draw() {
      ctx.globalAlpha = Math.max(1 - this.lifetime / 80, 0);
      ctx.fillStyle = this.col;
      ctx.fillRect(this.x, this.y, 2, 2);
   }
}

// ban phao hoa
class Firework {
   constructor(x) {
      this.x = x;
      this.y = height;
      this.isBlown = false; // set initState = false -> chua ban phao hoa
      this.col = randomCol(); // random color
   }

   update() {
      this.y -= 3;
      if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
         this.isBlown = true;
         for (let i = 0; i < 100; i++) {
            particles.push(new Particle(this.x, this.y, this.col))
         }
      }
      return this.isBlown;
   }

   draw() {
      ctx.globalAlpha = 1;
      ctx.fillStyle = this.col;
      ctx.fillRect(this.x, this.y, 3, 3);
   }
}

function randomCol() {
   var letter = '0123456789ABCDEF';
   var nums = [];

   // for (var i = 0; i < 3; i++) {
   //    nums[i] = Math.floor(Math.random() * 256);
   // }

   // let brightest = 0;
   // for (var i = 0; i < 3; i++) {
   //    if (brightest < nums[i]) brightest = nums[i];
   // }

   // brightest /= 255;
   // for (var i = 0; i < 3; i++) {
   //    nums[i] /= brightest;
   // }

   // let color = "#";
   // for (var i = 0; i < 3; i++) {
   //    color += letter[Math.floor(nums[i] / 16)];
   //    color += letter[Math.floor(nums[i] % 16)];
   // }
   let color = '#';
   for (let i = 0; i < 6; i++) {
      color += letter[Math.floor(Math.random() * letter.length)]
   }
   return color;
}

function randomVec(max) {
   let dir = Math.random() * Math.PI * 2;
   let spd = Math.random() * max;
   return {
      x: Math.cos(dir) * spd,
      y: Math.sin(dir) * spd
   };
}

function setSize(canv) {
   canv.style.width = (innerWidth) + "px";
   canv.style.height = (innerHeight) + "px"; // The innerHeigth property returns the height of a window's content area.
   width = innerWidth;
   height = innerHeight;
   canv.width = innerWidth * window.devicePixelRatio;
   canv.height = innerHeight * window.devicePixelRatio;
   canvas.getContext("2d").scale(window.devicePixelRatio, window.devicePixelRatio); // Normalize coordinate system to use css pixels.
}

function onClick(e) {
   fireworks.push(new Firework(e.clientX));
}

function windowResized() {
   setSize(canvas);
   ctx.fillStyle = "#000000";
   ctx.fillRect(0, 0, width, height);
}