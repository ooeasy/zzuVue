<template>
    <h1>属性配置页面</h1>
</template>

<script setup lang="ts">
import emitter from './utils/emitter';
import { ref } from 'vue';
import { type CompIndex } from './Image';
const compIndex = ref(0)
const type = ref(0)
emitter.on("ImageToAttributes", (value) => {

    const comp = value as CompIndex
    //指明当前编辑的是哪个图片
    compIndex.value = comp.imageIndex
    //指明当前图片代表的类型
    type.value = comp.compType
    imagetoImage(compIndex.value, type.value)
    /** 
     * 组件的种类
     * 0.标题：h1～h6，h0代表p
     * 1.统计图：柱状图、饼图、折线图
     * 2.输入框：
     * 
    */


    if (type.value == 1) {

    }


})
function imagetoImage(compIndex: number, type: number) {

}




</script>

<style scoped></style>