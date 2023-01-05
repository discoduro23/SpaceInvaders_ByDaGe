//Bullets JS
//Path: js\bullets.js
//Space invaders bullets.js
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 10;
        this.speed = 5;
    }
    render() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.y -= this.speed;
    }
}

