<script lang="ts" setup>
import { Timer} from 'easytimer.js';
import { useSettingsStore } from '../plugins/pinia';
import { displayTime } from '../utils/timer';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ContextMenu from 'primevue/contextmenu';
import { MenuItem, MenuItemCommandEvent } from "primevue/menuitem";
import Tiptap from '../components/Tiptap.vue'
import TimerDialog from '../components/TimerDialog.vue';
import TitleDialog from '../components/TitleDialog.vue'
import RandomNumberDialog from '../components/RandomNumberDialog.vue'


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
let displayTitleDialog = ref(false)
let displayRandomNumberDialog = ref(false)

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
];

let contextMenu: any = ref()

let showContextMenu = (event: Event) => {
    contextMenu.value.show(event)
}

let title = settingsStore.title

let displayTimeString = ref("")

</script>

<template>
    <div class="container">
        <tiptap class="content" />
        <div class="title-input" @contextmenu="showContextMenu">
            <h1>{{title}}</h1>
        </div>
        <div class="clock" @contextmenu="showContextMenu">
            <div>
                <h1 class="timer-text">{{displayTimeString}}</h1>
            </div>
        </div>
        <ContextMenu ref="contextMenu" :model="contextMenuItem" />
        <TimerDialog :display="displayTimerDialog" @closeDialog="displayTimerDialog = false" />
        <TitleDialog :display="displayTitleDialog" @closeDialog="displayTitleDialog = false" />
        <RandomNumberDialog :display="displayRandomNumberDialog" @closeDialog="displayRandomNumberDialog = false" />
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
    overflow-y: hidden;
}

.content {
    grid-area: content;
    height: 90vh
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
    background-color: #f57328;
    align-items: center;
    justify-content: center;
}

.title-input {
    width: 100%;
    height: 100%;
    font-weight: bold;
    background-color: #FFE9A0;
}

.timer-text {
    width: 100%;
    font-size: 80px;
    color: white;
}
</style>