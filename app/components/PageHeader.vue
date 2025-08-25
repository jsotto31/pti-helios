
<template>
  <div class="page-header p-4">
    <div class="header-content pt-4 pl-7 d-flex justify-space-between">
      <div>
        <h1 >{{ title }}</h1>
        <p v-if="subtitle" >{{ subtitle }}</p>
      </div>

      <div v-if="$slots.create">
        <slot name="create"></slot>
      </div>
    </div>
    <v-divider class="my-4"></v-divider>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  subtitle?: string
}>()
</script>

<style scoped>

</style>

