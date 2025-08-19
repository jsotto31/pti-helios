<template>
  <v-select label="Select an Option" color="primary" class="mt-2" variant="outlined" density="comfortable" single-line v-model="value" :items="items" item-title="title" item-value="value"></v-select>
</template>

<script setup>
const value = defineModel(true)
const items = [
    {
        title: "Yes",
        value: true
    },
    {
        title: "No",
        value: false
    },
]
</script>

<style lang="css" scoped>

</style>