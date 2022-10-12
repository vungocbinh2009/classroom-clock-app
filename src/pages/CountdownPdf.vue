<script lang="ts" setup>
import Timer from 'easytimer.js';
import { useSettingsStore } from '../plugins/pinia';
import { displayTime } from '../utils/timer';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import PdfViewer from '../components/PdfViewer.vue'
import ModernPdfViewer from '../components/ModernPdfViewer.vue'
import ContextMenu from 'primevue/contextmenu';
import { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem';
import TimerDialog from '../components/TimerDialog.vue';
import TitleDialog from '../components/TitleDialog.vue'
import RandomNumberDialog from '../components/RandomNumberDialog.vue'
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Message from 'primevue/message';


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

watch(() => settingsStore.totalTimeSeconds, (newTime: number) => {
    timer.stop()
    timer.start(
        {
            countdown: true,
            startValues: { seconds: newTime },
        }
    );
})

let displayTimerDialog = ref(false)
let displayTitleDialog = ref(false)
let displayRandomNumberDialog = ref(false)
let displayTimeString = ref("")
let toast = useToast();

let showClockAndTitle = () => {
    toast.add({ severity: 'info', group: 'tr', styleClass: "toast-box" });
}

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
            if (timer.isPaused()) {
                timer.start()
            } else {
                timer.pause()
            }
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
            showClockAndTitle()
        },
    },
];

let contextMenu: any = ref()
let showContextMenu = (event: Event) => {
    event.preventDefault()
    contextMenu.value.show(event)
}

// Giữ lại để sử dụng pdfViewer mặc định của pdfjs
let path = 'web/viewer.html'
let fileName = settingsStore.selectedFilePath
</script>

<template>
    <div >
        <div @contextmenu="showContextMenu" class="pdf-viewer" >
            <PdfViewer :path="path" :fileName="fileName"/>
            <!-- <ModernPdfViewer/> -->
        </div>
        <ContextMenu :global="true" ref="contextMenu" :model="contextMenuItem" />
        <TimerDialog :display="displayTimerDialog" @closeDialog="displayTimerDialog = false"/>
        <TitleDialog :display="displayTitleDialog" @closeDialog="displayTitleDialog = false" />
        <RandomNumberDialog :display="displayRandomNumberDialog" @closeDialog="displayRandomNumberDialog = false" />
        <Toast position="top-right" group="tr">
            <template class="toast-box" #message="slotProps">
                <div class="toast-message text-center toast-box" >
                    <h1>{{displayTimeString}}</h1>
                    <h3>{{settingsStore.title}}</h3>
                </div>
            </template>
        </Toast>
        <Message class="message" severity="info">{{displayTimeString}} - {{settingsStore.title}}</Message>
    </div>
</template>

<style scoped>
.pdf-viewer {
    width: 100%;
    height: 96vh;
}

.toast-message {
    width: 100%;
    text-align: center;
    font-size: 25px;
}

.toast-box {
    margin: 0px;
    padding: 0px;
}

.message {
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
}
</style>