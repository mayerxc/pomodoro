var myTimer
var min, sec;
var initMin, initSec, initBreakMin, initBreakSec;
var breakMin, breakSec;
var breakMinStr, breakSecStr
var isPaused = true;
var pomo = "work";
var alarm = new Audio('https://res.cloudinary.com/mayerxc/video/upload/v1473729116/Cuckoo-clock-sound_of6pmy.mp3');
min = 25;
sec = 0;
breakMin = 5;
breakSec = 0;
initMin = 1;
initBreakMin = 2;



function loadPage() {

    $(".timer").append(("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2));
    $(".break").append(("0" + breakMin).slice(-2) + ":" + ("0" + breakSec).slice(-2));
    
}

function timer() {

    myTimer = setInterval(runTimer, 1000)
}

function runTimer() {
    if (pomo === "work" && !isPaused) {
        $(".type").html("Work Time left")
        $(".playPause").html("<span class='glyphicon glyphicon-pause'></span>")
    } else if (pomo === "break" && !isPaused) {
        $(".type").html("Break time left")
        $(".playPause").html("<span class='glyphicon glyphicon-pause'></span>")
    } else if (isPaused) {
        $(".playPause").html("<span class='glyphicon glyphicon-play'></span>");
        //
    }


    if (!isPaused) {
        if (pomo === "work") {
            if (sec === 0) {
                if (min === 0) {
                    alarm.play();
                    pomo = "break"
                    sec = 1

                } else {
                    min -= 1;
                    sec = 59;
                }
            }

            $(".clock").html(("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2));
            sec -= 1;
            if (pomo === "break") {
                min = initMin;
                sec = 0; // setting seconds again so it doesn't go negative
            }
        } else { //if (pomo === "break") {
            if (breakSec === 0) {
                if (breakMin === 0) {
                    alarm.play();
                    pomo = "work"
                } else {
                    breakMin -= 1;
                    breakSec = 59;
                }
            }

            $(".clock").html(("0" + breakMin).slice(-2) + ":" + ("0" + breakSec).slice(-2));
            breakSec -= 1;
            if (pomo === "work") {
                breakMin = initBreakMin;
                breakSec = 0; //setting the seconds back to 0 so it doesn't go negative
            }
        }
    }
}

function addToTimer() {
    if (isPaused) {
        min += 1;
        initMin = min;
        sec = 0;
        if (pomo === "work") {
            $(".clock").html(("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2));
        }
        $(".timer").html(("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2));
    }
}

function minusTimer() {
    if (isPaused) {
        min -= 1;
        if (min <= 0) {
            min = 1;
        }
        initMin = min;
        sec = 0;
        if (pomo === "work") {
            $(".clock").html(("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2));
        }
        $(".timer").html(("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2));
    }
}

function addToBreakTimer() {
    if (isPaused) {
        breakMin += 1;
        initBreakMin = breakMin
        breakSec = 0
        if (pomo === "break") {
            $(".clock").html(("0" + breakMin).slice(-2) + ":" + ("0" + breakSec).slice(-2));
        }
        $(".break").html(("0" + breakMin).slice(-2) + ":" + ("0" + breakSec).slice(-2));
    }
}

function minusBreakTimer() {
    if (isPaused) {
        breakMin -= 1;
        if (breakMin <= 0) {
            breakMin = 1;
        }
        breakSec = 0;
        initBreakMin = breakMin
        if (pomo === "break") {
            $(".clock").html(("0" + breakMin).slice(-2) + ":" + ("0" + breakSec).slice(-2));
        }
        $(".break").html(("0" + breakMin).slice(-2) + ":" + ("0" + breakSec).slice(-2));
    }
}


$(document).ready(function () {
    //enter functions here

    $(".clock").html( ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2) );
    loadPage();

    $(".pomodoro").click(function () {

        if (isPaused) {
            isPaused = false;
        } else {
            isPaused = true;

        }

        //clearInterval(myTimer) so it doesn't count down too fast everytime I click the div
        clearInterval(myTimer);
        timer();
    });

    $(".plus").click(function (e) {
        e.preventDefault;
        addToTimer();
    });

    $(".minus").click(function (e) {
        e.preventDefault;
        minusTimer();
    });

    $(".break-plus").click(function (e) {
        e.preventDefault;
        addToBreakTimer();
    });

    $(".break-minus").click(function (e) {
        e.preventDefault;
        minusBreakTimer();
    });



});