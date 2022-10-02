<template>
    <div class="editor" v-if="editor" @click="focusOnEditor">
        <tiptap-toolbar :editor="editor" />
        <editor-content class="editor-content" :editor="editor" />
    </div>
</template>

<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3'
import { onMounted, ShallowRef } from 'vue'
import TiptapToolbar from './TiptapToolbar.vue';
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'

let editor = useEditor({
    content: '',
    extensions: [
        StarterKit,
        Image.configure({
            allowBase64: true,
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
    ],
})

let focusOnEditor = () => {
    editor.value?.chain().focus()
}
</script>

<style scoped>
.editor {
    width: 100%;
    height: 100%;
    font-size: 24px;
}

.editor-container {
    padding: 20px;
    max-width: 100%;
    height: 100%;
}

.editor-content {
    width: 100%;
    height: 90%;
    overflow: scroll;
}
</style>