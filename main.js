"using strict";

// global variables
let intervalSpeed = 1000;
let gold = 0;
let money = 0;
let isRevealed = false;

document.addEventListener("DOMContentLoaded", () => {
    // element references
    let goldElement = document.getElementById("goldCount");
    let mineButton = document.getElementById("mine");

    // hidden elements
    let hiddenElements = document.getElementsByClassName("hid");
    let sellButton = document.getElementById("sell");
    let moneyElement = document.getElementById("money");

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
    
    // runs every second
    function update() {
        gold++;
        refreshGold();

        if (!isRevealed && gold >= 10){
            isRevealed = true;
            // reveal all hidden elements
            for (let i = 0; i<hiddenElements.length; i++){
                hiddenElements[i].style.display = "inline";
            }
            // sell button
            sellButton.addEventListener("click", () => {
                money+=gold;
                gold=0;
                refreshGold();
                refreshMoney();
            });
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