<template>
  <NConfigProvider :locale="zhCN" :dateLocal="dateZhCN">
    <NMessageProvider>
      <RouterView></RouterView>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
</script>
