<template>
  <v-select color="primary" class="mt-2" label="Select reason" variant="outlined" density="comfortable" single-line v-model="value" :items="items" item-title="title" item-value="value" clearable></v-select>
</template>

<script setup>
const value = defineModel()
const items = [
    {
        title: "Failure To Login",
        value: 'ftl'
    },
    {
        title: "Failure To Logout",
        value: 'ftl2'
    },
    {
        title: "Failure To Login and Logout",
        value: 'ftll'
    },
]
</script>

<style lang="css" scoped>

</style>