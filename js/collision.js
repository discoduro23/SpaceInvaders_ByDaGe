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
                    if (collision(aliensMatrix[i][j], bullets[k]) && bullets[k].mode) {
                        aliensMatrix[i][j].active = false;
                        bullets.splice(k, 1);
                        speedgame += 0.01;
                    }
                }
            }
        }
    }
}

function checkCollisionBetweenBulletsAndPlayer(player, bullets) {
    //Check collision between bullets and player
    for (let i = 0; i < bullets.length; i++) {
        if (collision(player, bullets[i]) && !bullets[i].mode) {
            bullets.splice(i, 1);
            player.lives--;
            if(player.lives == 0) {
                player.active = false;
            }
        }
    }
}