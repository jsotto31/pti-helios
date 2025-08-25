<template>
    <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" flat>
          <PageHeader title="Manage In/Out" subtitle="Manage logs of employees." />
          <v-card-text class="py-5">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <label for="status" class="text-subtitle-1">Employee Type</label>
                  <select-status id="status" v-model="selectedStatus" hide-details></select-status>
                </v-col>
                <v-col cols="6">
                  <label for="employee" class="text-subtitle-1">Employee</label>
                  <select-employee id="employee" v-model="employee_id" hide-details></select-employee>
                </v-col>
                <v-col cols="6">
                  <label for="date-from" class="text-subtitle-1">Date From</label>
                  <VDateInput id="date-from" class="mt-1" v-model="date_from" variant="outlined" hide-details
                    color="primary" density="comfortable" prepend-icon="" prepend-inner-icon="mdi-calendar">
                  </VDateInput>
                </v-col>
                <v-col cols="6">
                  <label for="date-to" class="text-subtitle-1">Date To</label>
                 
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class=" d-flex align-center justify-space-between elevated-4 font-weight-bold">
            <span class="pa-3 ">Employee List</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="">
            <v-container>
            
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const itemsPerPage = ref(10);
const date_from = ref(null);
const date_to = ref(null);
const employee_id = ref(null);
const selectedStatus = ref(null);
const type = ref(null);
const sortBy = ref()
const page = ref(1)
const search = ref("")
</script>

<style lang="less" scoped></style>