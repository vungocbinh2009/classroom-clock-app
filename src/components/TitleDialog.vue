<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useSettingsStore } from '../plugins/pinia';
import { ref } from 'vue';

let props = defineProps<{
    display: boolean
}>()

let emits = defineEmits<{
    (e: 'closeDialog'): void
}>()

let settingsStore = useSettingsStore()

let inputTitle = ref("")

let updateTitle = () => {
    settingsStore.$patch({
        title: inputTitle.value
    })
    emits('closeDialog')
}
</script>

<template>
    <Dialog header="Nhập tiêu đề" v-model:visible="props.display" :showHeader="true" position="bottom">
        <InputText type="text" v-model="inputTitle" />

        <template #footer>
            <Button label="Cập nhật" class="p-button-text" @click="updateTitle()" />
        </template>
    </Dialog>


</template>

<style scoped>

</style>
