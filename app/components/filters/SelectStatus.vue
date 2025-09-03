<template>
  <v-select color="primary" class="mt-2" label="Select status" variant="outlined" density="comfortable" single-line v-model="value" :items="items" item-title="title" item-value="value" clearable></v-select>
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
    {
        title: "Pending",
        value: 'pending'
    },
    {
        title: "Cancelled",
        value: 'cancelled'
    }
]
</script>

<style lang="css" scoped>

</style>