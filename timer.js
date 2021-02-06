

let countdown;
const reset = document.getElementById("clear");
const display = document.querySelector(".timer")
const buttons = document.querySelectorAll(".buttons");
const totalCount = document.querySelector(".total-count");
let count = 0;
// totalCount.innerHTML = count;
 



buttons.forEach((button) => {
    button.addEventListener('click', function() {
        button.value === 1500 ? workTimer(button.value) : breakTimer(button.value);
    })
})

reset.addEventListener("click", function() {
    display.innerHTML = "00:00";
    clearInterval(countdown);
})

function updateCount() {
    count++;
    totalCount.innerHTML = count;
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
                    display.innerHTML="Timer Complete"
                } else {
                    timerDisplay(secondsLeft);
                }
            }, 500)
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
                    updateCount();
                    display.innerHTML="Timer Complete"
                    
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
}






