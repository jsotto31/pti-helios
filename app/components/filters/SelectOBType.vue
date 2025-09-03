<template>
  <v-select color="primary" class="mt-2" label="Select OB type" variant="outlined" density="comfortable" single-line v-model="value" :items="items" item-title="title" item-value="value" clearable></v-select>
</template>

<script setup>
const value = defineModel()
const items = [
    {
        title: "Offial Business",
        value: 'ob'
    },
    {
        title: "Work From Home",
        value: 'wfh'
    },
]
</script>

<style lang="css" scoped>

</style>