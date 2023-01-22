<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Chips from 'primevue/chips';
import Chip from 'primevue/chip';
import BlockUI from 'primevue/blockui';
import { useSettingsStore } from '../plugins/pinia';
import random from 'random'
import { ref, reactive, toRef } from 'vue';

let props = defineProps<{
    display: boolean
}>()

let emits = defineEmits<{
    (e: 'closeDialog'): void
}>()

let settingsStore = useSettingsStore()

let start = ref(1)
let finish = ref(50)
let numberOfItem = ref(1)
let randomNumber = reactive({
    arr: [1]
})

let getRandomNumber = () => {
    let result = new Set<number>([])
    while(result.size < numberOfItem.value) {
        result.add(random.int(start.value, finish.value))
    }
    randomNumber.arr = Array.from(result.values())
}

let closeDialog = () => {
    emits('closeDialog')
}
</script>

<template>
    <Dialog class="p-fluid" header="Chọn số ngẫu nhiên" v-model:visible="props.display" :showHeader="true" position="center" :closable="false">
        <label for="start">Bắt đầu từ: </label>
        <InputNumber inputId="start" placeholder="Bắt đầu" showButtons v-model="start" />
        <br/>
        <label for="finish"> Đến: </label>
        <InputNumber inputId="finish" placeholder="Kết thúc" showButtons v-model="finish" />
        <br/>
        <label for="numItem"> Số con số được chọn : </label>
        <InputNumber inputId="numItem" placeholder="Kết thúc" showButtons v-model="numberOfItem" />

        <h3 class="text-center">Kết quả</h3>
        <div class="text-center">
            <Chip v-for="item in randomNumber.arr" :label="item.toString()" class="custom-chip"/>
        </div>
        
        
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

.p-chip.custom-chip {
    background: var(--primary-color);
    color: var(--primary-color-text);
}

</style>