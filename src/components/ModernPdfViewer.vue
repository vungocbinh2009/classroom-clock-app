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

let currPageRender = ref(1); //Pages are 1-based not 0-based
let currPageView = ref(1)
let numPages = ref(0);
let pdfFile: pdfjsLib.PDFDocumentProxy | null = null;
let pdfViewer = ref<HTMLElement | null>(null)
let scalePercent = ref(100)
let scale = computed(() => {
    return scalePercent.value / 100
})

onMounted(() => {
    renderPdf()
})

let renderPdf = () => {
    pdfjsLib.getDocument(pdfUrl.value).promise.then(function (pdf: pdfjsLib.PDFDocumentProxy) {
        //Set PDFJS global object (so we can easily access in our page functions
        pdfFile = pdf;

        //How many pages it has
        numPages.value = pdf.numPages;

        //Start with first page
        pdf.getPage(1).then((page: pdfjsLib.PDFPageProxy) => {
            handlePages(page, scale.value)
        })
    });
}

watch(scale, (value) => {
    pdfViewer.value!!.innerHTML = ""
    currPageRender.value = 1
    renderPdf()
})

let pdfFileName = computed(() => {
    return pdfUrl.value.split('\\').pop()!!.split('/').pop();
})

let handlePages = (page: pdfjsLib.PDFPageProxy, scale: number) => {
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
    pdfViewer.value!!.appendChild(canvas);

    var line = document.createElement("hr");
    pdfViewer.value!!.appendChild(line);

    //Move to next page
    currPageRender.value++;
    if (pdfFile !== null && currPageRender.value <= numPages.value) {
        pdfFile.getPage(currPageRender.value).then((page: pdfjsLib.PDFPageProxy) => {
            handlePages(page, scale)
        });
    }
}

let sideBarVisible = ref(false)

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
            Content
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