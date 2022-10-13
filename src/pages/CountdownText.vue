<script lang="ts" setup>
import { useSettingsStore, useTimerStore } from '../plugins/pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ContextMenu from 'primevue/contextmenu';
import { MenuItem, MenuItemCommandEvent } from "primevue/menuitem";
import Tiptap from '../components/Tiptap.vue'
import TimerDialog from '../components/TimerDialog.vue';
import TitleDialog from '../components/TitleDialog.vue'
import RandomNumberDialog from '../components/RandomNumberDialog.vue'
import Message from 'primevue/message';


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

let contextMenuItem: Array<MenuItem> = [
    {
        label: "Quay lại",
        command: (event: MenuItemCommandEvent) => { 
            router.back()
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

let contextMenu: any = ref()

let showContextMenu = (event: Event) => {
    contextMenu.value.show(event)
}

</script>

<template>
    <div>
        <tiptap class="text-editor" @contextmenu="showContextMenu"/>
        <ContextMenu :global="true" ref="contextMenu" :model="contextMenuItem" />
        <TimerDialog :display="displayTimerDialog" @closeDialog="displayTimerDialog = false" />
        <TitleDialog :display="displayTitleDialog" @closeDialog="displayTitleDialog = false" />
        <RandomNumberDialog :display="displayRandomNumberDialog" @closeDialog="displayRandomNumberDialog = false" />
        <Message class="message" v-show="showMessage" @close="showMessage = false">
            <h1 class="message-text">{{timerStore.displayTimeString}} - {{settingsStore.title}}</h1>
        </Message>
    </div>
</template>

<style scoped>
.text-editor {
    width: 100%;
    height: 90vh;
}

.message {
    position: fixed;
    top: 0px;
    right: 25px;
}

.message-text {
    margin: 0px;
}
</style>