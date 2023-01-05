//Player JS

//Path: js\player.js
//Space invaders player.js
class Player {
    constructor(x, y, scale) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.image = new Image();
        this.image.src = "images/Player.png";
        image.onload = () => {
			this.width = 100;
			this.height = 100;
        };
    }

    render() {
        if (this.image)
        {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    update(dt, keysDown) {
        //movement
        if (keysDown[37]) {
            this.x -= this.speed * dt;
        }
        if (keysDown[39]) {
            this.x += this.speed * dt;
        }
        //Shooting
        if (keysDown[32]) {
            bullets.push(new Bullet(this.x + this.width / 2, this.y));
        }
        //Collision with the canvas
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }
    }
    
}

//Render of the player
