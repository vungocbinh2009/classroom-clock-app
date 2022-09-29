<script lang="ts" setup>
import Timer from 'easytimer.js';
import { useSettingsStore } from '../plugins/pinia';
import { displayTime } from '../utils/timer';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PdfViewer from '../components/PdfViewer.vue'
import ContextMenu from 'primevue/contextmenu';
import { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem';


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

let returnToSettings = () => {
    router.back()
}

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
];

let contextMenu: any = ref()

let showContextMenu = (event: Event) => {
    contextMenu.value.show(event)
}

let displayTimeString = ref("")

let path = 'web/viewer.html'
let fileName = settingsStore.selectedFilePath
</script>

<template>
    <div class="container">
        <div class="content">
            <PdfViewer :path="path" :fileName="fileName" />
        </div>
        <div class="title" @contextmenu="showContextMenu">
            <div>
                <h1>{{settingsStore.title}}</h1>
            </div>
        </div>
        <div class="clock" @contextmenu="showContextMenu">
            <div>
                <h1 class="timer-text">{{displayTimeString}}</h1>
            </div>
        </div>
        <ContextMenu ref="contextMenu" :model="contextMenuItem" />
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 4fr 1fr;
    grid-template-rows: 77vh 19vh;
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
    display: flex;
    align-items: center;
    padding: 20px;
}

.clock {
    grid-area: clock;
    display: flex;
    background-color: orangered;
    align-items: center;
    justify-content: center;
}

.timer-text {
    font-size: 80px;
    color: white;
}
</style>