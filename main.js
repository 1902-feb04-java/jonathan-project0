"using strict";

// global variables
let intervalSpeed = 1000;
let gold = 0;
let goldPerSecond = 1;
let money = 0;
let costOfGold = 1;
const numButtons = 2;

// pet stuff
let petEnergy = 0;
let maxPetEnergy = 100;
let petState = 0;
let petStates = ["Sleep", "Eat", "Idle", "Walk"];

// change pet state, and return the name of that state
function changePetState(newState){
    if (newState >= 0 && newState < petStates.length){
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
    let hid = [];
    let hidButton = [];
    let hidRevealed = [];
    for (let i=0; i<numButtons; i++){
        hid.push(document.getElementById("hid"+i));
        hidButton.push(document.getElementById("hidButton"+i));
        hidRevealed.push(false);
    }
    let goldCostElement = document.getElementById("goldCost");
    let sellButton = document.getElementById("sell");
    let moneyElement = document.getElementById("money");
    let pet = document.getElementById("pet");
    let petStateElement = document.getElementById("petState");
    var energyBar = document.getElementById("energyBar");

    // pet animations
    let sleepAnim = new AnimLoop(["(˘o˘ ) zZz","(˘O˘ ) ZzZ"]); // ES6 class
    let eatAnim = new AnimLoop(["(・—・)⊃`","(・Θ・)つ "]);
    let idleAnim = new AnimLoop(["(・_・)","(・_・)","(・_・)","(ᨆ_ᨆ)"]);
    let walkAnim = new AnimLoop(["┌(;・-・)┘","└(;・-・)┐"]);
    let animationState = [sleepAnim,eatAnim,idleAnim,walkAnim];
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
        refreshGold(1);
    });
    // press to reveal hid0
    hidButton[0].onclick = () => {
        if (gold>=10){
            hidRevealed[0] = true;
            // reveal all hidden elements
            hid[0].style.display = "inline";
            hidButton[0].style.display = "none";
            refreshGold(-10);
        }
    };
    // press to reveal hid1
    hidButton[1].onclick = () => {
        if (money>=50){
            hidRevealed[1] = true;
            // reveal all hidden elements
            hid[1].style.display = "inline";
            hidButton[1].style.display = "none";
            refreshMoney(-50);

            // initialize pet with sleeping animation
            petStateElement.textContent = changePetState(0);
        }
    };
    // sell button (UNDER HID0)
    sellButton.addEventListener("click", () => {
        refreshMoney(gold*costOfGold);
        refreshGold(-gold);
    });
    
    // runs every second ------------------------------------------------------------------------
    function update() {
        refreshGold(goldPerSecond);
        costOfGold = roundToDollar(Math.random() +.5);
        goldCostElement.textContent = costOfGold;

        // runs once, revealing hid0 (the first hidden thing)
        if (!hidRevealed[0] && gold >= 5){
            hidButton0.style.display = "inline";
        }
        // runs once, revealing hid1, PET
        if (!hidRevealed[1] && money > 0){
            hidButton1.style.display = "inline";
            
        }

        // update pet
        if (hidRevealed[1]){
            // PET
            switch(petState){
                case 0: // sleeping
                if (petEnergy < maxPetEnergy){
                    petEnergy+=10;
                }
                else{
                    // if energy full
                    // change to idle
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
            energyBar.style.width = petEnergy + '%'; 
            //energyBar.innerHTML = petEnergy * 1 + '%';
        }
    }



        // update gold count, adding or subtracting by an amount
    function refreshGold(gAdd=0){
        if (gAdd+gold >=0){
            gold+=gAdd;
        }
        if (gold==0){
            goldElement.textContent = `Gold: *nothing*`;
        }
        goldElement.textContent = `Gold: ${gold}`;
    }
    // update money count, adding or subtracting by an amount
    function refreshMoney(mAdd=0){
        if (money+mAdd >=0){
            money+=mAdd;
        }
        //let dollars = roundTo
        moneyElement.textContent = `$${roundToDollar(money)}`;
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

// take number, then floor to two digit places
function roundToDollar(dollars){
    return (Math.floor(100*(dollars)))/100;
}