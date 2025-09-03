<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" flat>
          <PageHeader title="Leave Application" subtitle="Manage leave applications for employees." />
          <v-card-text class="py-5">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <label for="online-request-type" class="text-subtitle-1">Status</label>
                  <SelectStatus v-model="selectedStatus" hide-details></SelectStatus>
                </v-col>
                <v-col cols="4">
                  <label for="online-request-type" class="text-subtitle-1">Leave Type</label>
                  <SelectLeaveType v-model="type" hide-details></SelectLeaveType>
                </v-col>
                <v-col cols="4">
                  <label for="online-request-type" class="text-subtitle-1">Employee</label>
                  <SelectEmployee v-model="employee_id" hide-details></SelectEmployee>
                </v-col>
                <v-col cols="4">
                  <label for="online-request-type" class="text-subtitle-1">Date From</label>
                  <VDateInput class="mt-1" v-model="date_from" variant="outlined" hide-details color="primary"
                    density="comfortable" prepend-icon="" prepend-inner-icon="mdi-calendar"></VDateInput>
                </v-col>
                <v-col cols="4">
                  <label for="online-request-type" class="text-subtitle-1">Date To</label>
                  <VDateInput class="mt-1" v-model="date_to" variant="outlined" hide-details color="primary"
                    density="comfortable" prepend-icon="" prepend-inner-icon="mdi-calendar"></VDateInput>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card flat class="rounded-lg">
          <v-card-title class=" d-flex align-center justify-space-between elevated-4 font-weight-bold">
            <span class="pa-3">Application List</span>
            <CreateDialog @create="execute" />
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="">
            <v-container class="rounded-lg pa-4">
              <v-row>
                <v-col cols="12" class="px-1 d-flex align-center">
                  <BatchApproval v-model:selected="selected" :applications="leave_applications.data"></BatchApproval>
                </v-col>
                <v-col cols="12" class="px-1">
                  <v-data-table-server v-model:items-per-page="itemsPerPage" :items="leave_applications.data"
                    :items-length="leave_applications.total" :loading="status == 'pending'" :search="search" v-model:page="page" class="border" :headers="leave_applications.headers"
                    v-model:sort-by="sortBy" :header-props="{ class: 'bg-primary' }" show-select
                    v-model:model-value="selected">
                    <template #item.status="{value, item}">
                      <ApprovalAuthorityDialog :current_status="value" @update="execute" :approver_items="(item as LeaveRequest).approval_sequence_items"></ApprovalAuthorityDialog>
                    </template>
                    <template #item.type="{ value }">
                      {{ useDisplayLeaveDescription(value) }}
                    </template>
                    <template #item.action="{ item }">
                      <div class="d-flex" style="gap: 5px;">
                        <EditDialog :key="'edit-leave-application'" @update="execute"
                          :leave_application="(item as LeaveRequest)"></EditDialog>
                        <DeleteDialog :key="'delete-leave-application'" @delete="execute"
                          :id="(item as LeaveRequest).id"></DeleteDialog>
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
    <v-snackbar :model-value="selected.length > 0" timeout="-1" location="bottom"
      class="w-100">
      <div class="d-flex justify-space-between align-center w-100">
        <span><strong>{{ selected.length }}</strong> selected</span>
        <div class="d-flex" style="gap: 8px;">
          <v-btn size="small" variant="outlined" color="white" @click="selectAll">Select All</v-btn>
          <BatchDeleteButton v-model:selected="selected" type="leave_application" @saved="execute"></BatchDeleteButton>
        </div>
      </div>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import type { LeaveRequest } from '~/types/online-application';
import CreateDialog from './_components/CreateDialog.vue'
import DeleteDialog from './_components/DeleteDialog.vue';
import EditDialog from './_components/EditDialog.vue';
import BatchApproval from '../../../components/OnlineApplication/BatchApproval.vue';
import BatchDeleteButton from '~/components/OnlineApplication/BatchDeleteButton.vue';
import ApprovalAuthorityDialog from '~/components/OnlineApplication/ApprovalAuthorityDialog.vue';
import SelectEmployee from '~/components/filters/SelectEmployee.vue';
import SelectStatus from '~/components/filters/SelectStatus.vue';
import SelectLeaveType from '~/components/filters/SelectLeaveType.vue';
const itemsPerPage = ref(10);
const date_from = ref(null);
const date_to = ref(null);
const employee_id = ref(null);
const selectedStatus = ref(null);
const type = ref(null);
const sortBy = ref()
const page = ref(1)
const search = ref("")
const selected: Ref<number[]> = ref([])

const { data: leave_applications, status, execute } = await useApiFetch("/online-application/leave-applications", {
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

function selectAll() {
  const existingIds = new Set(selected.value)

  const newIds = leave_applications.value.data
    .map((item: LeaveRequest) => item.id)
    .filter((id: number) => !existingIds.has(id))

  selected.value = [...selected.value, ...newIds]
}

</script>

<style lang="less" scoped></style>