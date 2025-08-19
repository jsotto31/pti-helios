<template>
  <v-select color="primary" class="mt-2" label="Select Approval Status" variant="outlined" density="comfortable" single-line v-model="value" :items="items" item-title="title" item-value="value"></v-select>
</template>

<script setup>
const value = defineModel()
const items = [
    {
        title: "Approved",
        value: 'approved'
    },
    {
        title: "Disapproved",
        value: 'disapproved'
    },
]
</script>

<style lang="css" scoped>

</style>