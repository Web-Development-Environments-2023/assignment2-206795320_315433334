
//users list
var users = 
        {"p": "testuser"}
    ;
var canvas;
var ctx;    
var userScore;
var selectedCharacter;
var userSpaceship;
var userSpaceshipImg;
var height_userSpaceship = 0.4;
var chickenX;
var chickenY;
let updateIntervalId;
var intervalIdTiming = 1;
let pattern = " Go!";
var chickenValue;
var playerLife;
var gameStatus = false;
var edge;
var eggs;
var userShootSpeed;
let intervalIds = [];
let Up = false;
let Down = false;
let Left = false;
let Right = false;
let chickensArray;
let chickenWidth = 50;
let userSpaceshipIsUpdated = true;
let isInitialized = false;
let eggSpeed = 3;
let eggSpeedCounter = 0;
let chickenSpeed = 0.1;
let chickenSpeedCounter = 0;
var eggImage = new Image();
eggImage.src = '/images/chickenEgg.png';
var shootImage = new Image();
shootImage.src = '/images/userShoot.png';
let createEggTimeoutId = null;
const shootTextBox = document.getElementById("keyword");
let shootKey;
var userShootArray;
let shootKeyCode = null;



function showUserScore(){
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + userScore, 8, 22);
}

function showTimeLeft(){
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Time left: " + pattern, canvas.width - 140, 22);
}

function showLifeLeft(){
    const heartImage = new Image();
    heartImage.src = srcOfHeartImg();
    const startX = 550;
    const startY = 22;
    const heartWidth = 85;
    const heartHeight = 65;
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    const textWidth = ctx.measureText("Life left:").width;
    ctx.fillText("Life left:", startX - textWidth / 2, startY + 3);
    for (let i = 0; i < 3; i++) {
      ctx.drawImage(heartImage, startX + 15 + i * (40), startY - 35, heartWidth, heartHeight);
    }
}

function srcOfHeartImg(){
    const heart = document.getElementById("heartGif");
    const srcHeart = heart.getAttribute("src");
    return srcHeart;
}

//draw userSpaceship
//Loop through each radio button to find the selected image for spaceship by user
function srcOfChosenCharacter(){
    const radioButtons = document.querySelectorAll('input[name="character"]');
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            const selectedImage = radioButton.nextElementSibling.querySelector('img');
            const srcAttribute = selectedImage.getAttribute('src');
            return srcAttribute;
        }
    }
}

function srcOfChickenImg(){
    const chicken = document.getElementById("chickenImg");
    const srcChicken = chicken.getAttribute("src");
    return srcChicken;
}

function createSpaceship(){
    const spaceshipX = canvas.width/2 -60;
    const spaceshipY = canvas.height -115;
    userShootSpeed = 2;
    const spaceship = {
        x: spaceshipX,
        y: spaceshipY,
        image: new Image(),
    };
    const chosenCharacter = srcOfChosenCharacter();
    spaceship.image.src = chosenCharacter;
    return spaceship;
}

function drawUserSpaceship(x, y){
    ctx.drawImage(userSpaceship.image, userSpaceship.x, userSpaceship.y, 75, 115);
}

function moveChickens() {
    if (edge == "left" && chickensArray[0][0].x <= 5) {
        edge = "right";
    }
    else if (edge == "right" && chickensArray[0][4].x + chickenWidth >= canvas.width) { //TODO: change this to dinamically
        edge = "left";
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            move(chickensArray[i][j]);
        }
    }
}

function move(chicken) {
    if (edge == "right") {
        chicken.x += 1;
    } 
    if (edge == "left") {
        chicken.x -= 1;
    }
}

function drawChickenAfterUpdate(chickensArray){
    for (let i = 0; i < chickensArray.length; i++) {
        for (let j = 0; j < chickensArray[i].length; j++) {
            ctx.drawImage(chickensArray[i][j].image, chickensArray[i][j].x, chickensArray[i][j].y, chickenWidth, chickenWidth);
        }
    }
}

//draw userspaceshipshoot //TODO
function drawUserShoot(userShoot){
    ctx.drawImage(shootImage, userShoot.x, userShoot.y, userShoot.width, userShoot.height);
}

function updateUserShoot(){
    for (let userShoot of userShootArray) {
        userShoot.y -= userShoot.speed;
        for (let i = 0; i < chickensArray.length; i++) {
            for (let j = 0; j < chickensArray[i].length; j++) {
                const chicken = chickensArray[i][j];
                if (!chicken.fried && collidesWith(chicken)) {
                    chicken.fried = true;
                    userScore += chicken.score;
                }
            }
        }
        drawUserShoot(userShoot);
    }
}

function collidesWith(chicken) {
    // Calculate the center point of the chicken and the user's shot
    const chickenCenterX = chicken.x + (chicken.width / 2);
    const chickenCenterY = chicken.y + (chicken.height / 2);
    const userShootCenterX = this.x + (this.width / 2);
    const userShootCenterY = this.y + (this.height / 2);
    // Calculate the distance between the centers of the chicken and the user's shot
    const dx = chickenCenterX - userShootCenterX;
    const dy = chickenCenterY - userShootCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Check if the distance is less than the sum of the radii of the chicken and the user's shot
    if (distance < (chicken.width / 2) + (this.width / 2)) {
        return true;
    } 
    else {
        return false;
    }
}

//draw chickeneggs //TODO
function drawEgg() {
    for (let i = 0; i < eggs.length; i++) {
        const egg = eggs[i];
        ctx.drawImage(eggImage, egg.x, egg.y, egg.width, egg.height);
    }
}

function updateEgg() {
    const eggsInRange = [];
    for (let i = 0; i < eggs.length; i++) {
        const egg = eggs[i];
        egg.y += 5 * chickenSpeed;
        if (egg.y > 0 && egg.y < canvas.height) {
            eggsInRange.push(egg);
        }
    }
    eggs = eggsInRange;
}

function createEgg() {
    // Randomly select a chicken from the chickensArray
    const randomRow = Math.floor(Math.random() * chickensArray.length);
    const randomColumn = Math.floor(Math.random() * chickensArray[0].length);
    const randomChicken = chickensArray[randomRow][randomColumn]; 
    const eggSpeedPerSecond = 600 / (1600 * eggSpeed);
    const eggTimeToFall = canvas.height / (eggSpeedPerSecond * 60);
    const timeToStartNextEgg = (3 / 4) * eggTimeToFall * 1000;
    // Check if the chicken is already fried, and don't create an egg if it is
    // if (randomChicken.fried) {
    //   return;
    // }
    // Create a new egg with a random x position and the y position of the selected chicken
    const egg = {
        x: randomChicken.x,
        y: randomChicken.y,
        width: 30,
        height: 40,
        timeToStartNextEgg: timeToStartNextEgg
    };
    // Add the egg to the eggs array
    eggs.push(egg);
}

function detectCollision() {
    for (let i = 0; i < eggs.length; i++) {
        const egg = eggs[i];
        if (egg.x < userSpaceship.x + userSpaceship.width &&
            egg.x + egg.width > userSpaceship.x &&
            egg.y < userSpaceship.y + userSpaceship.height &&
            egg.y + egg.height > userSpaceship.y) {
            // Collision detected
            return true;
        }
        // No collision detected
        return false;
    }
}

//draw chickens
function drawChicken(chickensArray){
    const padding = 75;
    let startY = (canvas.height * 0.6) - 260;
    for (let i = 0; i < chickensArray.length; i++) {
        const startX =  canvas.width / 2 - 295;
        for (let j = 0; j < chickensArray[i].length; j++) {
            //if (!(chickensArray[i][j].fried)){
            ctx.drawImage(chickensArray[i][j].image, startX + j * (chickenWidth + padding), startY + i * (chickenWidth + padding), chickenWidth, chickenWidth);
            //}
        }
        startY = startY - 75;
    }
}

function createChickensArray(rows, cols) {
    const chickensArray = [];
    const padding = 75;
    let startY = (canvas.height * 0.6) - 260;
    for (let i = 0; i < rows; i++) {
        chickensArray[i] = [];
        const startX =  canvas.width / 2 - 295; 
        for (let j = 0; j < cols; j++) {
            let chickenX = startX + (j * (chickenWidth + padding));
            let chickenY = startY + (i * (chickenWidth + padding));
            chickensArray[i][j] = {
                x: chickenX,
                y: chickenY,
                image: new Image(),
                score: 0, //change this dinamically
                fried: false
            };
            const chickenImg = srcOfChickenImg();
            chickensArray[i][j].image.src = chickenImg;
        }
        startY = startY - 75;
    }
    return chickensArray;
}

//change the coordinates of the elements and send them again to drawAllElements to draw them again in the new coordinates
function updateAllElements(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawUserSpaceship(userSpaceship.x, userSpaceship.y);
    moveChickens();
    drawChickenAfterUpdate(chickensArray);
    showTimeLeft();
    showLifeLeft();
    showUserScore();
    updateEgg();
    detectCollision();
    drawEgg();
    updateUserShoot();
}

function stopTimer(){
    clearInterval(updateIntervalId);
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    updateIntervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        pattern = minutes + ":" + seconds;
        showTimeLeft();
        if (--timer < 0) {
            stopTimer();
        }
    }, 1000);
} 
 
function ArrowUp(){
    const prevSpaceshipX = userSpaceship.x;
    const prevSpaceshipY = userSpaceship.y;
    if (userSpaceship.y > canvas.height * 0.6){
        userSpaceship.y -= 10;
    }
    drawUserSpaceship(prevSpaceshipX, prevSpaceshipY);
}
function ArrowDown(){
    const prevSpaceshipX = userSpaceship.x;
    const prevSpaceshipY = userSpaceship.y;
    if (userSpaceship.y < canvas.height - 115){
        userSpaceship.y += 10;
    }
    drawUserSpaceship(prevSpaceshipX, prevSpaceshipY);
}
function ArrowLeft(){
    const prevSpaceshipX = userSpaceship.x;
    const prevSpaceshipY = userSpaceship.y;
    if (userSpaceship.x > 0){
        userSpaceship.x -= 10;
    }
    drawUserSpaceship(prevSpaceshipX, prevSpaceshipY);
}
function ArrowRight(){
    const prevSpaceshipX = userSpaceship.x;
    const prevSpaceshipY = userSpaceship.y;
    if (userSpaceship.x < canvas.width - 75){
        userSpaceship.x += 10;
    }
    drawUserSpaceship(prevSpaceshipX, prevSpaceshipY);
}

function createUserShoot(){
    userShootArray = new Array();
    const userShoot = {
        x: userSpaceship.x + userSpaceship.width / 2 - 5,
        y: userSpaceship.y - 10,
        width: 10,
        height: 20,
        speed: userShootSpeed
    };
    userShootArray.push(userShoot);
}

function handleUserShoot() {
    if (shootKeyCode && event.keyCode === shootKeyCode) {
        for (let i = 0; i < userShootArray.length; i++) {
            if (!userShootArray[i].fired) {
                userShootArray[i].fired = true;
                for (let j = 0; j < chickensArray.length; j++) {
                    if (chickensArray[j].visible && collidesWith(chickensArray[j])) {
                        chickensArray[j].visible = false;
                        chickensArray[j].fried = true;
                        userScore += chickensArray[j].score;
                    }
                }
                break;
            }
        }
    }
}



function reset(){
    window.clearInterval(updateIntervalId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    userSpaceship = createSpaceship();
    chickensArray = createChickensArray(4 ,5);
    drawChicken(chickensArray);
    showLifeLeft();
    showTimeLeft();
    showUserScore();
    eggs = [];
    userShootArray = [];
    eggSpeed = 1;
}

const durationInput = document.getElementById("duration");

function start(){
    reset();
    const updateIntervalId = setInterval(updateAllElements, 1000 / 60);
    intervalIds.push(updateIntervalId);
    let speedIncreaseCount = 0;
    const speedIncreaseIntervalId = setInterval(() => {
        if (speedIncreaseCount >= 4) {
            clearInterval(speedIncreaseIntervalId);
            return;
        }
        eggSpeed += 3;
        speedIncreaseCount += 1;
    }, 5000);
    intervalIds.push(speedIncreaseIntervalId);
    const createEggWithTimeout = () => {
        createEgg();
        updateAllElements();
        createEggTimeoutId = setTimeout(createEggWithTimeout, eggs[eggs.length - 1].timeToStartNextEgg);
    };
    createEggWithTimeout();
    const UserGameTimeChoose = parseInt(durationInput.value);
    startTimer(UserGameTimeChoose);
}

function startGaming() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    userSpaceship = createSpaceship();
    eggs = [];
    edge = "right";
    document.addEventListener("keydown", function(event) {
        switch (event.key){
            case "ArrowUp":
                ArrowUp();
                break;
            case "ArrowDown":
                ArrowDown();
                break;
            case "ArrowLeft":
                ArrowLeft();
                break;
            case "ArrowRight":
                ArrowRight();
                break;  
        }              
    });
    shootTextBox.addEventListener("input", function() {
        const inputValue = this.value;
        // Convert the input value to its ASCII code and set it as the shoot key code
        shootKeyCode = inputValue.toUpperCase().charCodeAt(0);
    });
    document.addEventListener("keydown", handleUserShoot);
    start();
}

function stopGame() {    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Stop the timer
    intervalIds.forEach((id) => clearInterval(id));
}