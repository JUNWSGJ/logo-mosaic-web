<script setup lang="ts">
import axios from 'axios'
import { NSpin, useMessage } from 'naive-ui'
import { useRequest } from 'vue-request'

const message = useMessage()

const { data, refreshAsync: refresh } = useRequest(async () => {
  const { data: respData } = await axios.get<{
    success: boolean
    errCode: string
    errMessage: string
    data: {
      canvasColor: string
      canvasHeight: number
      canvasWidth: number
      grids: {
        seq: string
        markedColor: string
        unmarkedColor: string
        marked: boolean
        points: { x: number; y: number }[]
      }[]
    }
  }>('/api/activity/detail?id=ACTIVITY_001')
  if (!respData.success) {
    message.error(respData.errMessage)
    return null
  }
  return respData.data
})

const { runAsync: markGrid, loading: marking } = useRequest(
  async (seq: string) => {
    await axios.post('/api/activity/signIn', {
      activityId: 'ACTIVITY_001',
      seq: seq
    })
    await refresh()
  },
  { manual: true }
)

const { runAsync: reset, loading: resetting } = useRequest(async () => {
  await axios.get('/api/activity/reset?id=ACTIVITY_001')
  await refresh()
})

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
        v-for="grid in data.grids"
        @click="markGrid(grid.seq)"
        :key="grid.seq"
        :class="['hover:fill-white', { 'cursor-pointer': !grid.marked }]"
        :d="buildPath(grid.points)"
        stroke="#ececec80"
        :fill="grid.marked ? grid.markedColor : grid.unmarkedColor"
      />
    </svg>
  </NSpin>
  <div>
    <NButton :loading="resetting" @click="reset">reset</NButton>
  </div>
</template>
