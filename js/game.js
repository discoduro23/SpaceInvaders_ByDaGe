//Space invaders game.js
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
document.body.appendChild(canvas);

var start = function () {
    StartNewGame();
}

var StartNewGame = function(){
    game = new Game();
    game.start();	
}

//Black Background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
 

var Game = function () {
    this.player = new Player();
    this.aliens = [];
    this.playerBullets = [];
    this.alienBullets = [];
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.start = function () {
        this.player.x = canvas.width / 2 - this.player.width / 2;
        this.player.y = canvas.height - this.player.height;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 10; j++) {
                this.aliens.push(new Alien(j * 50 + 50, i * 50 + 50, 40, 40, "images/Alien.png"));

            }
        }
        this.update();
    };
    this.update = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + this.score, 10, 20);
        ctx.fillText("Lives: " + this.lives, 10, 40);
        this.player.draw();
        for (var i = 0; i < this.aliens.length; i++) {
            this.aliens[i].draw();
        }
        for (var i = 0; i < this.playerBullets.length; i++) {
            this.playerBullets[i].draw();
            this.playerBullets[i].y -= 10;
            if (this.playerBullets[i].y < 0) {
                this.playerBullets.splice(i, 1);
            }
        }
        for (var i = 0; i < this.alienBullets.length; i++) {
            this.alienBullets[i].draw();
            this.alienBullets[i].y += 10;
            if (this.alienBullets[i].y > canvas.height) {
                this.alienBullets.splice(i, 1);
            }
        }
        for (var i = 0; i < this.playerBullets.length; i++) {
            for (var j = 0; j < this.aliens.length; j++) {
                if (collision(this.playerBullets[i], this.aliens[j])) {
                    this.aliens.splice(j, 1);
                    this.playerBullets.splice(i, 1);
                    this.score += 10;
                }
            }
        }
        for (var i = 0; i < this.alienBullets.length; i++) {
            if (collision(this.alienBullets[i], this.player)) {
                this.lives--;
                this.alienBullets.splice(i, 1);
                if (this.lives == 0) {
                    this.gameOver = true;
                }
            }
        }
        if (this.aliens.length == 0) {
            this.gameOver = true;
        }
        if (this.gameOver) {
            ctx.fillStyle = "white";
            ctx.font = "50px Arial";
            ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
        }
        else {
            requestAnimationFrame(this.update.bind(this));
        }
    };
};

