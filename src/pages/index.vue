<script setup lang="ts">
import axios from 'axios'
import { NSpin, useMessage } from 'naive-ui'
import { useRequest } from 'vue-request'

const message = useMessage()

const { data, refreshAsync: refresh } = useRequest(async () => {
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

const { runAsync: markShape, loading: marking } = useRequest(
  async (seq: string) => {
    await axios.post('/activity/signIn', {
      activityId: 'ACTIVITY_001',
      seq: seq
    })
    await refresh()
  },
  { manual: true }
)

const buildPath = (points: { x: number; y: number }[]): string => {
  const [firstPoint, ...restPoints] = points
  return (
    restPoints.reduce(
      (path, point) => `${path} L${point.x} ${point.y}`,
      `M${firstPoint.x} ${firstPoint.y}`
    ) + ' Z'
  )
}
</script>

<template>
  <NSpin
    :show="marking"
    class="inline-block"
    :style="`background-color: ${data?.canvasColor ?? 'black'}`"
  >
    <svg
      v-if="data != null"
      :viewBox="`0 0 ${data.canvasWidth} ${data.canvasHeight}`"
      :width="data.canvasWidth"
      :height="data.canvasHeight"
    >
      <path
        v-for="shape in data.shapes"
        @click="markShape(shape.seq)"
        :key="shape.seq"
        :class="{ 'cursor-pointer': !shape.marked }"
        :d="buildPath(shape.points)"
        stroke="#ececec80"
        :fill="shape.marked ? shape.color : '#ececec60'"
      />
    </svg>
  </NSpin>
</template>
