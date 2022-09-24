import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export let useSettingsStore = defineStore("settings", () => {
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
    return {title, inputTime, totalTimeSeconds, nextTitle}
});
