<template>
  <main class="flex justify-center items-center flex-col h-screen">
    <p class="text-yellow-300 text-lg">hello world</p>
    <el-button class="mt-2">点我没用</el-button>
    <pre>
      {{ JSON.stringify(data) }}
    </pre>
    <div v-for="item in data" :key="item.areaId">{{ item.areaId }}</div>
  </main>
</template>
<script setup lang="ts">
import { createArea, useRequest, areaList } from '@/apis'
const { data, loading } = useRequest(areaList)
</script>
