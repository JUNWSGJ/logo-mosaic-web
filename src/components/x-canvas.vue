<template>
  <svg :viewBox="`0 0 ${width} ${height}`">
    <image v-if="bgImgUrl" x="0" y="0" :width="width" :height="height" :href="bgImgUrl" />
    <path
      v-for="grid in grids"
      @click="$emit('gridClick', grid)"
      :key="grid.seq"
      :class="['hover:fill-white', { 'cursor-pointer': !grid.selected }]"
      :d="buildPath(grid.points)"
      stroke="#ececec80"
      :fill="grid.selected ? grid.color ?? '#ececec60' : '#ececec60'"
    />
  </svg>
</template>

<script setup lang="ts">
export interface XCanvasGridPoint {
  x: number
  y: number
}

export interface XCanvasGrid {
  selected: boolean
  seq: string
  shape: string
  color?: string
  points: XCanvasGridPoint[],
  ext: Record<string, any>,
}

export interface XCanvasProps {
  width: number
  height: number
  points: XCanvasGrid[]
}

defineProps<{
  width: number
  height: number
  grids: XCanvasGrid[]
  bgImgUrl?: string
}>()

defineEmits<{
  gridClick: [XCanvasGrid]
}>()

const buildPath = (points: XCanvasGridPoint[]): string => {
  const [firstPoint, ...restPoints] = points
  return (
    restPoints.reduce(
      (path, point) => `${path} L${point.x} ${point.y}`,
      `M${firstPoint.x} ${firstPoint.y}`
    ) + ' Z'
  )
}
</script>
