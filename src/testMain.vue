<template>

    <!-- <div class="image-container" style="background-color:blueviolet"> -->

        <!-- <div class="image-container" v-for="(image, index) in images" :key="index"> -->

        <img v-for="(image, index) in images" :key="index" @mousedown="startDrag(index, $event)"
            @mousemove="onDrag(index, $event)" @mouseup="stopDrag" @mouseleave="stopDrag" :src="image.src"
            :style="imageStyle(index)" />

        <!-- </div> -->
    <!-- </div> -->

</template>

<script setup lang="ts">
import { ref, reactive, defineProps, type StyleValue } from 'vue';
import emitter from './utils/emitter';

const testurl = ref("https://profile-avatar.csdnimg.cn/ec2b3bc7ac134c6bb99422dd9cc07d10_yanghang1122.jpg!1");
// 图片相关的响应式变量
const dragging = ref(false);
const initialX = ref(0);
const initialY = ref(0);
const offsetX = ref([0, 0]);
const offsetY = ref([0, 0]);
const cursorType = ref('default');

const images = reactive([
    {
        src: 'https://cdn.pixabay.com/photo/2023/11/29/12/29/cartoon-8419487_1280.jpg',
    },
    {
        src: 'https://cdn.pixabay.com/photo/2023/07/29/14/31/deer-8157052_1280.png',
    },
]);

const props = defineProps(['sendState'])

// 监听鼠标事件的函数
function startDrag(index: number, event: MouseEvent) {
    dragging.value = true;
    initialX.value = event.clientX - offsetX.value[index];
    initialY.value = event.clientY - offsetY.value[index];
    cursorType.value = 'crosshair';
    props.sendState(dragging.value)
}

function onDrag(index: number, event: MouseEvent) {
    if (dragging.value) {
        event.preventDefault();
        offsetX.value[index] = event.clientX - initialX.value;
        offsetY.value[index] = event.clientY - initialY.value;
    }
}

function stopDrag() {
    cursorType.value = 'default';
    dragging.value = false;
    props.sendState(dragging.value)
}

function imageStyle(index: number): StyleValue {
    return {
        position: 'relative',
        left: `${offsetX.value[index]}px`,
        top: `${offsetY.value[index]}px`,
        width: '100px',
        height: '100px',
        cursor: cursorType.value,
    };
}
emitter.on("addImage@Main", (value) => {
    const url: string = value as string
    addImage(url)
})

function addImage(url: string) {
    const newImage = {
        src: url,
    }
    const newOffset = 2
    offsetX.value.push(newOffset)
    offsetY.value.push(newOffset)
    images.push(newImage)
}
</script>

<style scoped>
.image-container {
    width: 500px;
}
</style>