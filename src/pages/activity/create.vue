<script setup lang="ts">
import axios from 'axios'
import { NSpin, useMessage, type SelectOption } from 'naive-ui'
import { computed, ref } from 'vue';
import { useRequest } from 'vue-request'

const message = useMessage()


export interface Grid {
  seq: string
  shape: string
  selected: boolean
  markedColor: string
  unmarkedColor: string
  points: {x: number, y: number}[],

}

const shape = ref<string>('triangle')
const size = ref<[number, number]>([50, 40])

const canvasWidth = ref<number>(800);
const canvasHeight = ref<number>(600);

const canvasData = ref<{
  canvasWidth: number
  canvasHeight: number
  grids: Grid[]
} | null>(null)


const reset = () => {
  canvasData.value = null
}

const { runAsync: getCanvasData, loading: loading } = useRequest(
  async () => {

    const {  data } = await axios.post<
      API.Resp<{
        canvasHeight: number
        canvasWidth: number
        grids: Grid[]
      }>
    >('/api/canvas/generate_canvas_grids', {
      gridShape: shape.value,
      gridSize: size.value,
      canvasWidth: canvasWidth.value,
      canvasHeight: canvasHeight.value,
      gridSelectedColor: '#ff00ff50',
    })
    canvasData.value = data.data

  },
  { manual: true }
)


const canCreate = computed(() => {
  if (canvasData.value == null) {
    return false;
  }
  return canvasData.value?.grids?.find((item) => item.selected)
})


const { runAsync: createActivity, loading: creating } = useRequest(
  async () => {
    
    if(canvasData.value == null) {
      message.info("没有画布数据，无法创建活动");
      return
    }
    const w = canvasWidth.value;
    const h = canvasHeight.value;

    await axios.post('/api/activity/create', {
      name: '测试活动',
      canvasWidth: w,
      canvasHeight: h,
      canvasColor: '#373737ff',
      grids: canvasData.value.grids.filter(g => g.selected).map((grid) => ({
        seq: grid.seq,
        shape: grid.shape,
        selected: grid.selected,
        marked: false,
        markedColor: grid.markedColor,
        unmarkedColor: grid.unmarkedColor,
        points: grid.points,
      })),

    })
    reset()
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

const shapes: SelectOption[] = [
  {
    label: '三角形',
    value: 'triangle'
  },
  {
    label: '矩形',
    value: 'rectangle'
  }
]

const gridFillColor = ref<string>('#D9B232FF')

const selectGrid = (seq: string) => {
  const grid = canvasData.value?.grids.find((grid) => grid.seq === seq)
  if (grid) {
    grid.selected = !grid.selected
    if (grid.selected) {
      grid.markedColor = gridFillColor.value
    }
  }
}

</script>

<template>
  <NSpin
    :show="loading"
    class="inline-block"
  > 
  <div class="w-1000px mx-auto pt-50px">
    <NForm class="w-full">
      <NGrid class="w-full" :cols="24" :x-gap="24">
        <n-form-item-gi :span="8" label="画布尺寸">
          <n-input-number v-model:value="canvasWidth" :show-button="false" />
          <span class="text-center inline-block px-15px"> * </span>
          <n-input-number v-model:value="canvasHeight" :show-button="false" />
        </n-form-item-gi>

        <n-form-item-gi :span="8" label="形状">
          <n-select v-model:value="shape" :options="shapes" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="尺寸">
          <n-input-number v-model:value="size[0]" :show-button="false" />
          <span class="text-center inline-block px-15px"> * </span>
          <n-input-number v-model:value="size[1]" :show-button="false" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" >  
          填充颜色： <n-color-picker v-model:value="gridFillColor" size="small"  /> 
        </n-form-item-gi>
        <n-form-item-gi :span="8" >
          <n-button :loading="loading" @click="getCanvasData">生成画布</n-button>
        </n-form-item-gi>
        <n-form-item-gi :span="8" >
          <n-button :loading="creating" @click="createActivity" :disabled="!canCreate">创建活动</n-button>
        </n-form-item-gi>
      </NGrid>
      
  </NForm>

  </div>

    <svg
      v-if="canvasData != null"
      :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`"
      :width="canvasWidth"
      :height="canvasHeight"
    >
      <path
        v-for="grid in canvasData.grids"
        @click="selectGrid(grid.seq)"
        :key="grid.seq"
        :class="['hover:fill-white', { 'cursor-pointer': !grid.selected }]"
        :d="buildPath(grid.points)"
        stroke="#ececec80"
        :fill="grid.selected ? grid.markedColor : '#ececec60'"
      />
    </svg>
  </NSpin>
  <div>
    
  </div>
</template>
