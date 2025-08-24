<template>
  <v-select color="primary" class="mt-2" label="Select Change Schedule Type" variant="outlined" density="comfortable" single-line v-model="value" :items="items" item-title="title" item-value="value" clearable></v-select>
</template>

<script setup>
const value = defineModel()
const items = [
    {
        title: "Permanent",
        value: 'permanent'
    },
    {
        title: "Temporary",
        value: 'temporary'
    },
]
</script>

<style lang="css" scoped>

</style>