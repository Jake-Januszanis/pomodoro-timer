let countdown;
let remainingTime;

const reset = document.getElementById("clear");
const display = document.querySelector(".timer")
const buttons = document.querySelectorAll(".buttons");
let remainingTime = 0;

buttons.forEach((button) => {
    button.addEventListener('click', function() {
        console.log(button.value)
        timer(button.value)
    })
})

reset.addEventListener("click", function() {
    display.innerHTML = "0";
    clearInterval(countdown);
})


function timer(seconds) {
    clearInterval(countdown); 
    timerDisplay(seconds)
    

  const start = Date.now()
  const then = start + (seconds * 1000)

  countdown = setInterval(() => {
    const secondsLeft = ((then - Date.now()) / 1000);
    secondsLeft <= 0 ?  display.innerHTML = "Timer Complete": timerDisplay(secondsLeft);
  }, 100)
}

function timerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    const properSeconds = sec < 10 ? `0${sec}`: sec;
    display.innerHTML = `${minutes}:${properSeconds}`;
    
}

