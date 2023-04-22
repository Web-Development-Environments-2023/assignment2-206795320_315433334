//users list
var users = 
        {"p": "testuser"}
    ;
var canvas;
var ctx;    
var userScore;
var selectedCharacter;
var userSpaceship;
var chickenX;
var chickenY;
var interval;
var intervalOfTimer;
var pattern;
var playerLife;
var edge;   
var eggs;
var userShootSpeed;
var spaceshipX;
var spaceshipY;
var userShoot;
var userShootArray;
var chickenSpeed;
var eggSpeed;
var speedIncreaseCount;
var lastTime;
var startTime;
var inGame = false;
let chickensArray;
let Up = false;
let Down = false;
let Left = false;
let Right = false;
let chickenWidth = 50;
let chickenHeight = 50;
let heartPosition = 0;
const durationInput = document.getElementById("duration");
const SadGamingCat = document.getElementById("SadGamingCat");
const srcSadGamingCat = SadGamingCat.getAttribute("src");

const youCanDoBetterGif = document.getElementById("youCanDoBetterGif");
const srcyouCanDoBetterGif = youCanDoBetterGif.getAttribute("src");

const winnerGif = document.getElementById("winnerGif");
const srcwinnerGif = winnerGif.getAttribute("src");

const championGif = document.getElementById("championGif");
const srcchampionGif = championGif.getAttribute("src");

// const nickiMinaj = document.getElementById("nickiMinaj");
// const michaelJackson = document.getElementById("michaelJackson");
// const survivor = document.getElementById("survivor");
// const britneySpears = document.getElementById("britneySpears");
// const saritHadad = document.getElementById("saritHadad");

// const nickiMinaj = new Audio('images\Nicki_Minaj_-_Starships_[NaijaGreen.Com]_.mp3');
// nickiMinaj.volume = 0.019;
// nickiMinaj.loop = true;
// const michaelJackson = new Audio('images\championAudio.mp3');
// michaelJackson.volume = 0.05;
// michaelJackson.loop = true;
// const survivor = new Audio('images\winnerAudio.mp3');
// survivor.volume = 0.025;
// survivor.loop = true;
// const britneySpears = new Audio('images\youCanDoBetter.mp3');
// britneySpears.volume = 0.025;
// britneySpears.loop = true;
// const saritHadad = new Audio('images\youLost.mp3');
// saritHadad.volume = 0.03;
// saritHadad.loop = true;




/* <audio id = "nickiMinaj" preload = "auto">
<source src = "images\Nicki_Minaj_-_Starships_[NaijaGreen.Com]_.mp3" type = "audio/ogg"></audio>

<audio id = "michaelJackson" preload = "auto">
<source src = "images\championAudio.mp3" type = "audio/ogg"></audio>

<audio id = "survivor" preload = "auto">
<source src = "images\winnerAudio.mp3" type = "audio/ogg"></audio>

<audio id = "britneySpears" preload = "auto">
<source src = "images\youCanDoBetter.mp3" type = "audio/ogg"></audio>

<audio id = "saritHadad" preload = "auto">
<source src = "images\youLost.mp3" type = "audio/ogg"></audio> */


const nickiMinaj = document.getElementById("nickiMinaj");
nickiMinaj.volume = 0.019;
const michaelJackson = document.getElementById("michaelJackson");
michaelJackson.volume = 0.05;
const survivor = document.getElementById("survivor");
survivor.volume = 0.025;
const britneySpears = document.getElementById("britneySpears");
britneySpears.volume = 0.025;
const saritHadad = document.getElementById("saritHadad");
saritHadad.volume = 0.03;










function showUserScore(){
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + userScore, 8, 28);
}

function showTimeLeft(){
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    if (pattern == undefined) {
        pattern = " Go!";
    }
    ctx.fillText("Time left: " + pattern, canvas.width - 140, 28);
}

function showLifeLeft() {
    heartPosition += 0.3;
    const startX = 550;
    const startY = 28;
    const heartWidth = 45;
    const heartHeight = 35;
    const spacing = 50;
    const yOffset = 15;
    const heartImage = srcOfHeartImg();
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    const textWidth = ctx.measureText("Life left:").width;
    ctx.fillText("Life left:", startX - textWidth / 2, startY);
    for (let i = 0; i < playerLife; i++) {
        const x = 585 + (i * spacing);
        const y = -11.5 + (Math.sin(heartPosition + (i * Math.PI * 0.5)) * 2);
        ctx.drawImage(heartImage, x, y + yOffset, heartWidth, heartHeight);
    }
}

function srcOfHeartImg(){
    const heartImage = document.getElementById("LifeSaver");
    const imgSrc = heartImage.getAttribute("src");
    const img = new Image();
    img.src = imgSrc;
    return img;
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
    firstShootPlayer = true;
    const spaceship = {
        x: spaceshipX,
        y: spaceshipY,
        width: 75,
        height: 115,
        image: new Image()
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
        chicken.x += chickenSpeed;
    } 
    if (edge == "left") {
        chicken.x -= chickenSpeed;
    }
}

function drawChickenAfterUpdate(chickensArray){
    for (let i = 0; i < chickensArray.length; i++) {
        for (let j = 0; j < chickensArray[i].length; j++) {
            if (!(chickensArray[i][j].fried)){
                ctx.drawImage(chickensArray[i][j].image, chickensArray[i][j].x, chickensArray[i][j].y, chickenWidth, chickenHeight);
            }
        }
    }
}

//draw userspaceshipshoot
function drawUserShoot(userShoot){
    ctx.drawImage(userShoot.image, userShoot.x, userShoot.y, userShoot.width, userShoot.height);
}

function updateUserShoot(){
    for (let userShoot of userShootArray) {
        if (userShoot.shootAlive){
            userShoot.y -= userShoot.speed;
            for (let i = 0; i < chickensArray.length; i++) {
                for (let j = 0; j < chickensArray[i].length; j++) {
                    const chicken = chickensArray[i][j];
                    if (!(chicken.fried) && (collidesWithUserShoot(chicken, userShoot))) {
                        chicken.fried = true;
                        userShoot.shootAlive = false;
                        userScore += chicken.score;
                    }
                }
            }
            if (userShoot.y < 0) {
                userShoot.shootAlive = false;
            }
            if (userShoot.y <= 45) {
                const index = userShootArray.indexOf(userShoot);
                userShootArray.splice(index, 1);
            }
            if (userShoot.shootAlive){
                drawUserShoot(userShoot);
            }
        }
    }
    // check if all chickens are fried
    const allChickensFried = chickensArray.every(row => row.every(chicken => chicken.fried));
    if (allChickensFried) {
        inGame = false;
        nickiMinaj.pause();
        nickiMinaj.currentTime = 0;
        handleChampion();
        stopTimer();
    }
}

function collidesWithUserShoot(chicken, userShoot) {
    const chickenCenterX = chicken.x + (chicken.width / 2);
    const chickenCenterY = chicken.y + (chicken.height / 2);
    const userShootCenterX = userShoot.x + (userShoot.width / 2);
    const userShootCenterY = userShoot.y + (userShoot.height / 2);
    const dxShoot = chickenCenterX - userShootCenterX;
    const dyShoot = chickenCenterY - userShootCenterY;
    const distanceShoot = Math.sqrt(dxShoot * dxShoot + dyShoot * dyShoot);
    if (distanceShoot < (chicken.width / 2) + (userShoot.width / 2)) {
        return true;
    }
    return false;
}

function collidesWithEgg(chicken, userSpaceship) {
    // Calculate the center point of the chicken and the user's shot or the user spaceship
    const chickenCenterX = chicken.x + (chicken.width / 2);
    const chickenCenterY = chicken.y + (chicken.height / 2);
    const spaceshipCenterX = userSpaceship.x + (userSpaceship.width / 2);
    const spaceshipCenterY = userSpaceship.y + (userSpaceship.height / 2);
    // Calculate the distance between the centers of the chicken and the user's shot or the user spaceship
    const dxEgg = spaceshipCenterX - chickenCenterX;
    const dyEgg = spaceshipCenterY - chickenCenterY;
    const distanceEgg = Math.sqrt(dxEgg * dxEgg + dyEgg * dyEgg);
    // Check if the distance is less than the sum of the radii of the chicken and the user's shot or the user spaceship
    if (distanceEgg < (userSpaceship.width / 2) + (chicken.width / 2)) {
        return true;
    }
    return false;
}

//draw chickeneggs
function drawEgg(egg) {
    ctx.drawImage(egg.image, egg.x, egg.y, egg.width, egg.height);
}

function updateEgg() {
    if (eggs.length === 0 || eggs[eggs.length - 1].y >= canvas.height * 0.75) {
        createEgg();
    }
    const eggsInRange = [];
    for (let i = 0; i < eggs.length; i++) {
        const egg = eggs[i];
        if (!egg.broke) {
            egg.y += eggSpeed;
            if (egg.y > 0 && egg.y < canvas.height) {
                if (collidesWithEgg(egg, userSpaceship)) {
                    playerLife -= 1;
                    if (playerLife == 0) {
                        inGame = false;
                        nickiMinaj.pause();
                        nickiMinaj.currentTime = 0;
                        handleOutOfLives();
                    }
                    userSpaceship.x = spaceshipX;
                    userSpaceship.y = spaceshipY;
                }
                else{
                    eggsInRange.push(egg);
                }
            }
            drawEgg(egg);
        }
    }
    eggs = eggsInRange;
}

function createEgg() {
    // Randomly select a chicken from the chickensArray
    const randomRow = Math.floor(Math.random() * chickensArray.length);
    const randomColumn = Math.floor(Math.random() * chickensArray[0].length);
    const randomChicken = chickensArray[randomRow][randomColumn]; 
    // Check if the chicken is already fried, and don't create an egg if it is
    if (randomChicken.fried) {
        return;
    }
    // Create a new egg with a random x position and the y position of the selected chicken
    const egg = {
        x: randomChicken.x,
        y: randomChicken.y,
        width: 30,
        height: 40,
        speed: eggSpeed,
        image: new Image(),
        broke: false
    };
    // Add the egg to the eggs array
    const eggImage = srcOfChickenEggImg();
    egg.image.src = eggImage;
    eggs.push(egg);
}

function srcOfChickenEggImg(){
    const eggImage = document.getElementById("chickenEgg");
    const srcEgg = eggImage.getAttribute("src");
    return srcEgg;
}

//draw chickens
function drawChicken(chickensArray){
    const padding = 75;
    let startY = (canvas.height * 0.6) - 260;
    for (let i = 0; i < chickensArray.length; i++) {
        const startX =  canvas.width / 2 - 295;
        for (let j = 0; j < chickensArray[i].length; j++) {
            if (!(chickensArray[i][j].fried)){
                ctx.drawImage(chickensArray[i][j].image, startX + j * (chickenWidth + padding), startY + i * (chickenWidth + padding), chickenWidth, chickenHeight);
            }
        }
        startY = startY - 75;
    }
}

function createChickensArray(rows, cols) {
    const chickensArray = [];
    const padding = 75;
    chickenSpeed = 1;
    eggSpeed = 1;
    let startY = (canvas.height * 0.6) - 250;
    for (let i = 0; i < rows; i++) {
        chickensArray[i] = [];
        const startX =  canvas.width / 2 - 295; 
        const score = 20 - (i * 5);
        for (let j = 0; j < cols; j++) {
            let chickenX = startX + (j * (chickenWidth + padding));
            let chickenY = startY + (i * (chickenWidth + padding));
            chickensArray[i][j] = {
                x: chickenX,
                y: chickenY,
                width: chickenWidth,
                height: chickenHeight,
                image: new Image(),
                speed: chickenSpeed, //check
                score: score,
                fried: false
            };
            const chickenImg = srcOfChickenImg();
            chickensArray[i][j].image.src = chickenImg;
        }
        startY = startY - 75;
    }
    return chickensArray;
}


function updateChickensAndEggsSpeed() {
    const elapsedTime = (Date.now() - startTime) / 1000;
    const maxSpeedIncreases = 4;
    const increaseInterval = 5;
    const speedIncreaseCount = Math.floor(elapsedTime / increaseInterval);
    if (speedIncreaseCount < maxSpeedIncreases) {
        chickenSpeed = 0.5 + 1 * speedIncreaseCount;
        eggSpeed = 0.5 + speedIncreaseCount;
    }
}

function closeDialogModal() {
    const dialogContainer = document.querySelector('.dialog-container');
    if (dialogContainer) {
        dialogContainer.parentNode.removeChild(dialogContainer);
    }
}
  

// create the dialog modals
function createFinalScoreDialogModal(title, message, imageSrc, buttons, dialogClass, id) {
    // create the dialog container element
    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialog-container');
    if (dialogClass) {
        dialogContainer.classList.add(dialogClass);
    }
    const titleElement = document.createElement('h2');
    titleElement.innerText = title;
    const image = document.createElement('img');
    image.src = imageSrc;
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container1');
    // Dynamic buttons objects
    buttons.forEach((button) => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = button.label;
        buttonElement.addEventListener('click', button.action);
        buttonContainer.appendChild(buttonElement);
    });
    const idElement = document.createElement('div');
    idElement.id = id;
    // Add the contents to the dialog container
    dialogContainer.appendChild(titleElement);
    dialogContainer.appendChild(messageElement);
    dialogContainer.appendChild(image);
    dialogContainer.appendChild(buttonContainer);
    idElement.appendChild(dialogContainer);
    // Create the dialog overlay element
    const dialogOverlay = document.createElement('div');
    dialogOverlay.id = id;
    dialogOverlay.appendChild(dialogContainer);
    // Add the dialog overlay to the document
    document.body.appendChild(dialogOverlay);
}

// handle when the player runs out of lives
function handleOutOfLives() {
    saritHadad.play();
    createFinalScoreDialogModal(
        'You Lost!',
        'You have run out of lives. You can try again.',
        srcSadGamingCat,
        [
            {
                label: 'Try again',
                action: () => {
                    saritHadad.pause();
                    saritHadad.currentTime = 0;
                    closeDialogModal();
                    startGaming();
                },
            },
        ],
        'out-of-lives-dialog',
        'out-of-lives-dialog'
    );
    const modalElement = document.getElementById('out-of-lives-dialog');
    modalElement.addEventListener('hide', () => {
        saritHadad.pause();
        saritHadad.currentTime = 0;
    });
}
  
// handle when the player runs out of time
function handleOutOfTime() {
    britneySpears.play();
    createFinalScoreDialogModal(
        'You can do better!',
        `You have run out of time. You've scored (only..) ${userScore} points.`,
        srcyouCanDoBetterGif,
        [
            {
                label: 'Try again',
                action: () => {
                    britneySpears.pause();
                    britneySpears.currentTime = 0;
                    closeDialogModal();
                    startGaming();
                },
            },
            {
                label: 'Change configuration',
                action: () => {
                    britneySpears.pause();
                    britneySpears.currentTime = 0;
                    closeDialogModal();
                    gotoConfiguration();
                },
            },
        ],
        'out-of-time-dialog',
        'out-of-time-dialog'
    );
    const modalElement = document.getElementById('out-of-time-dialog');
    modalElement.addEventListener('hide', () => {
        britneySpears.pause();
        britneySpears.currentTime = 0;
    });
}
  
// handle when the player wins
function handleWiner() {
    survivor.play();
    createFinalScoreDialogModal(
        'Winner!',
        ` `,
        srcwinnerGif,
        [
            {
                label: 'Play again',
                action: () => {
                    survivor.pause();
                    survivor.currentTime = 0;
                    closeDialogModal();
                    startGaming();
                },
            },
            // {
            //     label: 'Change configuration',
            //     action: () => {
            //         gotoConfiguration();
            //         closeDialogModal();
            //     },
            // },
        ],
        'out-of-win-dialog',
        'out-of-win-dialog'
    );
    const modalElement = document.getElementById('out-of-win-dialog');
    modalElement.addEventListener('hide', () => {
        survivor.pause();
        survivor.currentTime = 0;
    });
}

// handle when the player is champion
function handleChampion() {
    michaelJackson.play();
    createFinalScoreDialogModal(
        'Champion!',
        ` `,
        srcchampionGif,
        [
            {
                label: 'Play again',
                action: () => {
                    michaelJackson.pause();
                    michaelJackson.currentTime = 0;
                    closeDialogModal();
                    startGaming();
                },
            },
            // {
            //     label: 'Change configuration',
            //     action: () => {
            //         gotoConfiguration();
            //         closeDialogModal();
            //     },
            // },
        ],
        'out-of-champion-dialog',
        'out-of-champion-dialog'
    );
    const modalElement = document.getElementById('out-of-champion-dialog');
    modalElement.addEventListener('hide', () => {
        michaelJackson.pause();
        michaelJackson.currentTime = 0;
    });
}

//change the coordinates of the elements and send them again to drawAllElements to draw them again in the new coordinates
function updateAllElements(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!inGame) {
        window.clearInterval(interval);
        stopTimer();
        return;
    }
    drawUserSpaceship(userSpaceship.x, userSpaceship.y);
    moveChickens();
    drawChickenAfterUpdate(chickensArray);
    showTimeLeft();
    showLifeLeft();
    showUserScore();
    updateUserShoot();
    updateEgg();
    updateChickensAndEggsSpeed();
}

function stopTimer(){
    clearInterval(intervalOfTimer);
}

function startTimer(duration) {
    let timer = duration;
    let minutes, seconds;
    intervalOfTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        pattern = minutes + ":" + seconds;
        showTimeLeft();
        timer--;
        if (timer < 0 && userScore < 100) {
            inGame = false;
            nickiMinaj.pause();
            nickiMinaj.currentTime = 0;
            stopTimer();
            handleOutOfTime();
        }
        else if (timer < 0 && userScore >= 100) {
            inGame = false;
            nickiMinaj.pause();
            nickiMinaj.currentTime = 0;
            stopTimer();
            handleWiner();
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







function handleUserShoot() {
    userShoot = {
        x: userSpaceship.x + 32,
        y: userSpaceship.y,
        width: 28,
        height: 30,
        speed: userShootSpeed,
        shootAlive: true,
        image: new Image()
    };
    const shootImage = srcOfUserShootImg();
    userShoot.image.src = shootImage;
    userShootArray.push(userShoot);
}

function srcOfUserShootImg(){
    const shoot = document.getElementById("shootImg");
    const srcShoot = shoot.getAttribute("src");
    return srcShoot;
}

function createUserShoot(){
    userShootArray = new Array();
}

function createEggsArray(){
    eggs = new Array();
}

function reset(){
    window.clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    userScore = 0;
    playerLife = 3;
    userSpaceship = createSpaceship();
    createUserShoot();
    chickensArray = createChickensArray(4 ,5);
    drawChicken(chickensArray);
    lastTime = 0;
    showLifeLeft();
    showTimeLeft();
    showUserScore();
    userShootArray = [];
    eggs = [];
    stopTimer();
}


function start(){
    inGame = true;
    reset();
    startTime = Date.now();
    interval = setInterval(updateAllElements, 1000 / 60);
    const UserGameTimeChoose = parseInt(durationInput.value);
    startTimer(UserGameTimeChoose);
}

function startGaming() {
    pattern = " Go!";
    if (!nickiMinaj.paused) {
        nickiMinaj.currentTime = 0;
        nickiMinaj.play();
    }
    nickiMinaj.play();
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    // showCanvas();
    spaceshipX = canvas.width/2 -60;
    spaceshipY = canvas.height -115;
    userSpaceship = createSpaceship();
    createUserShoot();
    document.addEventListener("keydown", handleKeyDown);
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
    start();
}

function stopGame() {
    inGame = false;
    // hideCanvas();
    nickiMinaj.pause();
    nickiMinaj.currentTime = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("Home").style.display="flex";
}
