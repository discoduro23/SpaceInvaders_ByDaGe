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
        bullets[i].update();
    }
    //Update aliens
    for (var i = 0; i < aliens.length; i++) {
        aliens[i].update();
    }
};


//Render
var render = function () {
    
    
    //Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Render player
    player.render();
    
    //Render bullets
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].render();
    }
    //Render aliens
    for (var i = 0; i < aliens.length; i++) {
        aliens[i].render();
    }
};

function createAliens () {

    aliens = []; //Clear aliens array

     //Create aliens of top row
    for (var j = 0; j < 6; j++) {
        for (var i = 0; i < 10; i++) {
            aliens.push(new Alien(i * 100, j * 100, 20, 20, "./images/TopEnemy0.png", "./images/TopEnemy1.png"));
        }
        for (var i = 0; i < 10; i++) {
            aliens.push(new Alien(i * 100, j * 100 * 2, 20, 20, "./images/MidEnemy0.png", "./images/MidEnemy1.png"));
        }
        for (var i = 0; i < 10; i++) {
            aliens.push(new Alien(i * 100, j * 100 * 3, 20, 20, "./images/BottomEnemy0.png", "./images/BottomEnemy1.png"));
        }
    }
}

var StartNewGame = function () {
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


// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};
 
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame ||
 w.webkitRequestAnimationFrame || w.msRequestAnimationFrame 
 || w.mozRequestAnimationFrame;

//Game objects
 //Create player
var player = new Player(0, canvas.height - 60, 10);
var bullets = [];
var aliens = [];

//Lets play
var then = Date.now();
start();
main();

