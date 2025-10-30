const canvas = document.querySelector("canvas");
canvas.width = 650;
canvas.height = 576;
const c = canvas.getContext("2d");

// declare offset to center the map on the canvas
const offset = {
  x: -880,
  y: -600,
};

const bg = new Image();
bg.src = "img/Pellet Town.png";


const player = new Image();
player.src = "img/playerDown.png";


// Everytime you create an instance of an sprite, you need to give it a position and an image
class MapSprite {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// Create background sprite
const background = new MapSprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  image: bg,
});


// Drawing in order, background first, then player
function draw() {
  // sprite frame: 4 columns, use the first frame (index 0)
  const cols = 4;
  const frameW = player.width / cols; // getting each frame width
  const frameH = player.height; // full height
  const frameIndex = 0; // first frame
  const sx = frameIndex * frameW; // source x

  // center on canvas using frame size (not full image size)
  const dx = (canvas.width - frameW) / 2 + frameW;
  const dy = (canvas.height - frameH) / 2 + frameH;

  // correct 9-arg drawImage
  c.drawImage(player, sx, 0, frameW, frameH, dx, dy, frameW, frameH);
}


// Create object to set "w", "a", "s". "d" if they are presssed down currently
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

// add animation loop
function animate() {
  // in order to call it over and over gain, calling itself
  window.requestAnimationFrame(animate);
  console.log("animating");

  background.draw();


  // player rendering
  draw();

  if (keys.w.pressed && lastKey === "w") {
    background.position.y += 3;
  }
  if (keys.s.pressed && lastKey === "s") {
    background.position.y -= 3;
  }
  if (keys.a.pressed && lastKey === "a") {
    background.position.x += 3;
  }
  if (keys.d.pressed && lastKey === "d") {
    background.position.x -= 3;
  }
}
animate();

let lastKey = "";

// Get player moving with arrow keys
// When key is pressed down set the respective key to true
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      console.log("up");
      // Set "w" key to pressed
      keys.w.pressed = true;
      // track direction of the player for animation
      lastKey = "w";
      break;
    case "s":
      console.log("down");

      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "a":
      console.log("left");
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "d":
      console.log("right");
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
  console.log(keys);
});

// toggle the key to false when released
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      console.log("up");
      // Set "w" key to pressed
      keys.w.pressed = false;
      break;
    case "s":
      console.log("down");

      keys.s.pressed = false;

      break;
    case "a":
      console.log("left");
      keys.a.pressed = false;
      break;
    case "d":
      console.log("right");
      keys.d.pressed = false;
      break;
  }
  console.log(keys);
});
