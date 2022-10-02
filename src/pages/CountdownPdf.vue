<script lang="ts" setup>
import Timer from 'easytimer.js';
import { useSettingsStore } from '../plugins/pinia';
import { displayTime } from '../utils/timer';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import PdfViewer from '../components/PdfViewer.vue'
import ContextMenu from 'primevue/contextmenu';
import { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem';
import InputText from 'primevue/inputtext';
import TimerDialog from '../components/TimerDialog.vue';


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

settingsStore.$subscribe((mutation, state) => {
    timer.stop()
    timer.start(
        {
            countdown: true,
            startValues: { seconds: settingsStore.totalTimeSeconds },
        }
    );
})

let displayTimerDialog = ref(false)

let contextMenuItem: Array<MenuItem> = [
    {
        label: "Quay lại",
        command: (event: MenuItemCommandEvent) => {
            router.back()
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
];

let contextMenu: any = ref()

let showContextMenu = (event: Event) => {
    contextMenu.value.show(event)
}

let displayTimeString = ref("")

let path = 'web/viewer.html'
let fileName = settingsStore.selectedFilePath

let title = settingsStore.title
</script>

<template>
    <div class="container">
        <div class="content" >
            <PdfViewer class="pdf-viewer" :path="path" :fileName="fileName" />
        </div>
        <div class="title" @contextmenu="showContextMenu">
            <InputText type="text" class="p-inputtext-lg title-input" v-model="title" />
        </div>
        <div class="clock" @contextmenu="showContextMenu">
            <div>
                <h1 class="timer-text">{{displayTimeString}}</h1>
            </div>
        </div>
        <ContextMenu ref="contextMenu" :model="contextMenuItem" />
        <TimerDialog :display="displayTimerDialog" @closeDialog="displayTimerDialog = false"/>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 4fr 1fr;
    grid-template-rows: 86vh 10vh;
    gap: 0px 0px;
    grid-template-areas:
        "content content"
        "title clock";
}

.content {
    grid-area: content;
    width: 100%;
    height: 100%
}

.title {
    grid-area: title;
    display: flex;
    align-items: center;
}

.clock {
    grid-area: clock;
    display: flex;
    background-color: #f57328;
    align-items: center;
    justify-content: center;
}

.timer-text {
    font-size: 80px;
    color: white;
}

.pdf-viewer {
    width: 100%;
    height: 100%;
}

.title-input {
    width: 100%;
    height: 100%;
    font-weight: bold;
    background-color: #FFE9A0;
}
</style>