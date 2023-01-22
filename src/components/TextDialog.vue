<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useSettingsStore } from '../plugins/pinia';
import { ref } from 'vue';
import { PiniaStringState } from '../utils/enum';

let props = defineProps<{
    display: boolean
    updateState: PiniaStringState
}>()

let emits = defineEmits<{
    (e: 'closeDialog'): void
}>()

let settingsStore = useSettingsStore()

let inputText = ref(settingsStore.title)

let updateTitle = () => {
    if (props.updateState == PiniaStringState.TITLE) {
        settingsStore.$patch({
            title: inputText.value
        })
    } else if (props.updateState == PiniaStringState.SUBTITLE) {
        settingsStore.$patch({
            subtitle: inputText.value
        })
    }

    emits('closeDialog')
}
</script>

<template>
    <Dialog header="Nhập văn bản" v-model:visible="props.display" :showHeader="true" position="bottom" :closable="false">
        <InputText type="text" v-model="inputText" />

        <template #footer>
            <Button label="Cập nhật" class="p-button-text" @click="updateTitle()" />
        </template>
    </Dialog>


</template>

<style scoped>

</style>
