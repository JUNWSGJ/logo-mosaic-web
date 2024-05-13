<template>
  <svg :viewBox="`0 0 ${width} ${height}`">
    <image v-if="bgImgUrl" x="0" y="0" :width="width" :height="height" :href="bgImgUrl" />
    <path
      v-for="shape in shapes"
      @click="$emit('shapeClick', shape)"
      :key="shape.seq"
      :class="['hover:fill-white', { 'cursor-pointer': !shape.selected }]"
      :d="buildPath(shape.points)"
      stroke="#ececec80"
      :fill="shape.selected ? shape.color ?? '#ececec60' : '#ececec60'"
    />
  </svg>
</template>

<script setup lang="ts">
export interface XCanvasShapePoint {
  x: number
  y: number
}

export interface XCanvasShape {
  selected: boolean
  seq: string
  shape: string
  color?: string
  points: XCanvasShapePoint[]
}

export interface XCanvasProps {
  width: number
  height: number
  points: XCanvasShape[]
}

defineProps<{
  width: number
  height: number
  shapes: XCanvasShape[]
  bgImgUrl?: string
}>()

defineEmits<{
  shapeClick: [XCanvasShape]
}>()

const buildPath = (points: XCanvasShapePoint[]): string => {
  const [firstPoint, ...restPoints] = points
  return (
    restPoints.reduce(
      (path, point) => `${path} L${point.x} ${point.y}`,
      `M${firstPoint.x} ${firstPoint.y}`
    ) + ' Z'
  )
}
</script>
