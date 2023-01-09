class Saucer {
	constructor() {
        this.x = 0;
        this.y = 0;
        this.mode = 0;
        this.score = 0;
        this.width = 16*4;
        this.height = 8*4;
        this.active = false;
        this.speed = 250;
        this.img = new Image();

        this.img.src = "img/Saucer.png";

        this.img.onload = () => {
            this.render();
        };
    }

    possibleRequestChangeSkin() {
        if(getRandomIntInclusive(1,10) == 10) this.img.src = "images/AmoSaucer.png";
        else this.img.src = "images/Saucer.png";
    }

    render() {
        if (this.active) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    update(dt, speedgame) {
        if (this.active)
        this.move(dt, speedgame);
    }

    move(dt, speedgame) {
        if (this.mode == 0) {
            this.x -= this.speed * dt * speedgame;
            if (this.x < -this.width ) {
                this.active = false;
                saucerspawned = false;            
            }        
        }
        else {
            this.x += this.speed * dt * speedgame;
            if (this.x > canvas.width + this.width) {
                this.active = false;
                saucerspawned = false;
            }
        }
    }

    setParameters (x, y, mode, score) {
        this.x = x;
        this.y = y;
        this.mode = mode;
        this.score = score;
        this.active = true;
    }

    SaucerUpdateAndInstantiate(dt, speedgame, saucerspawn) {
        if (!saucerspawn) {
            saucerspawned = true;
            setTimeout(() => {
                
                this.setParameters(canvas.width, this.height + 10, getRandomBinary(), getRandomIntInclusive(50, 500));
            }, getRandomIntInclusive(5000, 10000) / speedgame);
        }
        if (saucerspawn && this.active == true) {
            this.update(dt, speedgame);
        }
    };
}