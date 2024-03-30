<template>
    <h1>组件库</h1>
    <p>dragging{{ dragging }}</p>
    <p>initialX{{ initialX }}</p>
    <p>initialY{{ initialY }}</p>
    <p>offsetX{{ offsetX }}</p>
    <p>offsetY{{ offsetY }}</p>
    <!-- <div class="image-container" v-for="(image, index) in images" :key="index"> -->
    <img v-for="(image, index) in images" :key="index" @mousedown="startDrag(index, $event)"
        @mousemove="onDrag(index, $event)" @mouseup="stopDrag(index)" @mouseleave="stopDrag(index)" :src="image.src"
        :style="imgStyle(index)" />
    <!-- </div> -->

</template>

<script setup lang="ts">
import { ref, reactive, type StyleValue, computed } from 'vue';
import emitter from './utils/emitter';
// 图片相关的响应式变量
const dragging = ref(false);
const initialX = ref(0);
const initialY = ref(0);
const offsetX = ref([0, 0]);
const offsetY = ref([0, 0]);


function imgStyle(index: number): StyleValue {
    return {
        position: 'relative',
        width: '100px',
        height: '100px',
        left: `${offsetX.value[index]}px`,
        top: `${offsetY.value[index]}px`,
    };
}

// 监听鼠标事件的函数
function startDrag(index: number, event: MouseEvent) {
    dragging.value = true;
    initialX.value = event.clientX - offsetX.value[index];
    initialY.value = event.clientY - offsetY.value[index];

    console.log('startDrag ' + event.clientX + ' ' + event.clientY)
}

function onDrag(index: number, event: MouseEvent) {
    if (dragging.value) {
        event.preventDefault();
        offsetX.value[index] = event.clientX - initialX.value;
        offsetY.value[index] = event.clientY - initialY.value;
        //console.log('onDrag ' + event.clientX + ' ' + event.clientY)
    }
}

function stopDrag(index: number) {
    dragging.value = false;
    if (offsetX.value[index] > 151) {
        const url=images[index].src
        emitter.emit('addImage@Main', url)
    }
    offsetX.value[index] = 0
    offsetY.value[index] = 0
}


const images = reactive([
    {
        src: 'https://cdn.pixabay.com/photo/2023/11/29/12/29/cartoon-8419487_1280.jpg',
    },
    {
        src: 'https://cdn.pixabay.com/photo/2023/07/29/14/31/deer-8157052_1280.png',
    }
]);


</script>

<style scoped>
.image-container {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 5px;
    margin-left: 5px;
}

.image {
    position: absolute;
    width: 100px;
    height: 100px;
}
</style>