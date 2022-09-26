<script lang="ts" setup>
import Timer from 'easytimer.js';
import { useSettingsStore } from '../plugins/pinia';
import { displayTime } from '../utils/timer';
import Editor from 'primevue/editor';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

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

let editorText = ref("")

let returnToSettings = () => {
    router.back()
}

let displayTimeString = ref("")
</script>

<template>
    <div class="container">
        <div class="content">
            <Editor v-model="editorText" editorStyle="height: 320px" />
        </div>
        <div class="title">
            <h1>{{settingsStore.title}}</h1>
        </div>
        <div class="clock">
            <h1>{{displayTimeString}}</h1>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 4fr 1fr;
    grid-template-rows: 80vh 20vh;
    gap: 0px 0px;
    grid-template-areas:
        "content content"
        "title clock";
}

.content {
    grid-area: content;
}

.title {
    grid-area: title;
}

.clock {
    grid-area: clock;
}
</style>