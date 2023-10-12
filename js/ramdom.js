//variables
let btnStar =       document.querySelector('#star');
let spinner =       document.querySelector('.loader');
let numbers =       document.querySelectorAll('.number');
let badge =         document.querySelector('.badge');
let btnShow =       document.querySelector('#show');
let alert =         document.querySelector('.alertCustom');
let soundError =    new Audio("../assets/errorSound.mp3");
let soundSuccess =  new Audio("../assets/successSound.mp3");
let result =        0;
let sw =            false;
let textBegin = document.querySelector('.text-begin');

btnStar.addEventListener("click",()=>{
    resetGame();
    spinner.classList.remove("d-none");
    setTimeout(()=>{
        spinner.classList.add("d-none");
        generateRamdom();
        sw=true;
        textBegin.classList.remove("d-none");
        textBegin.textContent="Buena Suerte";
        btnShow.removeAttribute("disabled");
        clearCursor("no-selected","selected");

    },2000)
})

btnShow.addEventListener("click", showRandom);

//functions
function generateRamdom(){
    let numberRandom = Math.floor(Math.random()*(9-1)+1);
    console.log(numberRandom);
    result = numberRandom;
}

function showRandom(){
    if(badge.classList.contains("d-none")){
        badge.classList.remove("d-none");
    }
    badge.textContent = result;
}
function clearBackground(){
    numbers.forEach(content=>{
        if(content.classList.contains("bg-success") || content.classList.contains("bg-danger")){
            content.classList.remove("bg-success");
            content.classList.remove("bg-danger");
        }
    });    
}

function clearCursor(classNameRemove,classNameAdd ){
    numbers.forEach(content=>{
        if(content.classList.contains(classNameRemove)){
            content.classList.remove(classNameRemove);
            content.classList.add(classNameAdd);
        }
    });
}

    numbers.forEach(content=>{
    content.addEventListener("click",function(){
        if(!sw){
            console.log("State Not Star: ", sw);
            alert.classList.remove("d-none");
            setTimeout(()=>{
                alert.classList.add("d-none");
            },1500);
        }else{
            console.log("State Star: ", sw);
            verifyNumber(this);

        }
    })
});

function verifyNumber(tag){
    if(tag.textContent==result){
        tag.classList.add("bg-success");
        soundSuccess.play();
        textBegin.textContent="😃 Felicidades!!! 😃";
        setTimeout(resetGame, 1500);
        
    }else{
        soundError.play();
        tag.classList.add("bg-danger");
        textBegin.textContent = "😧";
    }
}

function resetGame(){
    clearBackground();
    btnShow.setAttribute("disabled","true");
    // numbers.forEach(content=>{
    //     content.classList.remove("selected");
    //     content.classList.add("no-selected");
    // });
    clearCursor("selected", "no-selected");

    badge.classList.add("d-none");
    textBegin.classList.add("d-none");
    result=0;
    sw=false;
    textBegin.textContent = "";
}