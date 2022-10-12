<script lang="ts" setup>
import * as pdfjsLib from "pdfjs-dist"
import { computed, onMounted, ref, render, watch } from "vue";
import { useSettingsStore } from "../plugins/pinia";
import Toolbar from 'primevue/toolbar';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Sidebar from 'primevue/sidebar';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

let settingsStore = useSettingsStore()

let pdfUrl = ref('atom:///home/binh/Documents/Tài liệu cao học/Học máy và khai phá dữ liệu/Lesson 0 - Introduction.pdf')

// Loaded via <script> tag, create shortcut to access PDF.js exports.

//Pages are 1-based not 0-based
let currPageView = ref(1)
let numPages = ref(0);
let pdfFile: pdfjsLib.PDFDocumentProxy | null = null;
let pdfPreview = ref<HTMLElement | null>(null)
let pdfViewer = ref<HTMLElement | null>(null)
let scalePercent = ref(100)
let sideBarVisible = ref(false)
let scale = computed(() => {
    return scalePercent.value / 100
})

let renderPdf = (scale: number, element: HTMLElement) => {
    pdfjsLib.getDocument(pdfUrl.value).promise.then(function (pdf) {
        //Set PDFJS global object (so we can easily access in our page functions
        pdfFile = pdf;

        //How many pages it has
        numPages.value = pdf.numPages;

        //Start with first page
        pdf.getPage(1).then((page: pdfjsLib.PDFPageProxy) => {
            handlePages(1, page, scale, element)
        })
    });
}

let handlePages = (pageNumber: number, page: pdfjsLib.PDFPageProxy, scale: number, element: HTMLElement) => {
    //This gives us the page's dimensions at full scale
    let viewport = page.getViewport({ scale: scale });

    //We'll create a canvas for each page to draw it on
    let canvas = document.createElement("canvas");
    canvas.style.display = "block";
    let context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    //Draw it on the canvas
    page.render({ canvasContext: context, viewport: viewport });

    //Add it to the web page
    element.appendChild(canvas);

    var line = document.createElement("hr");
    element.appendChild(line);

    //Move to next page
    if (pdfFile !== null && pageNumber + 1 <= numPages.value) {
        pdfFile.getPage(pageNumber + 1).then((page: pdfjsLib.PDFPageProxy) => {
            handlePages(pageNumber + 1, page, scale, element)
        });
    }
}

watch(scale, (value) => {
    pdfViewer.value!!.innerHTML = ""
    renderPdf(value, pdfViewer.value!!)
})

watch(sideBarVisible, (value) => {
    // Render to preview
    renderPdf(0.1, pdfPreview.value!!)
})

let pdfFileName = computed(() => {
    return pdfUrl.value.split('\\').pop()!!.split('/').pop();
})

onMounted(() => {
    // Render to view
    renderPdf(scale.value, pdfViewer.value!!)
})

let zoomIn = () => {
    scalePercent.value += 10
}

let zoomOut = () => {
    scalePercent.value -= 10
}
</script>

<template>
    <div>
        <Toolbar class="header">
            <template #start>
                <Button @click="sideBarVisible = true">
                    <font-awesome-icon icon="fa-solid fa-bars" />
                </Button>
                <label class="file-name">{{pdfFileName}}</label>
            </template>
        
            <template #end>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">Pages: </span>
                    <InputNumber placeholder="Page" v-model="currPageView" />
                    <span class="p-inputgroup-addon"> / {{numPages}}</span>
                </div>
                <Button @click="zoomIn()">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" />
                </Button>
                <div class="p-inputgroup">
                    <InputNumber placeholder="Scale" v-model="scalePercent"/>
                </div>
                <Button @click="zoomOut()">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass-minus" />
                </Button>
            </template>
        </Toolbar>

        <Sidebar v-model:visible="sideBarVisible">
            <div ref="pdfPreview"></div>
        </Sidebar>
        <div class="pdf-viewer" ref="pdfViewer"></div>
    </div>
    
</template>

<style>
canvas {
    padding: 0;
    margin: auto;
    display: block;
}

.header {
    position: -webkit-sticky;/* Safari */
    position: sticky;
    top: 0;
}

.file-name {
    padding-left: 10px;
    padding-right: 10px;
}
</style>