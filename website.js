//TODO: // there is bug at "assignkey", check this
        //after change configuration (Britney spears) it send to login - we want configuration only

function menuNavigation(){
    buttonNavigation();
    document.getElementById("menuSign up").addEventListener("click", gotoSignup);
    document.getElementById("menuLogin").addEventListener("click", gotoLogin);
    document.getElementById("menuConfiguration").addEventListener("click", gotoConfiguration);
    document.getElementById("menuAbout").addEventListener("click", gotoAbout);
    document.getElementById("menuHome").addEventListener("click", gotoHome);
    document.getElementById("menuGame").addEventListener("click", gotoGame);
    
}

function assignKey() {
    if (assigningKey) {
        alert("Please follow the rules.");
        document.getElementById("Configuration").style.display="flex";
    }
    assigningKey = true;
    document.addEventListener("keydown", keydownListener);
    function keydownListener(event) {
        event.preventDefault();
        if (event.code.startsWith("Arrow")) {
            alert("You can not choose an arrow keyword.");
            document.getElementById("Configuration").style.display="flex";
        }
        document.getElementById("shootkey").value = event.code;
        document.removeEventListener("keydown", keydownListener);
        assigningKey = false;
    }
}

function buttonNavigation(){
    //buttons and navigation
    document.getElementById("submit").addEventListener("click", registerCheck);
    document.getElementById("assignkey").addEventListener("click", assignKey);
    document.getElementById("startbutton").addEventListener("click", gotoGame_configuration);
    document.getElementById("startGame-button").addEventListener("click", function(event) {
        if (document.getElementById("configuration-form").checkValidity()) {
            // the form is valid, continue to load the game
            startGaming();            
        }
        else {
            // the form is incomplete, show a notification to the user
            event.preventDefault();
            document.getElementById("configuration-form").classList.add("form-incomplete");
            alert("Please fill out all required fields before starting the game.\nWe redirect you :)");
            gotoConfiguration(); //TODO: check this
        }
    });
    document.getElementById("stopGame-button").addEventListener("click",  stopGame);
    document.addEventListener("DOMContentLoaded", function() {
        configurationFilled();
        // document.getElementById("configuration-form").addEventListener("input", checkForm);
    });
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
            document.getElementById("loginForm").reset();
            document.getElementById("Login").style.display = "none";
            document.getElementById("Configuration").style.display = "flex";
        } 
        else {
            alert("Invalid username or password");
        }
    });
 }

function checkUser(username, password) {
    // check if the user exists in the users array
    if (users[username] == password) {
        return true;
    }
    return false;
}

function configurationFilled(){
    const keyword = document.getElementById("shootkey").value;
    const duration = document.getElementById("duration").value;
    const character = document.querySelector('input[name="character"]:checked');
    const configForm = document.getElementById("configuration-form");
    const startButton = document.getElementById("startGame-button");
    if (keyword && duration && character) {
        startButton.disabled = false;
        configForm.classList.remove("form-incomplete");
    } 
    else {
        startButton.disabled = true;
        configForm.classList.add("form-incomplete");
    }
}

function configurationCheck(){
    let shootbtn = document.getElementById("shootkey").value;
    if (document.getElementById("Configuration").style.display == "flex") {
        if (shootbtn == ""){
            alert("You have to click on the button and insert a keyword to shoot with.");
            return false;
        }
        const radioButtons = document.querySelectorAll('input[name="character"]');
        let selected = false;
        radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
            selected = true;
        }
        });
        if (!selected) {
            alert("You have to select one player.");
            return false;
        }
        return true;
    }
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
    else{
        alert("You have to fill the configuration before.")
        document.getElementById("Configuration").style.display="flex";
    }
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
    const usernameInput = document.getElementById("username_login").value;
    const passwordInput = document.getElementById("password_login").value;
    const isValidUser = checkUser(usernameInput, passwordInput);
    if (isValidUser) {
        document.getElementById("Home").style.display="none";
        document.getElementById("Sign up").style.display="none";
        document.getElementById("Login").style.display="none";
        document.getElementById("Game").style.display="none";
        document.getElementById("About").style.display="none";
        document.getElementById("Configuration").style.display = "flex";
    }
    else {
        alert("You have to login or sign up first.\nWe redirect you :)");
        document.getElementById("Home").style.display="none";
        document.getElementById("Sign up").style.display="none";
        document.getElementById("Game").style.display="none";
        document.getElementById("About").style.display="none";
        document.getElementById("Configuration").style.display = "none";
        document.getElementById("Login").style.display="flex";
    }
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
    gotoGame_configuration();
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

function registerCheck(){
    if (signUpCheck()){
        users[document.getElementById("username").value] = document.getElementById("password").value;
        document.getElementById("Home").style.display="none";
        document.getElementById("Sign up").style.display="none";
        document.getElementById("Login").style.display="none";
        document.getElementById("Configuration").style.display="none";
        document.getElementById("About").style.display="none";
        document.getElementById("Game").style.display="none";
        alert("You have successfully registered!");
        document.getElementById("myForm").reset();
        document.getElementById("Configuration").style.display = "flex";
    }
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
