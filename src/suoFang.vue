<template>
    <div ref="mainRef" id="mainRef" style="position: relative;">

        <img v-for="(image, index) in images" :key="index" @mousedown="startDrag(index, $event)"
            @mousemove="onDrag(index, $event)" @mouseup="stopDrag(index)" @mouseleave="stopDrag(index)" :src="image.src"
            :style="imageStyle(index)" />
    </div>

</template>

<script setup lang="ts">
import { ref, reactive, defineProps, type StyleValue, onMounted, toRefs } from 'vue';
import emitter from './utils/emitter';
import { type Images, type Image } from './Image';
import type { RefSymbol } from '@vue/reactivity';
// 图片相关的响应式变量
const dragging = ref(false);
//偏移量初始值
const initialX = ref(0);
const initialY = ref(0);
//指针位置初始值
const eventX = ref(0)
const eventY = ref(0)
//缩放变量初始值
const x = ref(0)
const y = ref(0)

let Comp = reactive<Images>([
    { offsetX: 0, offsetY: 0, width: 100, height: 100, index: 0 }
])
const cursorType = ref('default');
const mainRef = ref<any>(null);
onMounted(() => {

    console.dir(mainRef)
    a(); b();

});
function a() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    console.log(scrollTop);

    const divElement = document.getElementById('mainRef'); // 替换成你的 div 元素的实际 ID

    if (divElement) {
        const rect = divElement.getBoundingClientRect();

        const offsetTop = rect.top + window.scrollY;
        const offsetLeft = rect.left + window.scrollX;

        console.log('Div 相对于文档的偏移量位置 - Top:', offsetTop, 'Left:', offsetLeft);
    } else {
        console.log('未找到对应 ID 的 div 元素');
    }

} function b() {

    const divElement = document.getElementById('mainRef'); // 替换成你的 div 元素的实际 ID

    if (divElement) {
        const offsetTop = divElement.offsetTop
        const offsetLeft = divElement.offsetLeft
        console.log('Div 相对于窗口的偏移量位置 - Top:', offsetTop, 'Left:', offsetLeft);
    } else {
        console.log('未找到对应 ID 的 div 元素');
    }

}
function imageStyle(index: number): StyleValue {
    return {
        position: 'absolute',
        left: `${Comp[index].offsetX}px`,
        top: `${Comp[index].offsetY}px`,
        width: `${Comp[index].width}px`,
        height: `${Comp[index].height}px`,
        cursor: cursorType.value,
    };
}


const images = reactive([
    {
        src: 'https://cdn.pixabay.com/photo/2023/11/29/12/29/cartoon-8419487_1280.jpg',
    },
]);

const props = defineProps(['sendState'])

// 监听鼠标事件的函数
function startDrag(index: number, event: MouseEvent) {
    a(); b();
    console.log('send----', Comp[index])
    emitter.emit('ImageToInput', Comp[index])
    //指针的初始值
    eventX.value = event.clientX
    eventY.value = event.clientY
    dragging.value = true;
    //偏移量的初始值
    initialX.value = Comp[index].offsetX
    initialY.value = Comp[index].offsetY
    cursorType.value = 'move';

    const divElement = document.getElementById('mainRef'); // 替换成你的 div 元素的实际 ID
    const divOffSetTop = ref(0)
    const divOffSetLeft = ref(0)
    if (divElement) {
        divOffSetTop.value = divElement.offsetTop
        divOffSetLeft.value = divElement.offsetLeft
    } else {
        alert('未找到对应 ID 的 div 元素');
    }
    //页面向上滚动的量
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (event.clientX - divOffSetLeft.value > Comp[index].offsetX + Comp[index].width * 0.9 && event.clientY - divOffSetTop.value+scrollTop > Comp[index].offsetY + Comp[index].height * 0.9) {
        //缩放增量初始值
        x.value = Comp[index].width;
        cursorType.value = 'grabbing';
        cursorType.value = 'crosshair';
        y.value = Comp[index].height;
    }
    props.sendState(dragging.value, initialX.value, initialY.value, Comp[index].offsetX, Comp[index].offsetY, event.clientX, event.clientY)
}

function onDrag(index: number, event: MouseEvent) {


    if (dragging.value) {
        emitter.emit('ImageToInput', Comp[index])
    }

    if (dragging.value && cursorType.value == 'move') {
        event.preventDefault();
        Comp[index].offsetX = initialX.value + event.clientX - eventX.value
        Comp[index].offsetY = initialY.value + event.clientY - eventY.value
        props.sendState(dragging.value, initialX.value, initialY.value, Comp[index].offsetX, Comp[index].offsetY, event.clientX, event.clientY)
    }
    if (dragging.value && cursorType.value == 'crosshair') {
        event.preventDefault();
        Comp[index].width = x.value + event.clientX - eventX.value
        Comp[index].height = y.value + event.clientY - eventY.value
    }
}

function stopDrag(index: number) {
    cursorType.value = 'default';
    dragging.value = false;
    props.sendState(dragging.value, initialX.value, initialY.value, Comp[index].offsetX, Comp[index].offsetY)

}


emitter.on("addImage@Main", (value) => {
    const url: string = value as string
    addImage(url)
})

emitter.on("InputToImage", (value) => {
    const img = value as Image;
    const index = img.index
    //Comp[img.index] = img;
    Comp[index].height = img.height
    Comp[index].width = img.width
    Comp[index].offsetX = img.offsetX
    Comp[index].offsetY = img.offsetY
})

function addImage(url: string) {
    const newImageUrl = {
        src: url,
    }
    const num = Object.keys(Comp).length
    var image: Image = {
        width: 100,
        height: 100,
        offsetX: 0,
        offsetY: 0,
        index: num
    };
    images.push(newImageUrl)
    Comp.push(image)
}
</script>

<style scoped></style>