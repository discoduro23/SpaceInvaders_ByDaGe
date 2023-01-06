//Space invaders game.js
var canvas = document.createElement("canvas"); //Create canvas element
var ctx = canvas.getContext("2d"); //Create 2d context
canvas.width = window.innerWidth; //Set canvas width and height
canvas.height = window.innerHeight;
canvas.style.position = "absolute"; //Set canvas position
document.body.appendChild(canvas); //Add canvas to body

//Game variables
var gameOver = false;

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

    //Erase from the alienExplosion array the aliens that are not active
    for (var i = 0; i < alienExplosion.length; i++) {
        if(!alienExplosion[i].active){
            alienExplosion.splice(i, 1);
        }
    }


    checkCollisionBetweenBulletsAndAliens(aliensMatrix, bullets);
    checkCollisionBetweenBulletsAndPlayer(player, bullets);
    AlienShoot(aliensMatrix);

    
};

function createAliens () {

        for (let i = 0; i < 11; i++) {
            var xpos = i * 60;
            var ypos = 60;

            aliensMatrix[0][i] = new Alien(xpos, ypos, 48, 24, "./images/TopEnemy0.png", "./images/TopEnemy1.png");

            aliensMatrix[1][i] = new Alien(xpos, ypos + 40, 48, 24, "./images/MidEnemy0.png", "./images/MidEnemy1.png");
            aliensMatrix[2][i] = new Alien(xpos, ypos + 80, 48, 24, "./images/MidEnemy0.png", "./images/MidEnemy1.png");

            aliensMatrix[3][i] = new Alien(xpos, ypos + 120, 48, 24, "./images/BottomEnemy0.png", "./images/BottomEnemy1.png");
            aliensMatrix[4][i] = new Alien(xpos, ypos + 160, 48, 24, "./images/BottomEnemy0.png", "./images/BottomEnemy1.png");

        }

    //Start all the aliens
    for (let i = 0; i < aliensMatrix.length; i++) {
        for (let j = 0; j < aliensMatrix[i].length; j++) {
            aliensMatrix[i][j].start();
        }
    }


};

var StartNewGame = function () {
    bullets = [];

    player.lives = 3;
    player.x = canvas.width / 2 - 20;
    player.y = canvas.height - 120;

    createAliens();
};

//Start game
var start = function () {
    
    
    player.score = 0;
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

    //Render alienExplosion
    for (var i = 0; i < alienExplosion.length; i++) {
        alienExplosion[i].render();
    }

};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

    if(!gameOver)
    {
        update(delta / 1000);
        render();

        //Game Win
        if(isAliensMatrixClear(aliensMatrix)){
            StartNewGame();
            speedgame -= 0.4;
        }   
    
        //Game Over
        if(player.lives <= 0 ){
            clearAlienMatrix(aliensMatrix);
            bullets = [];
            render();

            gameOver = true;

            //Draw Game Over
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);

            //Show the player score
            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Score: " + player.score, canvas.width / 2, canvas.height / 2 + 30);

            //Wait 10 seconds to restart the game
            setTimeout(function() {
                gameOver = false;
                start();
            }, 10000);
        } 

    }


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
var alienExplosion = [];

//Lets play
var then = Date.now();
start();
main();

