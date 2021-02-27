
const resetBtn = document.getElementById("reset-btn");
const display = document.querySelector(".timer__display")
const buttons = document.querySelectorAll(".buttons");
const totalCount = document.querySelector(".total__icons");
const title = document.querySelector('title');
const body = document.querySelector('body');
const totalCountDisplay = document.querySelector(".total__message");
const totalCountBtn = document.querySelector(".total__message-btn");
const saveBtn = document.querySelector(".save-btn");
let count = 0;
let countdown;
 

    // Functions for App buttons**
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

    //Button action to display time studying for day
    totalCountBtn.addEventListener('click', function() {
        let time = count * 25;
        let hours = Math.floor(time / 60);
        let minutes = time % 60;
            if (hours === 0) {
                totalCountDisplay.innerText = `Today's session: ${minutes} minutes`
            } else if (hours === 1) {
                totalCountDisplay.innerText = `Today's session: ${hours} hour and ${minutes} minutes`;
            } else {
                totalCountDisplay.innerText = `Today's session: ${hours} hours and ${minutes} minutes`;
            }

         setTimeout(function() {
             totalCountDisplay.innerText = ""
         }, 4000)   
    });

    //Button to reset timer to zero
    resetBtn.addEventListener("click", function() {
        display.innerHTML = "0:00";
        clearInterval(countdown);
    })

    //Save button functions
    saveBtn.addEventListener('click', function() {
        fetch("/user/dashboard", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({count: count})
        }).then(res => res.json().then(data => res.send(data))).then(window.location.reload())
    })
    

function updateCount() {
    count++;
    
    totalCount.innerText = ""
    for (i = 0; i < count; i++){
        totalCount.innerText += "*";
    }

}



    //Timer functions both work and break 

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



