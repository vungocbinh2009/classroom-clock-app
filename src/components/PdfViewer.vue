<template>
    <div>
        <iframe height="100%" width=100% :src="`${getFilePath}`"></iframe>
    </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';

let props = defineProps<{
    fileName: string,
    path: string
}>()

let getFilePath = computed(() => {
    if (props.fileName !== '') {
        return props.path + '?file=' + props.fileName
    }
    return props.path
})
</script>
<style scoped>
div {
    width: 100%;
    height: 79vh;
    min-width: 400px;
}
</style>
