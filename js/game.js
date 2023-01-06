//Space invaders game.js
var canvas = document.createElement("canvas"); //Create canvas element
var ctx = canvas.getContext("2d"); //Create 2d context
canvas.width = window.innerWidth; //Set canvas width and height
canvas.height = window.innerHeight;
canvas.style.position = "absolute"; //Set canvas position
document.body.appendChild(canvas); //Add canvas to body



//Black Background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var update = function (dt) {
    //Update player

    

    player.update(dt, keysDown, speedgame);

    //Update bullets
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].update(dt, speedgame);
        if(bullets[i].y < 0 || bullets[i].y > canvas.height){
            bullets.splice(i, 1);
        }
    }

    //Update aliens using
    for (var i = 0; i < aliensMatrix.length; i++) {
        for (var j = 0; j < aliensMatrix[i].length; j++) {
            aliensMatrix[i][j].update(dt, speedgame);
        }
    }

    

    if(needToGoDown){
        for (var i = 0; i < aliensMatrix.length; i++) {
            for (var j = 0; j < aliensMatrix[i].length; j++) {
                aliensMatrix[i][j].toGoDown();
                
            }
        }
        needToGoDown = false;
    }
    checkCollisionBetweenBulletsAndAliens(aliensMatrix, bullets);
    checkCollisionBetweenBulletsAndPlayer(player, bullets);
    AlienShoot();

    //Game Win
    if(isAliensMatrixClear(aliensMatrix)){
        StartNewGame();
        speedgame -= 0.5;
    }

    //Game Over
    if(player.lives <= 0){
        clearMatrix(aliensMatrix);
        player.lives = 3;
        player.x = canvas.width / 2 - player.width / 2;
        player.y = canvas.height - 120;

        start();
    }

    //console.log("Lives: " + player.lives);
    console.log("Speed: " + speedgame);
};

function createAliens () {

        for (let i = 0; i < 11; i++) {
            var xpos = i * 55;
            var ypos = 60;

            aliensMatrix[0][i] = new Alien(xpos, ypos, 40, 20, "./images/TopEnemy0.png", "./images/TopEnemy1.png");

            aliensMatrix[1][i] = new Alien(xpos, ypos + 40, 40, 20, "./images/MidEnemy0.png", "./images/MidEnemy1.png");
            aliensMatrix[2][i] = new Alien(xpos, ypos + 80, 40, 20, "./images/MidEnemy0.png", "./images/MidEnemy1.png");

            aliensMatrix[3][i] = new Alien(xpos, ypos + 120, 40, 20, "./images/BottomEnemy0.png", "./images/BottomEnemy1.png");
            aliensMatrix[4][i] = new Alien(xpos, ypos + 160, 40, 20, "./images/BottomEnemy0.png", "./images/BottomEnemy1.png");

        }

    //Start all the aliens
    for (let i = 0; i < aliensMatrix.length; i++) {
        for (let j = 0; j < aliensMatrix[i].length; j++) {
            aliensMatrix[i][j].start();
        }
    }


};

function AlienShoot() {
    if(AlienCanShoot){
    AlienCanShoot = false;
    var alien = getRandomAlien(aliensMatrix);
    if(alien != null){
        var bullet = new Bullet(alien.x + alien.width / 2, alien.y + alien.height, false);
        bullets.push(bullet);
    }
    setTimeout(function() {
        AlienCanShoot = true;
    }, 1000);    
}
}

function getRandomAlien(aliensMatrix) {
    var randomAlien = null;
    var randomColumn = Math.floor(Math.random() * 10);

    for (let i = 0; i < aliensMatrix.length; i++) {
        if(aliensMatrix[i][randomColumn].active){
            randomAlien = aliensMatrix[i][randomColumn];
        }
    }

    
    if (randomAlien == null) {
        randomAlien = getRandomAlien(aliensMatrix);
    }
    return randomAlien;
}

var StartNewGame = function () {
    bullets = [];
    createAliens();
};

//Start game
var start = function () {
    speedgame = 1;
    StartNewGame();
};

var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

//Render
var render = function () {
    
    //Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //Render player
    player.render();
    
    //Render bullets
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].render();
    }
    //Render aliensMatrix
    for (var i = 0; i < aliensMatrix.length; i++) {
        for (var j = 0; j < aliensMatrix[i].length; j++) {
            if(aliensMatrix[i][j].active)
                aliensMatrix[i][j].render();
        }
    }
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};
 
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame ||
 w.webkitRequestAnimationFrame || w.msRequestAnimationFrame 
 || w.mozRequestAnimationFrame;

 window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

        
//Game objects
var player = new Player(canvas.width / 2, canvas.height - 120, 3);
var bullets = [];
var aliensMatrix = createMatrix(5, 11);
var AlienCanShoot = true;
var speedgame = 1;

//Lets play
var then = Date.now();
start();
main();

