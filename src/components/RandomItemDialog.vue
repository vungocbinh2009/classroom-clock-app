<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Chips from 'primevue/chips';
import Chip from 'primevue/chip';
import InputNumber from 'primevue/inputnumber';
import { useSettingsStore } from '../plugins/pinia';
import random from 'random'
import { ref, reactive } from 'vue';

let props = defineProps<{
    display: boolean
}>()

let emits = defineEmits<{
    (e: 'closeDialog'): void
}>()

let settingsStore = useSettingsStore()

let data = reactive({
    itemChoice: ["item1", "item2"],
    itemSelected: ["item"]
})
let numberOfItem = ref(1)

let getRandomNumber = () => {
    let result = new Set<string>([])
    while(result.size < numberOfItem.value) {
        result.add(random.choice(data.itemChoice)!!)
    }
    data.itemSelected = Array.from(result.values())
}

let closeDialog = () => {
    emits('closeDialog')
}
</script>

<template>
    <Dialog class="p-fluid" header="Chọn số ngẫu nhiên" v-model:visible="props.display" :showHeader="true" position="center" :closable="false">
        <label for="start">Nhập các item (cách nhau bởi dấu phẩy): </label>
        <Chips v-model="data.itemChoice" separator="," />
        <br/>
        <label for="numItem"> Số con số được chọn : </label>
        <InputNumber inputId="numItem" placeholder="Kết thúc" showButtons v-model="numberOfItem" />

        <h3 class="text-center">Kết quả</h3>
        <div class="text-center">
            <Chip v-for="item in data.itemSelected" :label="item" class="custom-chip" />
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