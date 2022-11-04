<script lang="ts" setup>
import { useSettingsStore, useTimerStore } from '../plugins/pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { MenuItem, MenuItemCommandEvent } from "primevue/menuitem";
import Tiptap from '../components/Tiptap.vue'
import TimerDialog from '../components/TimerDialog.vue';
import TextDialog from '../components/TextDialog.vue'
import RandomNumberDialog from '../components/RandomNumberDialog.vue'
import Message from 'primevue/message';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import { PiniaStringState } from "../utils/enum"

let settingsStore = useSettingsStore()
let timerStore = useTimerStore()

let router = useRouter()

onMounted(() => {
    timerStore.startTimer()
})

let displayTimerDialog = ref(false)
let displayTitleDialog = ref(false)
let displayRandomNumberDialog = ref(false)
let showMessage = ref(false)

let menuItem: Array<MenuItem> = [
    {
        label: "Quay lại",
        command: (event: MenuItemCommandEvent) => { 
            router.back()
            timerStore.stopTimer()
        },
    },
    {
        label: "Chỉnh sửa tiêu đề",
        command: (event: MenuItemCommandEvent) => {
            displayTitleDialog.value = true
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
        label: "Chọn số ngẫu nhiên",
        command: (event: MenuItemCommandEvent) => {
            displayRandomNumberDialog.value = true
        },
    },
    {
        label: "Hiển thị đồng hồ",
        command: (event: MenuItemCommandEvent) => {
            showMessage.value = true
        },
    },
];

let optionMenu: any = ref()

let showOptionMenu = (event: Event) => {
    optionMenu.value.toggle(event)
}

</script>

<template>
    <div>
        <tiptap class="text-editor"/>
        <Button icon="pi pi-ellipsis-v" class="p-button-rounded options-button" @click="showOptionMenu($event)" />
        <Menu ref="optionMenu" :model="menuItem" :popup="true" />
        <TimerDialog :display="displayTimerDialog" @closeDialog="displayTimerDialog = false" />
        <TextDialog :display="displayTitleDialog" :updateState="PiniaStringState.TITLE" @closeDialog="displayTitleDialog = false" />
        <RandomNumberDialog :display="displayRandomNumberDialog" @closeDialog="displayRandomNumberDialog = false" />
        <Message class="message" v-show="showMessage" @close="showMessage = false" icon="null">
            <h1 class="message-text">{{timerStore.displayTimeString}} - {{settingsStore.title}}</h1>
        </Message>
    </div>
</template>

<style scoped>
.text-editor {
    width: 100%;
    height: 92vh;
    padding: 10px;
}

.message {
    position: fixed;
    top: 0px;
    right: 25px;
}

.message-text {
    margin: 0px;
}

.options-button {
    position: fixed;
    bottom: 15px;
    right: 15px;
}
</style>