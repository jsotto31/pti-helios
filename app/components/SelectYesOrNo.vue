<template>
  <v-select
    v-model="value"
    :items="items"
    item-title="title"
    item-value="value"
    label="Select status"
    placeholder="Select status"
    clearable
    variant="outlined"
    density="comfortable"
    single-line
    class="dropdown-base"
  ></v-select>
</template>

<script setup>
const value = defineModel()
const items = [
  { title: "Approved", value: 'approved' },
  { title: "Disapproved", value: 'disapproved' },
  { title: "Pending", value: 'pending' },
  { title: "Cancelled", value: 'cancelled' }
]
</script>

<style lang="css" scoped>
.dropdown-base {
  font-family: 'Geist', sans-serif !important;
  font-weight: 500 !important;
  font-size: 0.95rem !important;
  text-transform: capitalize !important;
  color: #111827 !important;
  border-radius: 0.5rem !important; /* rounded-md */
  background-color: #fff !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
}

.dropdown-base .v-field__label {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  text-transform: capitalize !important;
}

.dropdown-base .v-field__outline {
  border-color: #d1d5db !important; /* gray-300 */
}

.dropdown-base.v-input--is-focused .v-field__outline {
  border-color: #4f46e5 !important; /* violet-600 */
  box-shadow: 0 0 0 3px rgba(79,70,229,0.3) !important;
}
</style>
