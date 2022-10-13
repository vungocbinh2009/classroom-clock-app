import { defineStore } from "pinia";
import { CountdownMode } from "../utils/enum";
import { computed, reactive, ref } from "vue";
import Timer from "easytimer.js";
import { displayTime } from "../utils/timer";

export let useSettingsStore = defineStore("settings", () => {
  let countdownMode = ref(CountdownMode.SIMPLE_COUNTDOWN);
  let title = ref("Làm bài tập");
  let nextTitle = ref("Tiếp theo:");

  let selectedFilePath = ref("");
  return {
    countdownMode,
    title,
    nextTitle,
    selectedFilePath,
  };
});

export let useTimerStore = defineStore("timer", () => {
  let timer = new Timer();
  let inputTime = reactive({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  let totalTimeSeconds = computed(() => {
    return inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds;
  });
  let displayTimeString = ref("");
  let startTimer = () => {
    timer.start({
      countdown: true,
      startValues: { seconds: totalTimeSeconds.value },
    });
    timer.addEventListener("secondsUpdated", function (e) {
      displayTimeString.value = displayTime(
        timer.getTimeValues().hours,
        timer.getTimeValues().minutes,
        timer.getTimeValues().seconds,
        timer.getTotalTimeValues().seconds
      );
    });
  };
  let pauseOrContinueTimer = () => {
    if (timer.isPaused()) {
      timer.start();
    } else {
      timer.pause();
    }
  };
  let stopTimer = () => {
    timer.stop()
  };
  return {
    inputTime,
    totalTimeSeconds,
    displayTimeString,
    startTimer,
    pauseOrContinueTimer,
    stopTimer,
  };
});
