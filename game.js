
//users list
var users =  {"p":"testuser"} ;
var chickensURL = []

const scoreBox = document.getElementById("score-box");
const score = document.getElementById("score");
var userScore;
var selectedCharacter;
var userSpaceship;
var userSpaceshipImg;
var height_userSpaceship = 0.4;
var chickensArray;
var chickenObject;
var spaceShipImg;
var chickenImg;



function startGameAfterConf() {
    const characterRadioButtons = document.getElementsByName("character");
    // Loop through each radio button to find the selected one
    for (let i = 0; i < characterRadioButtons.length; i++) {
      if (characterRadioButtons[i].checked) {
        selectedCharacter = characterRadioButtons[i].value;
        break;
      }
    }
}


function initObjects(){
    document.getElementById("score-box").style.display = "flex";
    canvas.style.display = "flex";
    userScore = 0;
    let height = canvas.height;
    let width = canvas.width;
    document.getElementById("score").innerHTML = "Score:" + userScore;
    //create 2D array chickensArray
    chickensArray = new Array(4);
    for (let i = 0; i < chickensArray.length; i++) {
        chickensArray[i] = new Array(5).fill(0);
    }
    //2 loops on the array, for each [i][j] do createChickens()
    for (let i = 0; i < chickensArray.length; i++) {
        for (let j = 0; j < chickensArray[i].length; j++) {
            chickensArray[i][j] = createChickens();
        }
    }
    createUserSpaceship();
}

function createUserSpaceship(){
    userSpaceship = new Object();
    userSpaceship.x = canvas.width;
    userSpaceship.y = canvas.height;
    spaceShipImg = new Image();
    spaceShipImg.src = selectedCharacter;
}

function createChickens(){
    chickenObject = new Object();
    chickenObject.x = 
    chickenObject.y = 
    chickenImg = new Image();
    chickenImg.src = "";

}


function startGame() {
    initObjects();  
    ctx.fillStyle = "red";
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.fillRect(centerX - 50, centerY - 50, 100, 100);
    
    // Update the score every second
    let currentScore = 0;
    const intervalId = setInterval(() => {
        currentScore++;
        score.innerText = currentScore;
    }, 1000);
    
    // Store the interval ID so we can stop the timer later
    canvas.dataset.intervalId = intervalId;
}

function stopGame() {
    // Hide the score box
    scoreBox.style.display = "none";
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Stop the timer
    clearInterval(canvas.dataset.intervalId);
}
