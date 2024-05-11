<script setup lang="ts">
import axios from 'axios'
import { useMessage } from 'naive-ui'
import { useRequest } from 'vue-request'

const message = useMessage()

const { data } = useRequest(async () => {
  const { data: respData } = await axios.get<{
    success: boolean
    errCode: number
    errMessage: string
    data: {
      canvasColor: string
      canvasHeight: number
      canvasWidth: number
      shapeType: string
      shapes: {
        seq: string
        color: string
        marked: boolean
        points: { x: number; y: number }[]
      }[]
    }
  }>('/activity/detail?id=ACTIVITY_001')
  if (!respData.success) {
    message.error(respData.errMessage)
    return null
  }
  return respData.data
})

const buildPath = (points: { x: number; y: number }[]): string => {
  const [firstPoint] = points.slice(0, 1)
  const restPoints = points.slice(1)
  return (
    restPoints.reduce(
      (path, point) => `${path} L ${point.x} ${point.y}`,
      `M ${firstPoint.x} ${firstPoint.y}`
    ) + ' Z'
  )
}
</script>

<template>
  <div class="inline-block" :style="`background-color: ${data?.canvasColor ?? 'black'}`">
    <svg
      v-if="data != null"
      :viewBox="`0 0 ${data.canvasWidth} ${data.canvasHeight}`"
      :width="data.canvasWidth"
      :height="data.canvasHeight"
    >
      <path
        v-for="shape in data.shapes"
        :key="shape.seq"
        :d="buildPath(shape.points)"
        :data-seq="shape.seq"
        :fill="shape.marked ? shape.color : '#ececec'"
      />
    </svg>
  </div>
</template>
