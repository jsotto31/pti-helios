<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'authenticated',
    middleware: 'auth',
})

useHead({
  title: "Change Schedule Application"
})
</script>