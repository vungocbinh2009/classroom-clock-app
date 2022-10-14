<template>
    <div>
        <iframe height="100%" width=100% :src="`${getFilePath}`"></iframe>
    </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';

let path = 'pdfjs/web/viewer.html'

let fileName = ""

let getFilePath = computed(() => {
    if (fileName !== '') {
        return path + '?file=' + fileName
    }
    return path
})
</script>
<style scoped>
div {
    width: 100%;
    height: 100%;
    min-width: 400px;
}
</style>
