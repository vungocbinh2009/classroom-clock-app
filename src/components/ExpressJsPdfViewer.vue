<template>
    <div ref="viewer"></div>
</template>

<script lang="ts">
/* eslint-disable */
import WebViewer from "@pdftron/pdfjs-express-viewer";
export default {
    name: "ExpressJsPdfViewer",
    mounted: function () {
        WebViewer(
            {
                path: "/expressjs",
                initialDoc: "pdfjs/web/compressed.tracemonkey-pldi-09.pdf",
                licenseKey: 'ubZAn88FdTR9OzNzaDe4',
            },
            this.$refs.viewer
        ).then((instance: any) => {
            
        });
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
    width: 100%;
    height: 100vh;
}
</style>