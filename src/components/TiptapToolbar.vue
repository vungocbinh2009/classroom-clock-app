<template>
    <Toolbar>
        <template #start>
            <span class="p-buttonset toolbar">
                <Button @click="editor?.chain().focus().toggleBold().run()"
                    :disabled="!editor?.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor?.isActive('bold') }">
                    <font-awesome-icon icon="fa-solid fa-bold" />
                </Button>
                <Button @click="editor?.chain().focus().toggleItalic().run()"
                    :disabled="!editor?.can().chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor?.isActive('italic') }">
                    <font-awesome-icon icon="fa-solid fa-italic" />
                </Button>
                <Button @click="editor?.chain().focus().toggleStrike().run()"
                    :disabled="!editor?.can().chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor?.isActive('strike') }">
                    <font-awesome-icon icon="fa-solid fa-strikethrough" />
                </Button>
                <Button @click="editor?.chain().focus().toggleCodeBlock().run()"
                    :class="{ 'is-active': editor?.isActive('codeBlock') }">
                    <font-awesome-icon icon="fa-solid fa-code" />
                </Button>
                <Button @click="editor?.chain().focus().setTextAlign('left').run()"
                    :class="{ 'is-active': editor?.isActive({ textAlign: 'left' }) }">
                    <font-awesome-icon icon="fa-solid fa-align-left" />
                </Button>
                <Button @click="editor?.chain().focus().setTextAlign('center').run()"
                    :class="{ 'is-active': editor?.isActive({ textAlign: 'center' }) }">
                    <font-awesome-icon icon="fa-solid fa-align-center" />
                </Button>
                <Button @click="editor?.chain().focus().setTextAlign('right').run()"
                    :class="{ 'is-active': editor?.isActive({ textAlign: 'right' }) }">
                    <font-awesome-icon icon="fa-solid fa-align-right" />
                </Button>
                <Button @click="editor?.chain().focus().setTextAlign('justify').run()"
                    :class="{ 'is-active': editor?.isActive({ textAlign: 'justify' }) }">
                    <font-awesome-icon icon="fa-solid fa-align-justify" />
                </Button>
                <Button @click="editor?.chain().focus().setParagraph().run()" :class="{ 'is-active': editor?.isActive('paragraph') }">
                    P
                </Button>
                <Button @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'is-active': editor?.isActive('heading', { level: 1 }) }">
                    H1
                </Button>
                <Button @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'is-active': editor?.isActive('heading', { level: 2 }) }">
                    H2
                </Button>
                <Button @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'is-active': editor?.isActive('heading', { level: 3 }) }">
                    H3
                </Button>
                <Button @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()"
                    :class="{ 'is-active': editor?.isActive('heading', { level: 4 }) }">
                    H4
                </Button>
                <Button @click="editor?.chain().focus().toggleHeading({ level: 5 }).run()"
                    :class="{ 'is-active': editor?.isActive('heading', { level: 5 }) }">
                    H5
                </Button>
                <Button @click="editor?.chain().focus().toggleHeading({ level: 6 }).run()"
                    :class="{ 'is-active': editor?.isActive('heading', { level: 6 }) }">
                    H6
                </Button>
                <Button @click="editor?.chain().focus().toggleBulletList().run()"
                    :class="{ 'is-active': editor?.isActive('bulletList') }">
                    <font-awesome-icon icon="fa-solid fa-list-ul" />
                </Button>
                <Button @click="editor?.chain().focus().toggleOrderedList().run()"
                    :class="{ 'is-active': editor?.isActive('orderedList') }">
                    <font-awesome-icon icon="fa-solid fa-list-ol" />
                </Button>
                
                <Button @click="editor?.chain().focus().toggleBlockquote().run()"
                    :class="{ 'is-active': editor?.isActive('blockquote') }">
                    <font-awesome-icon icon="fa-solid fa-quote-left" />
                </Button>
                <Button @click="editor?.chain().focus().undo().run()" :disabled="!editor?.can().chain().focus().undo().run()">
                    <font-awesome-icon icon="fa-solid fa-rotate-left" />
                </Button>
                <Button @click="editor?.chain().focus().redo().run()" :disabled="!editor?.can().chain().focus().redo().run()">
                    <font-awesome-icon icon="fa-solid fa-rotate-right" />
                </Button>
                <Button @click="addImage()">
                    <font-awesome-icon icon="fa-solid fa-image" />
                </Button>
            </span>
        </template>
    </Toolbar>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'

let props = defineProps<{
    editor?: Editor
}>()

let editor = props.editor

let addImage = () => {
    window.electron.selectImage()
}

window.electron.selectImageCompleted((base64Image: string) => {
    console.log(base64Image)
    editor?.chain().focus().setImage({
        src: `data:image/jpg;base64,${base64Image}`
    }).run()
})
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
    >*+* {
        margin-top: 0.75em;
    }

    img {
        max-width: 100%;
        height: auto;

        &.ProseMirror-selectednode {
            outline: 3px solid #68CEF8;
        }
    }
}

.toolbar {
    color: #FFE9A0;
    background-color: #FFE9A0;
}
</style>