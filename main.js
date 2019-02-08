"using strict";

// global variables
let intervalSpeed = 1000;
let gold = 0;
let money = 0;
let hid1Revealed = false;
let hid2Revealed = false;

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
    let canvas = document.getElementById("canvas");

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
        // runs once, revealing hid2
        if (!hid2Revealed && money >= 20){
            hid2Revealed = true;
            // reveal all hidden elements
            hid2.style.display = "inline";
            let ctx = canvas.getContext("2d");
            ctx.font = "30px Arial";
            ctx.fillText("Hello World", 10, 50);
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