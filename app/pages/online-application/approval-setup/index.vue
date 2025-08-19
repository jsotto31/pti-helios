<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="" style="border: 5px solid #7C3AED !important" flat>
          <v-card-title class="bg-primary">Online Approver Set-up</v-card-title>
          <v-card-text class="py-5">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <label for="online-request-type" class="text-subtitle-1">Online Request Type</label>
                  <v-select color="primary" class="mt-2" density="comfortable" variant="outlined"
                    label="Online Request Type" single-line hide-details></v-select>
                </v-col>
                <v-col cols="6">
                  <label for="online-request-type" class="text-subtitle-1">Employee</label>
                  <v-select color="primary" class="mt-2" density="comfortable" variant="outlined"
                    label="Online Request Type" single-line hide-details></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card style="border: 5px solid #7C3AED !important">
          <v-card-title class="bg-primary">Employee List</v-card-title>
          <v-card-text class="">
            <v-container>
              <v-row>
                <v-col cols="12" class="px-1">
                    <v-data-table-server class="border" :header-props="{class: 'bg-primary'}" v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
                      :items-length="totalItems" :loading="loading" item-value="name"
                      @update:options="loadItems">
                      <template #item.approver_id_1="{ item }">
                        <v-select width="180px" label="Select Approver" density="compact" variant="outlined" single-line hide-details></v-select>
                      </template>
                      <template #item.approver_id_2="{ item }">
                        <v-select width="180px" label="Select Approver" density="compact" variant="outlined" single-line hide-details></v-select>
                      </template>
                      <template #item.approver_id_3="{ item }">
                        <v-select width="180px" label="Select Approver" density="compact" variant="outlined" single-line hide-details></v-select>
                      </template>
                      <template #item.approver_id_4="{ item }">
                        <v-select width="180px" label="Select Approver" density="compact" variant="outlined" single-line hide-details></v-select>
                      </template>
                      <template #item.action="{item}">
                        <div class="d-flex justify-center" style="gap: 5px;">
                          <v-btn size="small" variant="outlined" color="grey" rounded flat icon="mdi-content-save"></v-btn>
                          <v-btn size="small" variant="outlined" color="grey" rounded flat icon="mdi-content-copy"></v-btn>
                          <v-btn size="small" variant="outlined" color="grey" rounded flat icon="mdi-content-paste"></v-btn>
                          <v-btn size="small" variant="outlined" color="grey" rounded flat icon="mdi-reload"></v-btn>
                        </div>
                      </template>
                    </v-data-table-server>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const employees = [
  {
    employee_id: 'EMP0001',
    full_name: "Joshua Sotto",
    approver_id_1: 'APR1001',
    approver_id_2: 'APR2001',
    approver_id_3: 'APR3001',
    approver_id_4: 'APR4001',
  },
  {
    employee_id: 'EMP0002',
    full_name: "Joshua Sotto",
    approver_id_1: 'APR1002',
    approver_id_2: 'APR2002',
    approver_id_3: 'APR3002',
    approver_id_4: 'APR4002',
  },
  {
    employee_id: 'EMP0003',
    full_name: "Joshua Sotto",
    approver_id_1: 'APR1003',
    approver_id_2: 'APR2003',
    approver_id_3: 'APR3003',
    approver_id_4: 'APR4003',
  },
  {
    employee_id: 'EMP0004',
    full_name: "Joshua Sotto",
    approver_id_1: 'APR1004',
    approver_id_2: 'APR2004',
    approver_id_3: 'APR3004',
    approver_id_4: 'APR4004',
  },
  {
    employee_id: 'EMP0005',
    full_name: "Joshua Sotto",
    approver_id_1: 'APR1005',
    approver_id_2: 'APR2005',
    approver_id_3: 'APR3005',
    approver_id_4: 'APR4005',
  },
]

const headers = ref([
  { title: 'Employee ID', key: 'employee_id', align: 'start' },
  { title: 'Full name', key: 'full_name', align: 'start' },
  { title: 'Approver 1', key: 'approver_id_1', align: 'start' },
  { title: 'Approver 2', key: 'approver_id_2', align: 'start' },
  { title: 'Approver 3', key: 'approver_id_3', align: 'start' },
  { title: 'Approver 4', key: 'approver_id_4', align: 'start' },
  { title: 'Actions', key: 'action', align: 'center', sortable: false },
])

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = employees.slice()
        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc'
              ? (aValue > bValue ? -1 : 1)
              : (aValue < bValue ? -1 : 1)
          })
        }
        const paginated = items.slice(start, end)
        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  },
}

const itemsPerPage = ref(5)
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)
function loadItems({ page, itemsPerPage, sortBy }) {
  loading.value = true
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
    serverItems.value = items
    totalItems.value = total
    loading.value = false
  })
}
</script>

<style lang="less" scoped></style>