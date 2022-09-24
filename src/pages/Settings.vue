<script lang="ts" setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { useSettingsStore } from '../plugins/pinia'
import { useRouter } from 'vue-router'

let settingsStore = useSettingsStore()
let router = useRouter()

let startClock = () => {
    router.push("/countdown")
}

</script>

<template>
    <h1 class="text-center">Cài đặt</h1>

    <h5 for="title">Tiêu đề</h5>
    <InputText class="settingDiv" id="title" type="text" v-model="settingsStore.title" />

    <h5 for="times">Thời gian</h5>
    <div class="time-container">
        <div>
            <label for="hours">Giờ: </label>
            <InputNumber inputId="hours" showButtons v-model="settingsStore.inputTime.hours" />
        </div>
        <div>
            <label for="minutes">Phút: </label>
            <InputNumber inputId="minutes" showButtons v-model="settingsStore.inputTime.minutes" />
        </div>
        <div>
            <label for="seconds">Giây: </label>
            <InputNumber inputId="seconds" showButtons v-model="settingsStore.inputTime.seconds"/>
        </div>
    </div>

    <h5 for="nextTitle">Tiếp theo</h5>
    <InputText class="settingDiv" id="nextTitle" type="text" v-model="settingsStore.nextTitle" />

    <br />
    <h5 />
    <div class="start-button-div">
        <Button class="start-button" label="Bắt đầu" @click="startClock()" />
    </div>
    
</template>

<style scoped>
.settingDiv {
    width: 100%;
}

.start-button-div {
    width: 100%;
    display: flex;
    justify-content: center;
}

.text-center {
    text-align: center;
}

.time-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas:
        ". . .";
}
</style>