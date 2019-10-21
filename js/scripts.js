const canvas = document.getElementById("pongCanvas"),
    ctx = canvas.getContext("2d"),
    startBtn = document.getElementById("startBtn");
    gameOver = document.getElementById("gameOver").style.display = "none",
    resetBtn = document.getElementById("restartBtn").style.display = "none",
    loser = document.getElementById("loser").style.display = "none",
    winner = document.getElementById("winner").style.display = "none";

    startBtn.addEventListener("click", startGame);
    // resetBtn.addEventListener("click", () => {
        
    // });

let hit = new Audio(),
    wall = new Audio(),
    userScore = new Audio(),
    compScore = new Audio();

    hit.src = "sounds/hit.mp3";
    wall.src = "sounds/wall.mp3";
    compScore.src = "sounds/compScore.mp3";
    userScore.src = "sounds/userScore.mp3";

const user = {
    x: 0,
    y: canvas.height / 2 - 100 / 2,
    height: 100,
    width: 10,
    color: "#fff",
    score: 0
}
const comp = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 100 / 2,
    height: 100,
    width: 10,
    color: "#fff",
    score: 0
}

const net = {
    x: canvas.width / 2,
    y: 2,
    height: 10,
    width: 2,
    color: "#fff",
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "#fff",
}

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color)
    }
}

function drawText(text, x, y) {
    ctx.fillStyle = "#fff";
    ctx.font = "75px, fantasy";
    ctx.fillText(text, x, y);
}

    canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
}

function collision(ball, player) {
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

function update() {
    if (ball.x - ball.radius < 0) {
        comp.score++;
        compScore.play();
        resetBall();
    } else if (ball.x - ball.radius > canvas.width) {
        user.score++;
        userScore.play();
        resetBall();
    }
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    comp.y += ((ball.y - (comp.y + comp.height / 2))) * 0.1;
        if (ball.y + ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
        //wall.play();
    }
    let player = (ball.x + ball.radius < canvas.width / 2) ? user : comp;
        if (collision(ball, player)) {
        hit.play();
    let collidePoint = (ball.y - (player.y + player.height / 2));
        collidePoint = collidePoint / (player.height / 2);

    let angleRad = (Math.PI / 4) * collidePoint;

    let direction = (ball.x + ball.radius < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.speed += 0.1;
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawRect(comp.x, comp.y, comp.width, comp.height, comp.color);
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawNet();
    drawBall(ball.x, ball.y, ball.radius, ball.color);
    drawText(user.score, canvas.width / 4, canvas.height / 5);
    drawText(comp.score, 3 * canvas.width / 4, canvas.height / 5);
}

// function resetGame(){

// }

function win(){
    if (comp.score == 1){
        gameOver.style.display = "block";
        loser.style.display = "block";
        restartBtn.style.display="block";

    }else if (user.score == 10){
        alert("You Won!")
        document.reload()
        clearInterval(startGame);
    }
}

function startGame(){
    startBtn.style.display = "none";
    let fps = 50;
    let loop = setInterval(() => {
        draw();
        update();
        win();
    }, 1000 / fps);
}

// canvas.addEventListener("click", pauseGame);

//     function pauseGame(){
//         const pgame = setTimeout(loop, 1000/50),
       
//         if (!gamePaused){
//             pgame = clearTimeout(pgame)
//             gamePaused = true;
//         } else if (gamePaused){
//             pgame = setTimeout(loop, 1000/50);
//             gamePaused = false;
//         }
//         console.log("game paused")
//     }




   
