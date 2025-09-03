<template>
  <v-select color="primary" class="mt-2" label="Select leave type" clearable variant="outlined" density="comfortable" single-line v-model="value" :items="items" item-title="title" item-value="value"></v-select>
</template>

<script setup>
const value = defineModel()
const items = [
    {
        title: "Vacation Leave",
        value: 'vacation-leave'
    },
    {
        title: "Sick Leave",
        value: 'sick-leave'
    },
    {
        title: "Birthday Leave",
        value: 'birthday-leave'
    },
    {
        title: "Emergency Leave",
        value: 'emergency-leave'
    }
]
</script>

<style lang="css" scoped>

</style>