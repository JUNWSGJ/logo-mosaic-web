<template>
  <div class="w-500px mx-auto pt-50px">
    <NForm class="w-full">
      <NGrid class="w-full" :cols="24" :x-gap="24">
        <n-form-item-gi :span="24" label="选择图片">
          <n-select v-model:value="imageId" :options="imageOptions" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="形状">
          <n-select v-model:value="shape" :options="shapes" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="尺寸">
          <n-input-number v-model:value="size[0]" :show-button="false" />
          <span class="text-center inline-block px-15px"> * </span>
          <n-input-number v-model:value="size[1]" :show-button="false" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="筛选策略">
          <n-select v-model:value="pickStrategy" :options="pickStrategies" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="筛选参数">
          <n-input-number
            class="w-full"
            v-model:value="pickOptions[0]"
            :precision="2"
            :show-button="false"
          />
        </n-form-item-gi>
      </NGrid>
      <n-button @click="generate" :loading="generating">生成</n-button>
    </NForm>
    <div v-if="imageData != null" class="relative mt-50px">
      <XCanvas
        :width="imageData.canvas_width"
        :height="imageData.canvas_height"
        :shapes="imageData.grids"
        :bg-img-url="imageSrc"
        @shape-click="message.info($event.seq)"
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
const pickStrategy = ref<string>('eliminate_bg_color')
const pickOptions = ref<number[]>([0.3])

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
    label: 'eliminate_bg_color',
    value: 'eliminate_bg_color'
  }
]

const { data: imageOptions } = useRequest(async () => {
  type ImageListData = {
    logo_images: {
      height: number
      width: number
      id: string
      name: string
      path: string
    }[]
  }
  const resp = await axios.get<API.Resp<ImageListData>>('/api/image/list')
  return resp.data.data.logo_images.map(
    (image): SelectOption => ({
      label: image.name,
      value: image.id,
      path: image.path,
      data: image
    })
  )
})

const {
  run: generate,
  data: imageData,
  loading: generating
} = useRequest(
  async () => {
    if (imageId.value == null) {
      message.error('请先选择图片')
      return null
    }

    const { data } = await axios.post<
      API.Resp<{
        canvas_height: number
        canvas_width: number
        grids: XCanvasShape
      }>
    >('/api/image/convert_to_mosaic_grids', {
      image_id: imageId.value,
      grid_shape: shape.value,
      grid_size: size.value,
      grid_pick_strategy: pickStrategy.value,
      grid_pick_options: pickOptions.value.map((item) => item.toString())
    })
    return data.code === 'SUCCESS' ? data.data : null
  },
  {
    manual: true
  }
)
</script>
