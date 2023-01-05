//Aliens JS
//Path: js\aliens.js
//Space invaders aliens.js

class Alien {
    constructor(x, y, width, height, animFrame1, animFrame2) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.animFrame = 1;
        this.animFrame1 = new Image();
        this.animFrame1.src = animFrame1;
        this.animFrame2 = new Image();
        this.animFrame2.src = animFrame2;


    }
    render() {
        if(this.Image){
            //Will have to change its draw function to animate the player
            if (animFrame == 1) {
                ctx.drawImage(this.animFrame1, this.x, this.y, this.width, this.height);
            } else if (animFrame == 2) {
                ctx.drawImage(this.animFrame2, this.x, this.y, this.width, this.height);
            }
        }
    }
    update() {
        //Animation frame will have to wait for a certain amount of time before changing
        if (this.animFrame == 1) {
            this.animFrame = 2;
        }
        else if (this.animFrame == 2) {
            this.animFrame = 1;
        }

    }

}


