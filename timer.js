

let countdown;
const reset = document.getElementById("reset-btn");
const display = document.querySelector(".timer")
const buttons = document.querySelectorAll(".buttons");
const totalCount = document.querySelector(".total-count");
const title = document.querySelector('title');
const body = document.querySelector('body');
const totalCountDisplay = document.querySelector(".total-count-display");
const totalCountBtn = document.querySelector(".total-count-display-btn");
let count = 0;
 

buttons.forEach((button) => {
    button.addEventListener('click', function() {
        button.name === 'work' ? workTimer(button.value) : breakTimer(button.value);
        if (button.value === '300') {
            document.body.style.backgroundColor = "#40916c";
        } else if (button.value === '600') {
            document.body.style.backgroundColor = "#f9c74f";
        } else {
            document.body.style.backgroundColor = "#93c9ff";
        }
    })
})

reset.addEventListener("click", function() {
    display.innerHTML = "0:00";
    clearInterval(countdown);
})

function updateCount() {
    count++;
    totalCount.innerText = ""
    for (i = 0; i < count; i++){
        totalCount.innerText += "*"
    }
}

totalCountBtn.addEventListener('click', function() {
    let time = count * 25;
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    totalCountDisplay.innerText = `Total time spent studying today is ${hours} hours and ${minutes} minutes`;
});

function displayTotalTime() {
    let time = count * 25;
    totalCountDisplay.innerText = time;
}

function workTimer(seconds) {
    clearInterval(countdown); 
    timerDisplay(seconds);
    
        const start = Date.now()
        const end = start + (seconds * 1000)

            countdown = setInterval(() => {
                const secondsLeft = ((end - Date.now()) / 1000);
                if (secondsLeft <= 0) {
                    clearInterval(countdown);
                    updateCount();
                    display.innerHTML="0:00"
                } else {
                    timerDisplay(secondsLeft);
                }
            }, 100)
}

function breakTimer(seconds) {
    clearInterval(countdown); 
    timerDisplay(seconds);
    
        const start = Date.now()
        const end = start + (seconds * 1000)

            countdown = setInterval(() => {
                const secondsLeft = ((end - Date.now()) / 1000);
                if (secondsLeft <= 0) {
                    clearInterval(countdown);
                    display.innerHTML="0:00"
                    
                } else {
                    timerDisplay(secondsLeft);
                }
            }, 1000)
}

function timerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    const properSeconds = sec < 10 ? `0${sec}`: sec;
    display.innerHTML = `${minutes}:${properSeconds}`;
    title.innerText = `Pomo Timer - ${minutes}:${properSeconds}`
}






