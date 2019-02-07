"using strict";

let gold = 0;

document.addEventListener("DOMContentLoaded", () => {
    let text1 = document.getElementById("text1");
    let button1 = document.getElementById("button1");
    text1.textContent = ":O";
    let loadTime = Date.now();
    let millis = Date.now()-loadTime;
    let timePassed = Math.floor(millis/1000);
    text1.textContent = `${timePassed}`;

    button1.addEventListener("click", () => {
        gold++;
        updateGold();
    });

    var intervalID = window.setInterval(myCallback, 1000);
    function myCallback() {
        gold++;
        updateGold();
    }
    function updateGold(){
        text1.textContent = `${gold}`;
    }
});