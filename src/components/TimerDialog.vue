<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import {useTimerStore } from '../plugins/pinia';
import { ref } from 'vue';

let props = defineProps<{
    display: boolean
}>()

let emits = defineEmits<{
    (e: 'closeDialog'): void
}>()

let timerStore = useTimerStore()

let inputHours = ref(0)
let inputMinutes = ref(0)
let inputSeconds = ref(0)

let updateTime = () => {
    timerStore.$patch({
        inputTime: {
            hours: inputHours.value,
            minutes: inputMinutes.value,
            seconds: inputSeconds.value
        }
    })
    timerStore.stopTimer()
    timerStore.startTimer()
    emits('closeDialog')
}
</script>

<template>
    <Dialog header="Nhập thời gian" v-model:visible="props.display" :showHeader="true" position="bottom" :closable="false">
        <InputNumber inputId="hours" placeholder="Hours" showButtons v-model="inputHours" />
        <InputNumber inputId="minutes" placeholder="Minutes" showButtons v-model="inputMinutes" />
        <InputNumber inputId="seconds" placeholder="Seconds" showButtons v-model="inputSeconds" />

        <template #footer>
            <Button label="Cập nhật" class="p-button-text" @click="updateTime()" />
        </template>
    </Dialog>


</template>

<style scoped>

</style>
