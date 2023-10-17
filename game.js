//Pong Game

//canvas with tennis court image
const img = new Image();
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

this.canvas.width = 800;
this.canvas.height = 570;

//variables
let playerVelocity_y = 0;
let player1Score = 0;
let player2Score = 0;
let gameIsOver = false;


img.src = './img/tennis.jpg'; 
img.onload = function () {
    //draw player
    context.fillStyle = "black";
    context.fillRect(player1.x, player1.y, player1.width,player1.height);

    requestAnimationFrame(update);

    document.addEventListener("keyup", movePlayer);
};

function update() {
    requestAnimationFrame(update);
    //clear canvas
    context.drawImage(img, 0, 0);

    // draw players
    context.fillStyle = "black";
    // player1.y += player1.velocityY;
    let nextPlayerY = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayerY)) {
        player1.y = nextPlayerY;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    // AI movement for player2
    let targetY = ball.y - player2.height / 2; 
    if (targetY < player2.y) {
        player2.velocityY = -3;
    } else if (targetY > player2.y) {
        player2.velocityY = 3;
    } else {
        player2.velocityY = 0;
    }

    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

        //ball
        context.fillStyle = "white";
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
        context.fillRect(ball.x, ball.y, ball.width, ball.height);

        if(ball.y <= 0 || ball.y + ball.height >= this.canvas.height) {
            ball.velocityY *= -1;
        }

        //bounce ball
        if(detecCollision(ball, player1)) {
            if(ball.x <= player1.x + player1.width) {
                ball.velocityX *= -1;
                playHitSound();
            }
        } else if(detecCollision(ball, player2)) {
            if(ball.x + ball.width >= player2.x) {
                ball.velocityX *= -1;
                playHitSound();
            }
        }


        if (!gameIsOver) {
            if (ball.x < 0) {
                player2Score++;
                playScoreSound();
                if (player2Score >= 10) {
                    gameIsOver = true;
                }
                resetGame(1);
            } else if (ball.x + ball.width > this.canvas.width) {
                player1Score++;
                playScoreSound();
                if (player1Score >= 10) {
                    gameIsOver = true;
                }
                resetGame(-1);
            }
        }

        if (player1Score >= 5 || player2Score >= 5) {
            gameIsOver = true;
            displayGameOver();
            return;
        }

        //scoreboard
        context.font = "45px sans-serif";
        context.fillText(player1Score, this.canvas.width / 5, 45);
        context.fillText(player2Score, this.canvas.width * 4 / 5 -45, 45);
}

function movePlayer(event) {

    //player1 moves
    if(event.code === "KeyW") {
        player1.velocityY = -5;
    } else if(event.code === "KeyS") {
            player1.velocityY = 5;
    }
}

document.addEventListener("keyup", function (event) {
    if (gameIsOver && event.code === "KeyY") {
        initializeGame();
    }
});

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + player_height > this.canvas.height);

}

//players
let player_width = 20;
let player_height = 90;

let player1 = {
    x: 10, 
    y: this.canvas.height / 2,
    width: player_width,
    height: player_height,
    velocityY: playerVelocity_y
}

let player2 = {
    x: this.canvas.width - player_width - 10, 
    y: this.canvas.height / 2,
    width: player_width,
    height: player_height,
    velocityY: playerVelocity_y
}

let ballWidth = 10;
let ballHeight = 10;

//ball object
let ball = {
    x: this.canvas.width / 2,
    y: this.canvas.height / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 3,
    velocityY: 4

};

function detecCollision(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}


function resetGame(direction){
    ball = {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: 4
    
    }
}

function playScoreSound() {
    const scoreSound = document.getElementById('scoreSound');
    scoreSound.play();
}

function playHitSound() {
    const hitSound = document.getElementById('hitSound');
    hitSound.play();
}

function displayGameOver() {
    context.font = "60px sans-serif";
    context.fillStyle = "red";
    context.fillText(`Game Over.`, canvas.width / 2 - 150, canvas.height / 2 - 30);
    context.font = "30px sans-serif";
    context.fillStyle = "red";
    context.fillText("Press y to start again.", canvas.width / 2 - 150, canvas.height / 2 + 20);
   
}

function initializeGame() {
    player1Score = 0;
    player2Score = 0;
    gameIsOver = false;

    // Reset player and ball positions, velocities, etc.
    player1.y = canvas.height / 2;
    player2.y = canvas.height / 2;
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: 1,
        velocityY: 2
    };
}
