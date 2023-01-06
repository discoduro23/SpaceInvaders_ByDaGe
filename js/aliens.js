//Aliens JS
//Path: js\aliens.js
//Space invaders aliens.js


let direction = 1;
let needToGoDown = false;

class Alien {
    constructor(x, y, width, height, animFrame1, animFrame2) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.active = true;
        this.speed = 100;

        this.animFrame = 1;
        this.animFrame1 = new Image();
        this.animFrame1.src = animFrame1;
        this.animFrame2 = new Image();
        this.animFrame2.src = animFrame2;

    }
    render() {
        if(this.animFrame1 && this.animFrame2 && this.active){
            //Will have to change its draw function to animate the player
            if (this.animFrame == 1) {
                ctx.drawImage(this.animFrame1, this.x, this.y, this.width, this.height);
            } 
            else {
                ctx.drawImage(this.animFrame2, this.x, this.y, this.width, this.height);
            }
        }
    }
    updateImage() {
        //Animation frame will have to wait for a certain amount of time before changing
        if (this.animFrame == 1) {
            this.animFrame = 2;
        } 
        else {
            this.animFrame = 1;
        }
    }

    start() {
        this.interval = setInterval(this.updateImage.bind(this), 1000);
    }

    update(dt , speedgame) {
        if(this.active){
            this.move(dt , speedgame);
        }
        
    }

    toGoDown() {
        this.y += this.height;
    }

    move(dt, speedgame) {
        
        //Collision with the canvas
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }

        // if we are going to the right and we reach the right edge of the screen, change direction and go down one "level"
        if (this.x + this.width >= canvas.width && direction == 1) {
            direction = -1;
            needToGoDown = true;
        }
        // if we are going to the left and we reach the left edge of the screen, change direction and go down one "level"
        if (this.x <= 0 && direction == -1) {
            direction = 1;
            needToGoDown = true;
        }
        // move the alien
        this.x += this.speed * direction * dt * speedgame * speedgame;


    }

        

}


