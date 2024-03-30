<template>
    <div>
        <!-- <div class="image-container" v-for="(image, index) in images" :key="index"> -->






        <img style="width: 500px; height: 500px;" @mousedown="startDrag" @mousemove="onDrag" @mouseup="stopDrag"
            @mouseleave="stopDrag"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg95.699pic.com%2Fphoto%2F40015%2F1187.jpg_wh860.jpg&refer=http%3A%2F%2Fimg95.699pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654323121&t=4092c978e8b827180bd5fd8d3c15bcef"
            :style="imgStyle" />
        <!-- </div> -->

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, computed, type StyleValue } from 'vue';

// 图片相关的响应式变量
const dragging = ref(false);
const initialX = ref(0);
const initialY = ref(0);
const offsetX = ref(0);
const offsetY = ref(0);
const cursorType = ref('default')
const imgStyle = computed<StyleValue>(
    () => ({
        left: `${offsetX.value}px`,
        top: `${offsetY.value}px`,
        width: '100px',
        height: '100px',
        cursor: cursorType.value,
    }) as StyleValue);

const props = defineProps(['sendState'])

// 监听鼠标事件的函数
function startDrag(event: MouseEvent) {
    dragging.value = true;
    initialX.value = event.clientX - offsetX.value;
    initialY.value = event.clientY - offsetY.value;
    cursorType.value = 'crosshair';
    props.sendState(dragging.value);
}

function onDrag(event: MouseEvent) {
    if (dragging.value) {
        event.preventDefault();
        offsetX.value = event.clientX - initialX.value;
        offsetY.value = event.clientY - initialY.value;
    }
}

function stopDrag() {
    cursorType.value = 'default'
    dragging.value = false;
    props.sendState(dragging.value)
}
</script>

<style scoped></style>