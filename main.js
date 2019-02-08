"using strict";

// global variables
let intervalSpeed = 1000;
let gold = 0;
let isRevealed = false;

document.addEventListener("DOMContentLoaded", () => {
    // element references
    let goldElement = document.getElementById("goldCount");
    let mineButton = document.getElementById("mine");
    let clearButton = document.getElementById("clear");
    let hidden = document.getElementById("hid");

    // time eclapsed
    // let loadTime = Date.now();
    // let millis = Date.now()-loadTime;
    // let timePassed = Math.floor(millis/1000);
    // goldElement.textContent = `${timePassed}`;

    // call update() every second (1000 milliseconds)
    var intervalID = window.setInterval(update, intervalSpeed);
    // to stop this interval:
    // clearInterval(intervalID);

    // on click of button
    mineButton.addEventListener("click", () => {
        gold++;
        refreshGold();
    });
    clearButton.addEventListener("click", () => {
        gold=0;
        refreshGold();
    });
    
    // runs every second
    function update() {
        gold++;
        refreshGold();

        if (!isRevealed && gold >= 10){
            isRevealed = true;
            hidden.style.display = "block";
        }
    }

    // update gold count
    function refreshGold(){
        if (gold==0){
            goldElement.textContent = `Gold: *nothing*`;
        }
        
        goldElement.textContent = `Gold: ${gold}`;
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