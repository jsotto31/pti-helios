<template>
  <v-autocomplete 
        color="primary" class="mt-2" label="Select Employee" 
        variant="outlined" density="comfortable" single-line v-model="value" 
        :items="employees" item-title="name" item-value="employee_id"
        clearable
  ></v-autocomplete>
</template>

<script setup lang="ts">
import { useOptionStore } from '~/stores/options';
const props = defineProps(['error', 'selected', 'except'])
const {employees} = storeToRefs(useOptionStore())
const value = defineModel()
useOptionStore().fetchEmployees()
</script>
