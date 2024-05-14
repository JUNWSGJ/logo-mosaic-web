<template>
  <div class="w-500px mx-auto pt-50px">
    <NForm class="w-full">
      <NGrid class="w-full" :cols="24" :x-gap="24">
        <n-form-item-gi :span="8" label="选择图片">
          <n-select v-model:value="imageId" :options="imageOptions" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="形状">
          <n-select v-model:value="shape" :options="shapes" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="尺寸">
          <n-input-number v-model:value="size[0]" :show-button="false" />
          <span class="text-center inline-block px-15px"> * </span>
          <n-input-number v-model:value="size[1]" :show-button="false" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="筛选策略">
          <n-select v-model:value="pickStrategy" :options="pickStrategies" />
        </n-form-item-gi>

        <n-form-item-gi :span="16" >
          <div v-if="pickStrategy == 'EliminateBgColor'" class="flex inline items-center">
            留存像素点占整个格子的的比例 >=
            <n-input-number
              class="w-50px"
              v-model:value="remainingRatio"
              :precision="2"
              :min="0.3"
              :max="1.00"
              :show-button="false"/>
          </div>
          <div v-if="pickStrategy == 'AvgColorCompare'" class="flex inline items-center">
            <n-color-picker v-model:value="targetColor" class="w-30" size="small" :show-alpha="false" /> 
            差值<n-slider v-model:value="color_distance_range" range  :step=5  class="w-50" show-tooltip />
          </div>
        </n-form-item-gi>
      </NGrid>
      <NGrid class="w-full" :cols="24" :x-gap="24">
        
        <n-form-item-gi :span="8" >  
          格子填充颜色： <n-color-picker v-model:value="gridSelectedColor" class="w-30" size="small"  /> 
        </n-form-item-gi>
        <n-form-item-gi :span="8" >  
          是否显示背景图： <n-switch v-model:value="showBgImg" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" >  
          <n-button @click="generate" :loading="generating">生成画布</n-button>
        </n-form-item-gi>


      </NGrid>
      
      
    </NForm>
      
    <div v-if="imageData != null" class="relative mt-50px">
      <XCanvas
        :width="imageData.canvasWidth"
        :height="imageData.canvasHeight"
        :shapes="imageData.grids"
        :bg-img-url="showBgImg? imageSrc : ''"
        @shape-click="clickGrid"
      ></XCanvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useMessage, type SelectOption } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRequest } from 'vue-request'
import type { XCanvasShape } from '@/components'

const message = useMessage()

const imageId = ref<string>()
const shape = ref<string>('triangle')
const size = ref<[number, number]>([50, 40])
const pickStrategy = ref<string>('EliminateBgColor')
// const pickOptions = ref<number[]>([0.1, 1.0])
const remainingRatio = ref<number>(0.3)

const targetColor = ref<string>('#ffffff')
const color_distance_range = ref<number[]>([1, 100])

const gridSelectedColor = ref<string>('#ff00ff50')
const showBgImg = ref<boolean>(true)


export interface GridPoint {
  x: number
  y: number
}

export interface Grid {
  selected: boolean
  seq: string
  shape: string
  color?: string
  points: GridPoint[],
  ext: Record<string, any>,
}

const clickGrid  = (e: Grid) => {
  message.info(`${JSON.stringify(e)}`)
  if(imageData.value) {
    imageData.value.grids = imageData.value.grids.map((grid) => {
      if(grid.seq === e.seq) {
        grid.selected = !grid.selected
      }
      if(grid.selected) {
        grid.color = gridSelectedColor.value
      } else {
        grid.color = "#33333350"
      }
      return grid
    })
  }
  
}

const imageSrc = computed(() => {
  if (imageId.value == null) {
    return null
  }
  const item = imageOptions.value?.find((item) => item.value === imageId.value)?.path as string
  return item ? new URL(item, location.origin).href : null
})



const shapes: SelectOption[] = [
  {
    label: '三角形',
    value: 'triangle'
  }
]

const pickStrategies: SelectOption[] = [
  {
    label: '去除背景色',
    value: 'EliminateBgColor'
  },
  {
    label: '格子平均色值比较',
    value: 'AvgColorCompare'
  }
]

const { data: imageOptions } = useRequest(async () => {
  type ImageListData = {
    logoImages: {
      height: number
      width: number
      id: string
      name: string
      path: string
    }[]
  }
  const resp = await axios.get<API.Resp<ImageListData>>('/api/image/list')
  return resp.data.data.logoImages.map(
    (image): SelectOption => ({
      label: image.name,
      value: image.id,
      path: image.path,
      data: image
    })
  )
})


const imageData = ref<{
  canvasHeight: number
  canvasWidth: number
  grids: XCanvasShape[]
}>()

const {
  run: generate,
  data: imageData1,
  loading: generating
} = useRequest(
  async () => {
    if (imageId.value == null) {
      message.error('请先选择图片')
      return null
    }

    const {  data } = await axios.post<
      API.Resp<{
        canvasHeight: number
        canvasWidth: number
        grids: XCanvasShape
      }>
    >('/api/image/convert_to_mosaic_grids', {
      imageId: imageId.value,
      gridShape: shape.value,
      gridSize: size.value,
      gridPickStrategy: pickStrategy.value,
      gridPickOptions: {
        remainingRatio: remainingRatio.value,
        targetColor: targetColor.value,
        colorDistanceRange: color_distance_range.value
      },
      gridSelectedColor: '#ff00ff50',
    })
    imageData.value = data.data
    return data.data
  },
  {
    manual: true
  }
)
</script>
