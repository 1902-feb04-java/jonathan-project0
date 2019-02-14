"using strict";

// global variables
let intervalSpeed = 1000;
let gold = 0;
let money = 0;
let hid1Revealed = false;
let hid2Revealed = false;

// pet stuff
let petEnergy = 0;
let maxPetEnergy = 100;
let petState = 0;
let petStates = ["Sleep", "Eat", "Idle"];

function changePetState(newState){
    if (newState >= 0 && newState<petStates.length){
        petState = newState;
    }
    return petStates[petState];
}

// ES6 class
class AnimLoop {
    constructor(anim){
        this.frame = 0;
        this.animation = anim;
        this.frameSize = this.animation.length;
    }
    next(){
        this.frame = (this.frame + 1) % this.frameSize;
        return this.animation[this.frame];
    }
    current(){
        return this.animation[this.frame];
    }
}
// ES5 object creation
function makeAnimation(anim){
    return {
        frame: 0,
        animation: anim,
        frameSize: anim.length,
        next: function(){
            this.frame = (this.frame + 1) % this.frameSize;
            return this.animation[this.frame];
        }
    }
}

// ON LOAD ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // element references
    let goldElement = document.getElementById("goldCount");
    let mineButton = document.getElementById("mine");
    
    // hidden elements
    let hiddenElements = document.getElementsByClassName("startHidden");
    let hid1 = document.getElementById("hid1");
    let sellButton = document.getElementById("sell");
    let moneyElement = document.getElementById("money");
    let hid2 = document.getElementById("hid2");
    let pet = document.getElementById("pet");
    let petStateElement = document.getElementById("petState");

    // pet animations
    let sleepAnim = new AnimLoop(["(˘o˘ ) zZz","(˘O˘ ) ZzZ"]); // ES6 class
    let eatAnim = new AnimLoop(["(・—・)⊃`","(・Θ・)つ "]);
    let idleAnim = new AnimLoop(["(・_・)","(・_・)","(・_・)","(ᨆ_ᨆ)"]);
    let animationState = [sleepAnim,eatAnim,idleAnim];
    // \xao space character
    //let sleepAnim = makeAnimation(["(˘o˘ ) zZz","(˘O˘ ) ZzZ"]); // ES5 object
    
    // time eclapsed
    // let loadTime = Date.now();
    // let millis = Date.now()-loadTime;
    // let timePassed = Math.floor(millis/1000);
    // goldElement.textContent = `${timePassed}`;

    // call update() every second (1000 milliseconds)
    var intervalID = window.setInterval(update, intervalSpeed);
    // to stop this interval:
    // clearInterval(intervalID);

    // mine button
    mineButton.addEventListener("click", () => {
        gold++;
        refreshGold();
    });
    
    // runs every second ------------------------------------------------------------------------
    function update() {
        gold++;
        refreshGold();

        // runs once, revealing hid1 (the first hidden thing)
        if (!hid1Revealed && gold >= 10){
            hid1Revealed = true;
            // reveal all hidden elements
            hid1.style.display = "inline";
            // sell button
            sellButton.addEventListener("click", () => {
                money+=gold;
                gold=0;
                refreshGold();
                refreshMoney();
            });
        }
        // runs once, revealing hid2, PET
        if (!hid2Revealed && money >= 20){
            hid2Revealed = true;
            // reveal all hidden elements
            hid2.style.display = "inline";
            petStateElement.textContent = changePetState(0);
        }
        // update pet
        if (hid2Revealed){
            // PET
            switch(petState){
                case 0: // sleeping
                if (petEnergy < maxPetEnergy){
                    petEnergy+=10;
                }
                else{
                    petStateElement.textContent = changePetState(2);
                }
                break;
                case 1: // eating
                break;
                case 2: // idle
                break;
            }
            // NEXT FRAME OF ANIMATION
            pet.textContent = animationState[petState].next();
        }
    }

    // update gold count
    function refreshGold(){
        if (gold==0){
            goldElement.textContent = `Gold: *nothing*`;
        }
        goldElement.textContent = `Gold: ${gold}`;
    }
    // update money count
    function refreshMoney(){
        moneyElement.textContent = `$${money}`;
    }

    // set interval speed
    function setInterval(speed){
        if (speed > 0){
            clearInterval(intervalID);
            intervalSpeed = speed;
            intervalID = window.setInterval(update, intervalSpeed);
        }
    }
    // change interval speed
    function modifyInterval(speed){
        if ((intervalSpeed + speed) > 0){
            clearInterval(intervalID);
            intervalSpeed += speed;
            intervalID = window.setInterval(update, intervalSpeed);
        }
        else{
            console.log("Too fast! Can't modify interval.");
        }
    }
});