<template>
    <h1>页面内定位信息</h1>
    左边距<input type="number" v-model="img.offsetX">
    上边距<input type="number" v-model="img.offsetY">
    宽<input type="number" v-model="img.width">
    高<input type="number" v-model="img.height" />
    <p> index{{ img.index }}</p>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
import emitter from './utils/emitter';
import { type Image } from './Image';




const img = reactive(
    { offsetX: 0, offsetY: 0, width: 0, height: 0, index: 0 }
)

emitter.on("ImageToInput", (value) => {
    const image = value as Image
    img.index = image.index
    img.offsetX = image.offsetX
    img.offsetY = image.offsetY
    img.width = image.width
    img.height = image.height
})

watch(img, (value) => {
    emitter.emit('InputToImage', value)
})

</script>

<style scoped></style>