//Player JS

//Path: js\player.js
//Space invaders player.js
class Player {
    constructor(x, y, scale) {
        this.x = x;
        this.y = y;
        this.canshoot = true;
        this.speed = 500;
        this.fireSpeed = 5;

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
            if (this.x < 0) {
                this.x = 0;
            }
        }
        if(39 in keysDown || 68 in keysDown) { 
            this.x += this.speed * dt;
            if (this.x + this.width > canvas.width) {
                this.x = canvas.width - this.width;
            }
        }
        //Shooting
        if (32 in keysDown && this.canshoot) {
            this.canshoot = false;
            setTimeout(() => {
                this.canshoot = true;
            }, this.fireSpeed);
            bullets.push(new Bullet(this.x + this.width / 2, this.y, true));
        }
    }


    
}
