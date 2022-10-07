<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import { useSettingsStore } from '../plugins/pinia';
import { ref } from 'vue';

let props = defineProps<{
    display: boolean
}>()

let emits = defineEmits<{
    (e: 'closeDialog'): void
}>()

let settingsStore = useSettingsStore()

let inputHours = ref(0)
let inputMinutes = ref(0)
let inputSeconds = ref(0)

let updateTime = () => {
    settingsStore.$patch({
        inputTime: {
            hours: inputHours.value,
            minutes: inputMinutes.value,
            seconds: inputSeconds.value
        }
    })
    emits('closeDialog')
}
</script>

<template>
    <Dialog header="Nhập thời gian" v-model:visible="props.display" :showHeader="true" position="bottom">
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
