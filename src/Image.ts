import type { ObjectEmitsOptions } from "vue"

// 定义一个接口，限制每个对象的格式
export interface ImageInter {
    offsetX: number
    offsetY: number
    width: number
    height: number
    index: number
}
// 定义一个接口，限制组件传输索引的格式
export interface CompInter {
    imageIndex: number
    compType:number
}


// 定义一个自定义类型
export type Images = Array<ImageInter>
export type Image = ImageInter
export type CompIndex=CompInter