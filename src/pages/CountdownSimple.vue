<script lang="ts" setup>
import { useSettingsStore, useTimerStore } from '../plugins/pinia';
import Button from 'primevue/button'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import TimerDialog from '../components/TimerDialog.vue';
import Menu from 'primevue/menu';
import { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem';
import { PiniaStringState } from "../utils/enum"
import TextDialog from '../components/TextDialog.vue'

let settingsStore = useSettingsStore()
let timerStore = useTimerStore()

let router = useRouter()

onMounted(() => {
    timerStore.startTimer()
})

let returnToSettings = () => {
    router.back()
}

let displayTimerDialog = ref(false)
let displayTitleDialog = ref(false)
let displaySubtitleDialog = ref(false)

let menuItem: Array<MenuItem> = [
    {
        label: "Quay lại",
        command: (event: MenuItemCommandEvent) => {
            router.back()
            timerStore.stopTimer()
        },
    },
    {
        label: "Dừng/tiếp tục đồng hồ",
        command: (event: MenuItemCommandEvent) => {
            timerStore.pauseOrContinueTimer()
        },
    },
    {
        label: "Đặt lại đồng hồ",
        command: (event: MenuItemCommandEvent) => {
            displayTimerDialog.value = true
        },
    },
    {
        label: "Chỉnh sửa tiêu đề chính",
        command: (event: MenuItemCommandEvent) => {
            displayTitleDialog.value = true
        },
    },
    {
        label: "Chỉnh sửa tiêu đề phụ",
        command: (event: MenuItemCommandEvent) => {
            displaySubtitleDialog.value = true
        },
    },
];

let optionMenu = ref<Menu | null>()
let showOptionMenu = (event: Event) => {
    //event.preventDefault()
    optionMenu.value?.toggle(event)
}

</script>

<template>
    <h1 class="text-center">{{settingsStore.title}}</h1>

    <div class="timer">
        <div>
            <h1 class="timer-text">{{timerStore.displayTimeString}}</h1>
        </div>
    </div>

    <h2 class="text-center">{{settingsStore.subtitle}}</h2>

    <div class="start-button-div">
        <Button class="start-button p-button-link" label="Quay lại" @click="returnToSettings()" />
    </div>

    <Button icon="pi pi-ellipsis-v" class="p-button-rounded options-button" @click="showOptionMenu($event)" />
    <Menu ref="optionMenu" :model="menuItem" :popup="true" />
    <TimerDialog :display="displayTimerDialog" @closeDialog="displayTimerDialog = false" />
    <TextDialog :display="displayTitleDialog" :updateState="PiniaStringState.TITLE"
        @closeDialog="displayTitleDialog = false" />
    <TextDialog :display="displaySubtitleDialog" :updateState="PiniaStringState.SUBTITLE"
        @closeDialog="displaySubtitleDialog = false" />
</template>

<style scoped>
.timer {
    display: flex;
    background-color: #554994;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70vh;
}

.timer-text {
    font-size: 256px;
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

.options-button {
    position: fixed;
    bottom: 16px;
    right: 16px;
}
</style>