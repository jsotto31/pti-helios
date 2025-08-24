<template>
  <v-autocomplete 
        color="primary" class="mt-2" label="Select Employee" 
        variant="outlined" density="comfortable" single-line v-model="value" 
        :items="items" item-title="name" item-value="employee_id"
        clearable
  ></v-autocomplete>
</template>

<script setup>
import { useOptionStore } from '~/stores/options';
const props = defineProps(['error', 'approvers', 'employee_id'])
const {employees} = storeToRefs(useOptionStore())
const value = defineModel()
useOptionStore().fetchEmployees()
const items = computed(() => 
  employees.value.filter(item => {
    return (
      !props.approvers.some(approver => approver.approver_id == item.employee_id) ||
      value.value == item.employee_id
    ) && props.employee_id != item.employee_id;
  })
);


</script>
