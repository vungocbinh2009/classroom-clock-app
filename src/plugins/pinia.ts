import { defineStore } from "pinia";
import { CountdownMode } from "../utils/enum";
import { computed, reactive, ref } from "vue";

export let useSettingsStore = defineStore("settings", () => {
  let countdownMode = ref(CountdownMode.SIMPLE_COUNTDOWN)
  let title = ref("Giờ nghỉ")
  let nextTitle = ref("Tiếp theo: ...")
  let inputTime = reactive({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  let totalTimeSeconds = computed(() => {
    return inputTime.hours*3600 + inputTime.minutes*60 + inputTime.seconds
  })
  let selectedFilePath = ref("")
  return {
    countdownMode,
    title,
    inputTime,
    totalTimeSeconds,
    nextTitle,
    selectedFilePath
  }
});
