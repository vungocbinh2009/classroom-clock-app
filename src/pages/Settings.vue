<script lang="ts" setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import { useSettingsStore } from '../plugins/pinia'
import { useRouter } from 'vue-router'
import { CountdownMode } from '../utils/enum'
import { onMounted } from 'vue'

let settingsStore = useSettingsStore()
let router = useRouter()

let startClock = () => {
    let pushRecord: Record<CountdownMode, string> = {
        [CountdownMode.SIMPLE_COUNTDOWN]: "/countdown",
        [CountdownMode.COUNTDOWN_WITH_PDF]: "/countdown-pdf",
        [CountdownMode.COUNTDOWN_WITH_TEXT]: "/countdown-text",
        [CountdownMode.COUNTDOWN_WITH_IMAGE]: "/countdown-image",
    }
    router.push(pushRecord[settingsStore.countdownMode])
}

let countDownSelection = [
    { name: "Countdown", code: CountdownMode.SIMPLE_COUNTDOWN },
    { name: "Countdown + PDF", code: CountdownMode.COUNTDOWN_WITH_PDF },
    { name: "Countdown + Text", code: CountdownMode.COUNTDOWN_WITH_TEXT },
    { name: "Countdown + Image", code: CountdownMode.COUNTDOWN_WITH_IMAGE }
]

let selectFile = () => {
    window.electron.selectFile()
}

onMounted(() => {
    window.electron.selectFileComplete((filePath: string) => {
        settingsStore.selectedFilePath = filePath
    })
})

</script>

<template>
    <h1 class="text-center">Cài đặt</h1>

    <h5>Chọn chế độ hiển thị</h5>
    <Dropdown v-model="settingsStore.countdownMode" :options="countDownSelection" optionLabel="name" optionValue="code"
        placeholder="Chọn chế độ" />

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
            <InputNumber inputId="seconds" showButtons v-model="settingsStore.inputTime.seconds" />
        </div>
    </div>

    <h5 v-if="settingsStore.countdownMode == CountdownMode.SIMPLE_COUNTDOWN" for="nextTitle">
        Tiếp theo
    </h5>
    <InputText v-if="settingsStore.countdownMode == CountdownMode.SIMPLE_COUNTDOWN" class="settingDiv" id="nextTitle"
        type="text" v-model="settingsStore.nextTitle" />

    <h5 v-if="settingsStore.countdownMode != CountdownMode.SIMPLE_COUNTDOWN">
        Tập tin cần hiển thị
    </h5>
    <Button v-if="settingsStore.countdownMode != CountdownMode.SIMPLE_COUNTDOWN" class="start-button" label="Chọn tập tin" @click="selectFile()" />
    <p v-if="settingsStore.countdownMode != CountdownMode.SIMPLE_COUNTDOWN">Đường dẫn: {{settingsStore.selectedFilePath}}</p>

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