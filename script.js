let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("short-timer")
let long = document.getElementById("long-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")
let resetBtn = document.getElementById("reset") // NEW: Reset button
let timerMsg = document.getElementById("timer-message")
let button = document.querySelector(".button")

let currentTimer = null
let myInterval = null
let remainingTime = null


// show the default timer(when  the page leads it shows the pomodoro timer as default)
function showDefaultTimer() {
    pomodoro.style.display = "block"
    short.style.display = "none"
    long.style.display = "none"
    currentTimer = null;
    resetTimerDisplay(pomodoro)
}

showDefaultTimer()//shows pomodoro as default
//a function to hide all timer displays
function hideAll() {
    timers.forEach((timer) => {
        timer.style.display = "none"
    })
}
session.addEventListener("click", () =>{
    hideAll()
    pomodoro.style.display="block";
    session.classList.add("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");
    currentTimer=pomodoro
})

// Reset state when switching timers
function resetStateOnSwitch() {
    clearInterval(myInterval)
    remainingTime = null
}

// Reset display to original duration
function resetTimerDisplay(timerDisplay) {
    const originalDuration = timerDisplay.getAttribute("data-duration")
    timerDisplay.textContent = originalDuration
}

session.addEventListener("click", () => {
    hideAll()
    pomodoro.style.display = "block"

    session.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")

    currentTimer = pomodoro
    resetStateOnSwitch()
    resetTimerDisplay(pomodoro)
})

shortBreak.addEventListener("click", () => {
    hideAll()
    short.style.display = "block"

    session.classList.remove("active")
    shortBreak.classList.add("active")
    longBreak.classList.remove("active")

    currentTimer = short
    resetStateOnSwitch()
    resetTimerDisplay(short)
})

longBreak.addEventListener("click", () => {
    hideAll()
    long.style.display = "block"

    session.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.add("active")

    currentTimer = long
    resetStateOnSwitch()
    resetTimerDisplay(long)
})

// Start the timer
function startTimer(timerDisplay) {
    if (myInterval) {
        clearInterval(myInterval)
    }

    let durationInMilliseconds

    if (remainingTime !== null) {
        durationInMilliseconds = remainingTime
    } else {
        let timerDuration = timerDisplay.getAttribute("data-duration").split(":")[0]
        durationInMilliseconds = timerDuration * 60 * 1000
    }

    let endTimestamp = Date.now() + durationInMilliseconds

    myInterval = setInterval(function () {
        const now = Date.now()
        const timeRemaining = endTimestamp - now

        if (timeRemaining <= 0) {
            clearInterval(myInterval)
            remainingTime = null
            timerDisplay.textContent = "00:00"
            const alarm = new Audio(
                "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
            )
            alarm.play()
        } else {
            remainingTime = timeRemaining
            const minutes = Math.floor(timeRemaining / 60000)
            const seconds = Math.floor((timeRemaining % 60000) / 1000)
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`
            timerDisplay.textContent = formattedTime
        }
    }, 1000)
}

// Start Button
startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(currentTimer)
        timerMsg.style.display = "none"
    } else {
        timerMsg.style.display = "block"
    }
})

// Stop Button
stopBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(myInterval)
    }
})

// ✅ Reset Button
resetBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(myInterval)
        remainingTime = null
        resetTimerDisplay(currentTimer)
    }
})

