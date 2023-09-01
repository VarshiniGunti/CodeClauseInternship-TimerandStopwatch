$(document).ready(function () {
  const addTrailingZero = (number) => {
    return number < 10 ? "0" + number : number;
  };

  const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let lapButtonEnabled = true;

    hours = hours % 12 || 12;
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#custom-hour").html(hours);
    $("#custom-min").html(minutes);
    $("#custom-sec").html(seconds);
    $("#custom-ampm").html(ampm);
  };

  updateTime();
  setInterval(updateTime, 1000);

  $("#custom-stopwatch-btn").click(function () {
    $(".custom-clock").slideUp();
    $(".custom-stopwatch").slideDown();
  });

  $("#custom-timer-btn").click(function () {
    $(".custom-clock").slideUp();
    $(".custom-timer").slideDown();
  });

  $(".back-btn").click(function () {
    $(".custom-timer, .custom-stopwatch").slideUp();
    $(".custom-clock").slideDown();
  });

  let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliSeconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

  function stopwatch() {
    stopwatchMiliSeconds++;
    if (stopwatchMiliSeconds === 100) {
      stopwatchMiliSeconds = 0;
      stopwatchSeconds++;
    }
    if (stopwatchSeconds === 60) {
      stopwatchSeconds = 0;
      stopwatchMinutes++;
    }
    if (stopwatchMinutes === 60) {
      stopwatchMinutes = 0;
      stopwatchHours++;
    }
    $(".custom-number#custom-stopwatch-hour").html(
      addTrailingZero(stopwatchHours)
    );
    $(".custom-number#custom-stopwatch-min").html(
      addTrailingZero(stopwatchMinutes)
    );
    $(".custom-number#custom-stopwatch-sec").html(
      addTrailingZero(stopwatchSeconds)
    );
    $(".custom-number#custom-stopwatch-ms").html(
      addTrailingZero(stopwatchMiliSeconds)
    );
  }

  function startStopwatch() {
    if (!stopwatchRunning) {
      stopwatchInterval = setInterval(stopwatch, 10);
      stopwatchRunning = true;
    }
  }

  function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
  }

  function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliSeconds = 0;
    laps = 0;
    $(".custom-number#stopwatch-hour").html("00");
    $(".custom-number#stopwatch-min").html("00");
    $(".custom-number#stopwatch-sec").html("00");
    $(".custom-number#stopwatch-ms").html("00");
  }

  $(".start-stopwatch").click(function () {
    startStopwatch();
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
  });

  $(".lap-stopwatch").click(function () {
    lapButtonEnabled = false;
    laps++;
    console.log(laps);
    console.log("hrs", stopwatchHours);
    console.log("sec", stopwatchSeconds);

    $("#varshini").prepend(
      `<div class="lap active">
          <p>Lap ${laps}</p>
          <p>
            ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(
        stopwatchMinutes
      )} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
        stopwatchMiliSeconds
      )}
          </p>
        </div>`
    );
    setTimeout(function () {
      lapButtonEnabled = true;
    }, 1000);
  });


  $(".reset-stopwatch").click(function () {
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
    $(".custom-laps").html("");
  });

  let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerRunning = false,
    timerInterval;

  function getTime() {
    time = prompt("Enter time in minutes");
    time = time * 60;
    setTime();
  }
  function setTime() {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);
    timerMiliseconds = 0;
    $(".custom-number#custom-timer-hour").html(addTrailingZero(timerHours));
    $(".custom-number#custom-timer-min").html(addTrailingZero(timerMinutes));
    $(".custom-number#custom-timer-sec").html(addTrailingZero(timerSeconds));
    $(".custom-number#custom-timer-ms").html(addTrailingZero(timerMiliseconds));

    timer();
    timerRunning = true;
    $(".start-timer").hide();
    $(".stop-timer").show();
  }
  

  function timer() {
    timerMiliseconds--;
    if (timerMiliseconds === -1) {
      timerMiliseconds = 99;
      timerSeconds--;
    }
    if (timerSeconds === -1) {
      timerSeconds = 59;
      timerMinutes--;
    }
    if (timerMinutes === -1) {
      timerMinutes = 59;
      timerHours--;
    }

    $(".custom-number#custom-timer-hour").html(addTrailingZero(timerHours));
    $(".custom-number#custom-timer-min").html(addTrailingZero(timerMinutes));
    $(".custom-number#custom-timer-sec").html(addTrailingZero(timerSeconds));
    $(".custom-number#custom-timer-ms").html(addTrailingZero(timerMiliseconds));

    timeUp();
  }

  function startTimer() {
    if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
      getTime();
    }
    timerInterval = setInterval(timer, 10);
    timerRunning = true;
    $(".start-timer").hide();
    $(".stop-timer").show();
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    $(".start-timer").show();
    $(".stop-timer").hide();
  }
  function resetTimer() {
    stopTimer();
    time = 0;
    timerHours = 0;
    timerMinutes = 0;
    timerSeconds = 0;
    timerMiliseconds = 0;
    timerRunning = false;
    $(".custom-number#custom-timer-hour").html(addTrailingZero(0));
    $(".custom-number#custom-timer-min").html(addTrailingZero(0));
    $(".custom-number#custom-timer-sec").html(addTrailingZero(0));
    $(".custom-number#custom-timer-ms").html(addTrailingZero(0));
  }

  function timeUp() {
    if (
      timerHours === 0 &&
      timerMinutes === 0 &&
      timerSeconds === 0 &&
      timerMiliseconds === 0
    ) {
      stopTimer();
      alert("Time's up!");

      setTime();
    }
  }

  $(".start-timer").click(startTimer);

  $(".stop-timer").click(stopTimer);

  $(".reset-timer").click(function () {
    resetTimer();
    if (!timerRunning) {
      $(".start-timer").show();
      $(".stop-timer").hide();
    }
  });
});
