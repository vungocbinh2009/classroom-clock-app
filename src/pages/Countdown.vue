<script lang="ts" setup>
import { useSettingsStore } from '../plugins/pinia';
import Button from 'primevue/button'
import { useRouter } from 'vue-router';
import Timer from "easytimer.js";
import { onMounted, ref } from 'vue';

let settingsStore = useSettingsStore()

let router = useRouter()

let timer = new Timer();

onMounted(() => {
    timer.start(
        {
            countdown: true,
            startValues: { seconds: settingsStore.totalTimeSeconds },
        }
    );
    displayTimeString.value = displayTime(
        timer.getTimeValues().hours,
        timer.getTimeValues().minutes,
        timer.getTimeValues().seconds,
        timer.getTotalTimeValues().seconds
    )
    timer.addEventListener("secondsUpdated", function (e) {
        displayTimeString.value = displayTime(
            timer.getTimeValues().hours,
            timer.getTimeValues().minutes,
            timer.getTimeValues().seconds,
            timer.getTotalTimeValues().seconds
        )
    });
})

let returnToSettings = () => {
    router.back()
}

let formatNumber = (number: number): string => {
    return number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}

let displayTime = (hours: number, minutes: number, seconds: number, totalSeconds: number): string => {
    let result = ""
    if (totalSeconds >= 3600) {
        result = `${hours}:${formatNumber(minutes)}:${formatNumber(seconds)}`
    } else if (totalSeconds >= 60) {
        result = `${formatNumber(minutes)}:${formatNumber(seconds)}`
    } else {
        result = `${formatNumber(seconds)}`
    }
    return result
}

let displayTimeString = ref("")

</script>

<template>
    <h1 class="text-center">{{settingsStore.title}}</h1>

    <div class="timer">
        <div>
            <h1 class="timer-text">{{displayTimeString}}</h1>
        </div>
    </div>

    <h2 class="text-center">{{settingsStore.nextTitle}}</h2>

    <div class="start-button-div">
        <Button class="start-button p-button-link" label="Quay lại" @click="returnToSettings()" />
    </div>
</template>

<style scoped>
.timer {
    display: flex;
    background-color: orangered;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70vh;
}

.timer-text {
    font-size: 200px;
    color: white;
}

.start-button-div {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 10px;
}

.text-center {
    text-align: center;
}
</style>