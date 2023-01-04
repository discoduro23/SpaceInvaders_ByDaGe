//Player JS

//Path: js\player.js
//Space invaders player.js
function Player() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.image = new Image();
    this.image.src = "images/Player.png";
    this.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    this.moveLeft = function () {
        this.x -= 10;
    };
    this.moveRight = function () {
        this.x += 10;
    };
    this.shoot = function () {
        game.playerBullets.push(new Bullet(this.x + this.width / 2, this.y));
    };
}
