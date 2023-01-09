class Saucer {
	constructor(x, y, mode, score) {
        this.x = x;
        this.y = y;
        this.mode = mode;
        this.score = score;
        this.width = 50;
        this.height = 50;
        this.active = true;
        this.speed = 50;
        this.img = new Image();
        this.img.src = "img/saucer.png";
        this.img.onload = () => {
            this.draw();
        };
    }
    render() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    update(dt, speedgame) {
        this.move(dt, speedgame);
    }

    move(dt, speedgame) {
        if (this.mode == 0) {
            this.x -= this.speed * dt;
            if (this.x < -this.width ) {
                this.active = false;
            }        }
        else {
            this.x += this.speed * dt;
            if (this.x > canvas.width) {
                this.active = false;
            }
        }
    }
}