//Aliens JS
//Path: js\aliens.js
//Space invaders aliens.js

function Alien(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
}

