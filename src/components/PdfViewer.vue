<template>
    <div>
        <iframe height="100%" width=100% :src="`${getFilePath}`"></iframe>
    </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';

let emits = defineEmits<{
    (e: "contextmenu", event: Event): void
}>()

let path = 'pdfjs/web/viewer.html'

let fileName = ""

let getFilePath = computed(() => {
    if (fileName !== '') {
        return path + '?file=' + fileName
    }
    return path
})
/**
 * Lưu ý về vị trí thay đổi màu trên giao diện pdfjs
 * - Màu sắc thanh toolbar: Tìm dòng --toolbar-bg-color:
 * - Màu nền của khung hiển thị pdf: --body-bg-color:
 * - Màu thanh toolbar của sidebar: --sidebar-toolbar-bg-color:
 */
</script>
<style scoped>
div {
    width: 100%;
    height: 100%;
    min-width: 400px;
}
</style>
