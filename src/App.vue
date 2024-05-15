<template>
  <NConfigProvider :locale="zhCN" :dateLocal="dateZhCN">
    <NMessageProvider>
      <nav class="flex items-center justify-between p-4 bg-gray-100 text-gray-800">
        <ul class="flex space-x-8">
          <li> <RouterLink to="/activity/view" class="hover:text-blue-600 transition-colors duration-200">活动页面</RouterLink></li>
          <li> <RouterLink to="/activity/custom-create" class="hover:text-blue-600 transition-colors duration-200">创建活动-自定义画布</RouterLink></li>
          <li> <RouterLink to="/activity/create-with-image" class="hover:text-blue-600 transition-colors duration-200">创建活动-基于图片预生成画布</RouterLink></li>
        </ul>
       
        </nav>
      <main>
        <RouterView />
      </main>
    </NMessageProvider>
  </NConfigProvider>
</template>


<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
</script>
