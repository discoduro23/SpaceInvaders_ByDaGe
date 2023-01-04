//Bullets JS
//Path: js\bullets.js
//Space invaders bullets.js
function Bullet(x, y) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.draw = function () {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
}

