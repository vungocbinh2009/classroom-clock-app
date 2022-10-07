<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import { useSettingsStore } from '../plugins/pinia';
import random from 'random'
import { ref } from 'vue';

let props = defineProps<{
    display: boolean
}>()

let emits = defineEmits<{
    (e: 'closeDialog'): void
}>()

let settingsStore = useSettingsStore()

let start = ref(1)
let finish = ref(50)
let randomNumber = ref(0)

let getRandomNumber = () => {
    randomNumber.value = random.int(start.value, finish.value)
}

let closeDialog = () => {
    emits('closeDialog')
}
</script>

<template>
    <Dialog header="Chọn số ngẫu nhiên" v-model:visible="props.display" :showHeader="true" position="center">
        <label for="start">Bắt đầu: </label>
        <InputNumber inputId="start" placeholder="Bắt đầu" showButtons v-model="start" />
        <label for="finish"> Kết thúc: </label>
        <InputNumber inputId="finish" placeholder="Kết thúc" showButtons v-model="finish" />

        <h3 class="text-center">Kết quả</h3>
        <h1 class="text-center random-number">{{randomNumber}}</h1>

        <template #footer>
            <Button label="Lấy ngẫu nhiên" class="p-button-text" @click="getRandomNumber()" />
            <Button label="Đóng" class="p-button-text" @click="closeDialog()" />
        </template>
    </Dialog>


</template>

<style scoped>
.text-center {
    text-align: center;
}

.random-number {
    font-size: 70px;
}
</style>