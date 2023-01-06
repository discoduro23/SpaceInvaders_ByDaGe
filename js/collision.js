//Collision JS
//Path: js\collision.js
//Space invaders collision.js
function collision(first, second) {
    return !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y);
}

function checkCollisionBetweenBulletsAndAliens(aliensMatrix, bullets) {
    //Check collision between bullets and aliens
    for (let i = 0; i < aliensMatrix.length; i++) {
        for (let j = 0; j < aliensMatrix[i].length; j++) {
            if(aliensMatrix[i][j].active) {
                for (let k = 0; k < bullets.length; k++) {
                    if (collision(aliensMatrix[i][j], bullets[k])) {
                        aliensMatrix[i][j].active = false;
                        bullets.splice(k, 1);
                    }
                }
            }
        }
    }
}