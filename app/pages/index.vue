<template>
  <div>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur tempora ipsam vel esse quis soluta temporibus adipisci numquam! Optio dicta velit qui consequatur amet veniam quas delectus reprehenderit eligendi ullam?
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const feature = ref();

definePageMeta({
  title: "dasboard",
  layout: 'authenticated',
  middleware: 'auth'
})
</script>

<style lang="css" scoped>

</style>