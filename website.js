var canvas;
var ctx;


function menuNavigation(){
    buttonNavigation();
    document.getElementById("menuSign up").addEventListener("click", gotoSignup);
    document.getElementById("menuLogin").addEventListener("click", gotoLogin);
    document.getElementById("menuConfiguration").addEventListener("click", gotoConfiguration);
    document.getElementById("menuAbout").addEventListener("click", gotoAbout);
    document.getElementById("menuHome").addEventListener("click", gotoHome);
    document.getElementById("menuGame").addEventListener("click", gotoGame);
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}


function buttonNavigation(){
    //buttons and navigation
    document.getElementById("submit").addEventListener("click", registerCheck);
    document.getElementById("startbutton").addEventListener("click", gotoGame_configuration);
    document.getElementById("startGame-button").addEventListener("click", startGame);
    document.getElementById("stopGame-button").addEventListener("click", stopGame);
    document.getElementById("login_home").addEventListener("click", gotoLogin);
    document.getElementById("signup_home").addEventListener("click", gotoSignup);

    //login button
    const loginBtn = document.getElementById("login-button");
    loginBtn.addEventListener("click", function(event) {
        event.preventDefault(); // prevent form submission
        const usernameInput = document.getElementById("username_login").value;
        const passwordInput = document.getElementById("password_login").value;
        const isValidUser = checkUser(usernameInput, passwordInput);

        if (isValidUser) {
            document.getElementById("Login").style.display = "none";
            document.getElementById("Game").style.display = "block";
        } else {
            alert("Invalid username or password");
        }
    });

    //move down, up handler:
    document.addEventListener("keydown", function (event) {
        keyDownHandler(event);
    });
}


function checkUser(username, password) {
    // check if the user exists in the users array
    if (users[username] == password) {
        return true;
    }
    return false;
}


function configurationCheck(){
    let shootbtn = document.getElementById("keyword").value;
    const shootRegex = /^[a-zA-Z\s]$/; 
    if (!(shootRegex.test(shootbtn))){
        alert("Please follow the insrtuctions below.");
        return false;
    }
    return true;
}


function gotoGame_configuration(){
    if (configurationCheck()){
        document.getElementById("Home").style.display="none";
        document.getElementById("Sign up").style.display="none";
        document.getElementById("Login").style.display="none";
        document.getElementById("Configuration").style.display="none";
        document.getElementById("About").style.display="none";
        document.getElementById("Game").style.display = "flex";
    }
    document.getElementById("Game").style.display = "flex";
        //loadGame()
}


function gotoSignup(){
    document.getElementById("Home").style.display="none";
    document.getElementById("Login").style.display="none";
    document.getElementById("Game").style.display="none";
    document.getElementById("Configuration").style.display="none";
    document.getElementById("About").style.display="none";
    document.getElementById("Sign up").style.display = "flex";
}
function gotoLogin(){
    document.getElementById("Home").style.display="none";
    document.getElementById("Sign up").style.display="none";
    document.getElementById("Game").style.display="none";
    document.getElementById("Configuration").style.display="none";
    document.getElementById("About").style.display="none";
    document.getElementById("Login").style.display = "flex";
}
function gotoConfiguration(){
    document.getElementById("Home").style.display="none";
    document.getElementById("Sign up").style.display="none";
    document.getElementById("Login").style.display="none";
    document.getElementById("Game").style.display="none";
    document.getElementById("About").style.display="none";
    document.getElementById("Configuration").style.display = "flex";
}
function gotoHome(){
    document.getElementById("Sign up").style.display="none";
    document.getElementById("Login").style.display="none";
    document.getElementById("Game").style.display="none";
    document.getElementById("Configuration").style.display="none";
    document.getElementById("About").style.display="none";
    document.getElementById("Home").style.display = "flex";
}
function gotoGame(){
    document.getElementById("Home").style.display="none";
    document.getElementById("Sign up").style.display="none";
    document.getElementById("Login").style.display="none";
    document.getElementById("Configuration").style.display="none";
    document.getElementById("About").style.display="none";
    document.getElementById("Game").style.display = "flex";
}

function gotoAbout(){
    var dialogTag = document.getElementsByTagName("dialog")[0];
    document.getElementById("About").style.display = "flex";
    //When the user clicks the button, open the modal 
    document.getElementsByClassName("closeButton")[0].onclick = function() {
        document.getElementById("About").style.display = "none";
        dialogTag.close();
    }
    //When the user clicks esc
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.getElementById("About").style.display = "none";
            dialogTag.close();
        }
    })
    //When the user clicks anywhere outside of the modal, close it
    dialogTag.showModal();
    window.onclick = function(event) {
        if (event.target == dialogTag) {
            document.getElementById("About").style.display = "none";
            dialogTag.close();
        }
    }
}

// function loginCheck(){
//     let password = document.getElementById("password_login").value;
//     let username = document.getElementById("username_login").value;
//     if(users[username]!=password)
//     {
//         alert("Username or password are incorrect");
//         return false;
//     } 
//     document.getElementById("Home").style.display="none";
//     document.getElementById("Sign up").style.display="none";
//     document.getElementById("Login").style.display="none";
//     document.getElementById("Configuration").style.display="none";
//     document.getElementById("About").style.display="none";
//     // alert("You have successfully registered!");
//     // document.getElementById("myForm").reset();
//     document.getElementById("Game").style.display = "flex";
//     return true;
// }



function registerCheck(){
    if (signUpCheck()){
        users[document.getElementById("username").value] = document.getElementById("password").value;
        document.getElementById("Home").style.display="none";
        document.getElementById("Sign up").style.display="none";
        document.getElementById("Login").style.display="none";
        document.getElementById("Configuration").style.display="none";
        document.getElementById("About").style.display="none";
        alert("You have successfully registered!");
        document.getElementById("myForm").reset();
        document.getElementById("Game").style.display = "flex";
    }
        //loadGame()
}

function signUpCheck(){
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm password").value;
    let firstName = document.getElementById("first name").value;
    let lastName = document.getElementById("last name").value;
    let email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (password.length < 8){
        alert("Password length must be atleast 8 characters");
        return false;
    }
    if (!(/[0-9]/.test(password)) || !(/[a-zA-Z]/.test(password))){
        alert("Password must include both letters and numeric digits"); 
        return false;
    }
    if (password != confirmPassword){
        alert("Passwords don't match");
        return false;
    }
    if ((/[0-9]/.test(firstName)) && (/[0-9]/.test(lastName))){
        alert("Name isn't valid, should be only letters");
        return false;
    }
    if (!emailRegex.test(email)){
        alert("This email address isn't valid");
        return false;
    }
    if (!(users[document.getElementById("username").value] == undefined)){
        alert("This user is already sign up!");
        return false;
    }
    return true;
}

window.addEventListener("load", menuNavigation, false);
window.onloadstart = gotoHome();




  
 



//start game

// var startButton = document.getElementById("start-game");
// startButton.addEventListener("click", function() {
//   var durationInput = document.getElementById("duration");
//   var duration = durationInput.value;
//   startGame(duration);
// });

// function startGame(duration) {
//   // game logic goes here
// }



// function startGame(duration) {
//     var timeLeft = duration;
//     var intervalId = setInterval(function() {
//       timeLeft--;
//       if (timeLeft === 0) {
//         clearInterval(intervalId);
//         endGame();
//       }
//       updateTimer(timeLeft);
//     }, 1000);
//   }
  
//   function updateTimer(timeLeft) {
//     var timerElement = document.getElementById("timer");
//     timerElement.textContent = formatTime(timeLeft);
//   }
  
//   function formatTime(time) {
//     var minutes = Math.floor(time / 60);
//     var seconds = time % 60;
//     return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
//   }
  
//   function endGame() {
//     // game over logic goes here
//   }