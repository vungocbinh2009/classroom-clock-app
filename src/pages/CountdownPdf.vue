<script lang="ts" setup>
import { useSettingsStore, useTimerStore } from '../plugins/pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PdfViewer from '../components/PdfViewer.vue'
import Menu from 'primevue/menu';
import { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem';
import TimerDialog from '../components/TimerDialog.vue';
import TextDialog from '../components/TextDialog.vue'
import RandomNumberDialog from '../components/RandomNumberDialog.vue'
import RandomItemDialog from '../components/RandomItemDialog.vue'
import Message from 'primevue/message';
import Button from 'primevue/button';
import {PiniaStringState} from "../utils/enum"


let settingsStore = useSettingsStore()
let timerStore = useTimerStore()

let router = useRouter()

onMounted(() => {
    timerStore.startTimer()
})

let displayTimerDialog = ref(false)
let displayTitleDialog = ref(false)
let displayRandomNumberDialog = ref(false)
let displayRandomItemDialog = ref(false)
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
        label: "Chọn ngẫu nhiên từ danh sách",
        command: (event: MenuItemCommandEvent) => {
            displayRandomItemDialog.value = true
        },
    },
    {
        label: "Hiển thị đồng hồ",
        command: (event: MenuItemCommandEvent) => {
            showMessage.value = true
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
    <div class="container">
        <div class="pdf-viewer" >
            <PdfViewer/>
        </div>
        <Button icon="pi pi-ellipsis-v" class="p-button-rounded options-button" @click="showOptionMenu($event)"/>
        <Menu ref="optionMenu" :model="menuItem" :popup="true"/>
        <TimerDialog :display="displayTimerDialog" @closeDialog="displayTimerDialog = false"/>
        <TextDialog :display="displayTitleDialog" :updateState="PiniaStringState.TITLE" @closeDialog="displayTitleDialog = false" />
        <RandomNumberDialog :display="displayRandomNumberDialog" @closeDialog="displayRandomNumberDialog = false" />
        <RandomItemDialog :display="displayRandomItemDialog" @closeDialog="displayRandomItemDialog = false" />
        <Message class="message" v-show="showMessage" @close="showMessage = false" icon="null">
            <h1 class="message-text">{{timerStore.displayTimeString}} - {{settingsStore.title}}</h1>
        </Message>
    </div>
</template>

<style scoped>
.pdf-viewer {
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
}

.message {
    position: fixed;
    top: 25px;
    right: 25px;
}

.message-text {
    margin: 0px;
}

.options-button {
    position: fixed;
    bottom: 16px;
    right: 16px;
}
</style>