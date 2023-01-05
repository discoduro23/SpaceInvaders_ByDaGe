//Player JS

//Path: js\player.js
//Space invaders player.js
class Player {
    constructor(x, y, scale) {
        this.x = x;
        this.y = y;
        this.speed = 500;
        this.image = new Image();
        this.image.src = "./images/Player.png";
        this.image.onload = () => {
			this.width = this.image.width * scale;
			this.height = this.image.height * scale;
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
        if (37 in keysDown || 65 in keysDown) {
            this.x -= this.speed * dt;
        }
        if(39 in keysDown || 68 in keysDown) {
            this.x += this.speed * dt;
        }
        //Shooting
        if (32 in keysDown) {
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
