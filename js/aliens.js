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
        this.interval = setInterval(this.updateImage.bind(this), 400);
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

class AlienExplosion{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 24;

        this.image = new Image();
        this.image.src = "./images/Explosion.png";

        this.time = 0.5;
        this.active = true;

        setTimeout(function() {
            this.active = false;
        }
        .bind(this), 50);
    }

    render() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function AlienShoot(aliensMatrix) {
    if(AlienCanShoot && !isAliensMatrixClear(aliensMatrix)){
        AlienCanShoot = false;
        var alien = getRandomAlien(aliensMatrix);

        if(alien != null){
            bullets.push(new Bullet(alien.x + alien.width / 2, alien.y + alien.height, false));
        }
        setTimeout(function() {
            AlienCanShoot = true;
        }, 1000);    
    }
}

function getRandomAlien(aliensMatrix, counter = 0) {
    // Set a maximum number of tries
    const maxTries = 100;

    randomAlien = null;
    randomColumn = Math.floor(Math.random() * 10);

    for (let i = 0; i < aliensMatrix.length; i++) {
        if(aliensMatrix[i][randomColumn].active){
            randomAlien = aliensMatrix[i][randomColumn];
        }
    }

    if (randomAlien == null && counter < maxTries) {
        // Increase the counter and call the function again
        randomAlien = getRandomAlien(aliensMatrix, counter + 1);
    }
    return randomAlien;
}

