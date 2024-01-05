<script setup lang="ts">
const { title } = defineProps<{ title: string }>();
</script>

<template>
  <div class="mt-4 flex flex-row justify-center items-center text-orange-500">
    <div class="w-24 border-t border-orange-500"></div>
    <div class="mx-4">{{ title }}</div>
    <div class="w-24 border-t border-orange-500"></div>
  </div>
</template>
