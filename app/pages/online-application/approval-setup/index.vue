<template>
  <v-container>
    <v-row>
      <v-col cols="12">
       <v-card class="rounded-lg" flat>
          <PageHeader title="Online Approver Setup" subtitle="Manage approver of employees for online applications." />
          <v-card-text class="py-5">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <label for="online-request-type" class="text-subtitle-1">Online Request Type</label>
                  <v-select v-model="type" color="primary" class="mt-2" density="comfortable" variant="outlined"
                    label="Online Request Type" :items="online_application_types" single-line hide-details></v-select>
                </v-col>
                <v-col cols="6">
                  <label for="online-request-type" class="text-subtitle-1">Employee</label>
                  <SelectEmployee v-model="employee_id" class="mt-2" single-line hide-details></SelectEmployee>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card >
          <v-card-title class="bg-primary">Employee List</v-card-title>
          <v-card-text class="">
            <v-container>
              <v-row>
                <v-col cols="12" class="px-1">
                  <SaveAllButton @save="execute" :type="type" :approval_setup_items="approval_setup_items"></SaveAllButton>
                </v-col>
                <v-col cols="12" class="px-1">
                  <v-card style="overflow-x: auto;">
                    <div style="width: 2000px;">
                      <v-data-table-server class="border rounded" :header-props="{ class: 'bg-primary' }"
                        v-model:items-per-page="itemsPerPage" :headers="approval_setup.headers"
                        :items="approval_setup.data" v-model:page="page" :items-length="approval_setup.total"
                        item-value="name" v-model:sort-by="sortBy" :loading="status == 'pending'">
                        <template #item.first_approver="{ index, item }">
                          <div class="d-flex justify-center pa-3">
                            <SelectApprover 
                              v-model="approval_setup_items[index].approval_sequence_setup_items[0].approver_id"
                              :approvers="approval_setup_items[index].approval_sequence_setup_items"
                              :employee_id="approval_setup_items[index].approval_sequence_setup_items[0].employee_id"
                              width="180px" label="Select Approver" single-line
                              hide-details></SelectApprover>
                          </div>
                        </template>
                        <template #item.second_approver="{ index, item }">
                          <div class="d-flex justify-center pa-3">
                            <SelectApprover 
                              v-model="approval_setup_items[index].approval_sequence_setup_items[1].approver_id"
                              :approvers="approval_setup_items[index].approval_sequence_setup_items"
                              :employee_id="approval_setup_items[index].approval_sequence_setup_items[1].employee_id"
                              width="180px" label="Select Approver" single-line
                              hide-details></SelectApprover>
                          </div>
                        </template>
                        <template #item.third_approver="{ index, item }">
                          <div class="d-flex justify-center pa-3">
                            <SelectApprover 
                              v-model="approval_setup_items[index].approval_sequence_setup_items[2].approver_id"
                              :approvers="approval_setup_items[index].approval_sequence_setup_items"
                              :employee_id="approval_setup_items[index].approval_sequence_setup_items[2].employee_id"
                              width="180px" label="Select Approver" single-line
                              hide-details></SelectApprover>
                          </div>
                        </template>
                        <template #item.fourth_approver="{ index, item }">
                          <div class="d-flex justify-center pa-3">
                            <SelectApprover 
                              v-model="approval_setup_items[index].approval_sequence_setup_items[3].approver_id"
                              :approvers="approval_setup_items[index].approval_sequence_setup_items"
                              :employee_id="approval_setup_items[index].approval_sequence_setup_items[3].employee_id"
                              width="180px" label="Select Approver" single-line
                              hide-details></SelectApprover>
                          </div>
                        </template>
                        <template #item.action="{ item, index }">
                          <div v-if="approval_setup_items[index]">
                            <SetupRowAction :selected="selectedRow == index" @save="execute" @paste="paste(index)" :type="type" @copy="selectedRow = index" v-model:approval_sequence_setup_items="approval_setup_items[index].approval_sequence_setup_items"></SetupRowAction>
                          </div>
                        </template>
                      </v-data-table-server>
                    </div>
                  </v-card>
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
import SelectEmployee from '~/components/SelectEmployee.vue'
import SetupRowAction from './_components/SetupRowAction.vue'
import SelectApprover from './_components/SelectApprover.vue';
import SaveAllButton from './_components/SaveAllButton.vue';
const selectedRow = ref(null)
const itemsPerPage = ref(10);
const date_from = ref(null);
const date_to = ref(null);
const employee_id = ref(null);
const selectedStatus = ref(null);
const type = ref(null);
const sortBy = ref()
const page = ref(1)
const search = ref("")
const approval_setup_items = ref();

const { data: approval_setup, status, execute, error } = await useApiFetch("/online-application/approval-setups", {
  method: 'GET',
  immediate: true,
  watch: [sortBy, page, itemsPerPage],
  query: {
    page,
    search,
    itemsPerPage,
    sortBy,
    date_from,
    date_to,
    employee_id,
    status: selectedStatus,
    type,
  },
  onResponse(event){
    approval_setup_items.value = event.response._data.data
  }
})

function paste(index){
  approval_setup_items.value[index] = Object.assign([], approval_setup_items.value[selectedRow.value])
}
</script>

<style lang="less" scoped></style>