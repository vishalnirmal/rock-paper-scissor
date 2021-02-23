var choices = document.querySelectorAll(".step-1 > *");
var step_1 = document.querySelector(".step-1");
var step_2 = document.querySelector(".step-2");
var your_choice_display = document.querySelector(".your-choice .display");
var house_choice_display = document.querySelector(".house-choice .display");
var rules = document.querySelector(".cta-rules");
var cta_bonus = document.querySelector(".cta-bonus");
var play_again = document.querySelector(".cta-play-again");
var cta_close = document.querySelector(".close");
var count = document.querySelector(".count");
var your_choice = "";
var house_choice = "";
var score = 0;
var isBonus = false;
function getRandomChoice(){
    let options = ["rock", "paper", "scissor"];
    if(isBonus){
        options = ["rock", "paper", "scissor", "spock", "lizard"];
    }
    return options[Math.floor(Math.random()*options.length)];
}
function updateScore(){
    let text = 0;
    if(your_choice == "rock"){
        switch(house_choice){
            case "paper":
            case "spock":
                text = 0;
                break;
            case "scissor":
            case "lizard":
                text = 1;
                score++;
                break;
            default:
                text = 2;
        }
    }
    else if(your_choice == "paper"){
        switch(house_choice){
            case "lizard":
            case "scissor":
                text = 0;
                break;
            case "spock":
            case "rock":
                text = 1;
                score++;
                break;
            default:
                text = 2;
        }
    }
    else if(your_choice == "scissor"){
        switch(house_choice){
            case "spock":
            case "rock":
                text = 0;
                break;
            case "lizard":
            case "paper":
                text = 1;
                score++;
                break;
            default:
                text = 2;
        }
    }
    else if(your_choice == "spock"){
        switch(house_choice){
            case "lizard":
            case "paper":
                text = 0;
                break;
            case "scissor":
            case "rock":
                text = 1;
                score++;
                break;
            default:
                text = 2;
        }
    }
    else{
        switch(house_choice){
            case "scissor":
            case "rock":
                text = 0;
                break;
            case "spock":
            case "paper":
                text = 1;
                score++;
                break;
            default:
                text = 2;
        }
    }
    count.textContent = score;
    return text;
}
function showResult(){
    step_2.classList.add("show-result");
    let result = updateScore();
    let text = "";
    if(result == 0){
        text = "you lost";
        house_choice_display.classList.add("winner");
    }
    else if(result == 1){
        text = "you won";
        your_choice_display.classList.add("winner");
    }
    else{
        text = "draw";
    }
    document.querySelector(".result .heading").textContent = text;
}
choices.forEach(choice =>{
    choice.addEventListener("click", ()=>{
        step_1.classList.remove("show");
        step_2.classList.add("show");
        your_choice = choice.id;
        your_choice_display.classList.add(your_choice);
        document.querySelector(".footer").classList.add("hide");
        let count = 0;
        house_choice = "unselected";
        let tid = setInterval(()=>{
            house_choice_display.classList.remove(house_choice);
            house_choice = getRandomChoice();
            house_choice_display.classList.add(house_choice);
            if(count++ > 30){
                clearInterval(tid);
                setTimeout(showResult, 1000);
            }
        },50);
    }); 
});
play_again.addEventListener("click", ()=>{
    step_2.classList.remove("show-result");
    step_2.classList.remove("show");
    step_1.classList.add("show");
    house_choice_display.classList.remove(house_choice);
    house_choice_display.classList.remove("winner");
    house_choice_display.classList.add("unselected");
    your_choice_display.classList.remove(your_choice);
    your_choice_display.classList.remove("winner");
    document.querySelector(".footer").classList.remove("hide");
});
cta_close.addEventListener("click", ()=>{
    document.body.classList.remove("show-modal");
});
rules.addEventListener("click", ()=>{
    document.body.classList.add("show-modal");
    document.querySelector(".modal").scrollIntoView();
});
cta_bonus.addEventListener("click", ()=>{
    if(document.body.classList.contains("bonus")){
        document.body.classList.remove("bonus");
        isBonus = false;
    }
    else{
        document.body.classList.add("bonus");
        isBonus = true;
    }
});