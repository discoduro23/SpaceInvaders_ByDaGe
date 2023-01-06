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
    player.update(dt, keysDown);

    //Update bullets
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].update(dt);
        if(bullets[i].y < 0 || bullets[i].y > canvas.height){
            bullets.splice(i, 1);
        }
    }

    //Update aliens using
    for (var i = 0; i < aliensMatrix.length; i++) {
        for (var j = 0; j < aliensMatrix[i].length; j++) {
            aliensMatrix[i][j].update(dt);
        }
    }

    //Game Win
    if(isAliensMatrixClear(aliensMatrix)){
        StartNewGame();
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
};

function createAliens () {

        for (let i = 0; i < 10; i++) {
            var xpos = i * 40;

            aliensMatrix[0][i] = new Alien(xpos, 30, 40, 20, "./images/TopEnemy0.png", "./images/TopEnemy1.png");
            aliensMatrix[1][i] = new Alien(xpos, 60, 40, 20, "./images/TopEnemy0.png", "./images/TopEnemy1.png");

            aliensMatrix[2][i] = new Alien(xpos, 90, 40, 20, "./images/MidEnemy0.png", "./images/MidEnemy1.png");
            aliensMatrix[3][i] = new Alien(xpos, 120, 40, 20, "./images/MidEnemy0.png", "./images/MidEnemy1.png");

            aliensMatrix[4][i] = new Alien(xpos, 150, 40, 20, "./images/BottomEnemy0.png", "./images/BottomEnemy1.png");
            aliensMatrix[5][i] = new Alien(xpos, 180, 40, 20, "./images/BottomEnemy0.png", "./images/BottomEnemy1.png");

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
    createAliens();
};

//Start game
var start = function () {
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

//Create player
var player = new Player(0, canvas.height - 120, 3);
var bullets = [];
var aliensMatrix = createMatrix(6, 10);

//Lets play
var then = Date.now();
start();
main();

