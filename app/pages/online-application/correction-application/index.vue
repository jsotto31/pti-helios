<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="" style="border: 5px solid #A78BFA !important" flat>
          <v-card-title class="bg-primary">Correction Application</v-card-title>
          <v-card-text class="py-5">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <label for="status" class="text-subtitle-1">Status</label>
                  <select-status id="status" v-model="selectedStatus" hide-details></select-status>
                </v-col>
                <v-col cols="6">
                  <label for="employee" class="text-subtitle-1">Employee</label>
                  <select-employee id="employee" v-model="employee_id" hide-details></select-employee>
                </v-col>
                <v-col cols="6">
                  <label for="date-from" class="text-subtitle-1">Date From</label>
                  <VDateInput id="date-from" class="mt-1" v-model="date_from" variant="outlined" hide-details color="primary" density="comfortable" prepend-icon="" prepend-inner-icon="mdi-calendar"></VDateInput>
                </v-col>
                <v-col cols="6">
                  <label for="date-to" class="text-subtitle-1">Date To</label>
                  <VDateInput id="date-to" class="mt-1" v-model="date_to" variant="outlined" hide-details color="primary" density="comfortable" prepend-icon="" prepend-inner-icon="mdi-calendar"></VDateInput>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="d-flex" style="gap: 5px;">
                  <CreateDialog key="correction-create-dialog" @create="execute"></CreateDialog>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card style="border: 5px solid #A78BFA !important">
          <v-card-title class="bg-primary">Application List</v-card-title>
          <v-card-text class="">
            <v-container>
              <v-row>
                <v-col cols="12" class="px-1 d-flex align-center">
                  <div class="d-flex align-center w-100">
                    <h4>Batch Approval</h4>
                    <div class="w-25 d-flex align-center">
                      <select-batch-status class="ml-5" density="compact" hide-details></select-batch-status>
                    </div>
                    <v-btn flat class="ml-5 mt-2" color="primary">Save</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" class="px-1">
                  <v-data-table-server 
                    v-model:items-per-page="itemsPerPage" :items="correction_application.data" :items-length="correction_application.total"
                    :loading="status == 'pending'" :search="search" item-value="name" v-model:page="page" class="border"
                    :headers="correction_application.headers" v-model:sort-by="sortBy" :header-props="{class: 'bg-primary'}" show-select
                    >
                    <template #item.status="{ value }">
                      <v-chip prepend-icon="mdi-circle-medium" v-if="value == 'inactive'"
                        class="text-capitalize rounded" size="small" color="error">{{
                          value
                        }}</v-chip>
                      <v-chip prepend-icon="mdi-circle-medium" v-else class="text-capitalize rounded" size="small"
                        color="success">{{ value }}</v-chip>
                    </template>
                    <template #item.approving_authority="{ item }">
                      <v-btn class="text-capitalize" variant="text" prepend-icon="mdi-eye-outline">
                        Details
                      </v-btn>
                    </template>
                    <template #item.details="{ item }">
                      <v-btn color="info" size="small" icon="mdi-eye-outline" class="rounded text-capitalize" variant="tonal"></v-btn>
                    </template>
                    <template #item.action="{ item }">
                      <div class="d-flex" style="gap: 5px;">
                        <EditDialog @update="execute" :correction_application="(item as CorrectionApplication)"></EditDialog>
                        <DeleteDialog @delete="execute" :id="(item as CorrectionApplication).id"></DeleteDialog>
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

<script setup lang="ts">
import type { CorrectionApplication } from '~/types/online-application';
import CreateDialog from './_components/CreateDialog.vue'
import DeleteDialog from './_components/DeleteDialog.vue';
import EditDialog from './_components/EditDialog.vue';
const itemsPerPage = ref(10);
const date_from = ref(null);
const date_to = ref(null);
const employee_id = ref(null);
const selectedStatus = ref(null);
const type = ref(null);
const sortBy = ref()
const page = ref(1)
const search = ref("")

const { data: correction_application, status, execute } = await useApiFetch("/online-application/correction-applications", {
  method: 'GET',
  immediate: true,
  watch: [sortBy, page, itemsPerPage],
  query: {
    page,
    itemsPerPage,
    sortBy,
    date_from,
    date_to,
    employee_id,
    status: selectedStatus,
    type,
  }
})

</script>

<style lang="less" scoped></style>