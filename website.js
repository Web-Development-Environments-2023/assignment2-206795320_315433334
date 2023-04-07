function menuNavigation(){
    buttonNavigation();
    document.getElementById("menuSign up").addEventListener("click", gotoSignup);
    document.getElementById("menuLogin").addEventListener("click", gotoLogin);
    document.getElementById("menuConfiguration").addEventListener("click", gotoConfiguration);
    document.getElementById("menuAbout").addEventListener("click", gotoAbout);
    document.getElementById("menuHome").addEventListener("click", gotoHome);
    document.getElementById("menuGame").addEventListener("click", gotoGame);
    document.getElementById("menuContact").addEventListener("click", gotoContact);
}

function buttonNavigation(){
    //buttons and navigation
    document.getElementById("submit").addEventListener("click", gotoRegister);

}

function gotoSignup(){
    hideScreens();
    document.getElementById("Sign up").style.display = "flex";
}
function gotoLogin(){
    hideScreens();
    document.getElementById("Login").style.display = "flex";
}
function gotoConfiguration(){
    hideScreens();
    document.getElementById("Configuration").style.display = "flex";
}
function gotoHome(){
    hideScreens();
    document.getElementById("Home").style.display = "flex";
}
function gotoGame(){
    hideScreens();
    document.getElementById("Game").style.display = "flex";
}
function gotoAbout(){
    var modal = document.getElementById("About");
    document.querySelector("#About").showModal();
    document.getElementById("About").style.display = "flex";
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    document.addEventListener('keydown',function(event){
        if(event.key === "Escape"){
            modal.style.display = "none";
        }
    })
}



function gotoContact(){
    hideScreens();
    document.getElementById("Contact").style.display = "flex";
}
function gotoRegister(){
    if (signUpCheck() == true){
        hideScreens()
        //loadGame()
    }
}

function hideScreens(){
    document.getElementById("Welcome").style.display="none";
    document.getElementById("Sign up").style.display="none";
    document.getElementById("Login").style.display="none";
    document.getElementById("Game").style.display="none";
    document.getElementById("Configuration").style.display="none";
    document.getElementById("About").style.display="none";
    document.getElementById("Contact").style.display="none";
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
    return true;
}

window.addEventListener("load", menuNavigation, false);




