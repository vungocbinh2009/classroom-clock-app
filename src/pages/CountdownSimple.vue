<script lang="ts" setup>
import { useSettingsStore, useTimerStore } from '../plugins/pinia';
import Button from 'primevue/button'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import InputText from 'primevue/inputtext';

let settingsStore = useSettingsStore()
let timerStore = useTimerStore()

let router = useRouter()

onMounted(() => {
    timerStore.startTimer()
})

let returnToSettings = () => {
    router.back()
}

let title = settingsStore.title

let nextTitle = settingsStore.nextTitle

</script>

<template>
    <InputText type="text" class="p-inputtext-lg text-center" v-model="title" />

    <div class="timer">
        <div>
            <h1 class="timer-text">{{timerStore.displayTimeString}}</h1>
        </div>
    </div>

    <InputText type="text" class="p-inputtext-lg text-center" v-model="nextTitle" />

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
    width: 100%;
    font-weight: bold;
}
</style>