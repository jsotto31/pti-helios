<template>
    <div>
        <v-btn @click="dialog = true" variant="flat" color="primary" class="text-uppercase" prepend-icon="mdi-plus">
            Apply Change Schedule
        </v-btn>
        <v-dialog width="1400" v-model="dialog" persistent>
            <template #default="{ isActive }">
                <v-card class="pa-5 rounded-lg" :disabled="status == 'pending'">
                    <v-card-title class="pr-4 text-center">Apply Change Schedule Application</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="px-4" style="max-height: 1000px;overflow-y: auto;">
                        <v-container>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="2">
                                    <label for="allow_approver" class="font-weight-bold mt-3">Will be approved by
                                        approver?</label>
                                </v-col>
                                <v-col class="pa-0" cols="6">
                                    <select-yes-or-no id="allow_approver" density="compact"
                                        v-model="form.allow_approver"></select-yes-or-no>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="2">
                                    <label for="employee" class="font-weight-bold mt-3">Employee</label>
                                </v-col>
                                <v-col class="pa-0" cols="6">
                                    <SelectEmployee id="employee" :error-messages="(error?.data.errors?.employee_id || [''])[0]"
                                        density="compact" v-model="form.employee_id"></SelectEmployee>

                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="2">
                                    <label for="change-type" class="font-weight-bold mt-3">Change Type</label>
                                </v-col>
                                <v-col class="pa-0" cols="6">
                                    <ChangeScheduleType id="change-type" :error-messages="(error?.data.errors?.type || [''])[0]"
                                        density="compact" v-model="form.type"></ChangeScheduleType>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0" v-if="form.type == 'permanent'">
                                <v-col class="pa-0" cols="2">
                                    <label for="date-active" class="font-weight-bold mt-3">Date Active</label>
                                </v-col>
                                <v-col class="pa-0" cols="6">
                                    <VDateInput id="date-active" input-format="Y-m-d"
                                        :error-messages="(error?.data.errors?.date || [''])[0]" class="mt-1"
                                        v-model="form.date" variant="outlined" color="primary" density="compact"
                                        prepend-icon="" prepend-inner-icon="mdi-calendar"></VDateInput>
                                </v-col>
                            </v-row>
                            <v-row v-else class="mb-0 pb-0">
                                <v-col class="pa-0" cols="2">
                                    <label for="date-effectivity" class="font-weight-bold mt-3">Date Effective</label>
                                </v-col>
                                <v-col class="pa-0 d-flex" cols="6" style="gap: 15px">
                                    <div class="w-100">
                                        <label for="date-effectivity-from" class="font-weight-bold mt-3">From</label>
                                        <VDateInput id="date-effectivity-from"  :error-messages="(error?.data.errors?.date_from || [''])[0]"
                                            class="mt-1" v-model="form.date_from" variant="outlined" color="primary"
                                            density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar">
                                        </VDateInput>
                                    </div>
                                    <div class="w-100">
                                        <label for="date-effectivity-to"  class="font-weight-bold mt-3">To</label>
                                        <VDateInput id="date-effectivity-to" input-format="Y-m-d"
                                            :error-messages="(error?.data.errors?.date_to || [''])[0]" class="mt-1"
                                            v-model="form.date_to" variant="outlined" color="primary" density="compact"
                                            prepend-icon="" prepend-inner-icon="mdi-calendar"></VDateInput>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="px-0">
                                    <Suspense :key="displayTableId">
                                        <ScheduleTable 
                                            :server-side="true"
                                            :selected-day="selectedDay" v-model:form="form"
                                            @add="addScheduleRow"
                                            @remove="removeScheduleRow"
                                            @copy="(day) => selectedDay = day"
                                            @paste="pasteRow"
                                            @refresh="refreshRow"
                                        ></ScheduleTable> 
                                        <template #fallback>
                                            <v-skeleton-loader type="table"></v-skeleton-loader>
                                        </template>
                                    </Suspense>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="2">
                                    <label for="reason" class="font-weight-bold mt-3">Reason</label>
                                </v-col>
                                <v-col class="pa-0" cols="6">
                                    <v-textarea id="reason" color="primary" variant="outlined" single-line label="Reason"
                                        density="compact" v-model="form.reason"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="px-4">
                        <v-spacer></v-spacer>
                        <v-btn class="text-capitalize px-4" @click="isActive.value = false"
                            variant="flat">Cancel</v-btn>
                        <v-btn :loading="status == 'pending'" class="text-capitalize px-4" variant="flat"
                            color="primary" @click="execute">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'
import SelectEmployee from '~/components/filters/SelectEmployee.vue';
import SelectYesOrNo from '~/components/filters/SelectYesOrNo.vue';
import useForm from '../_composables/useForm';
import { useNotificationStore } from '#imports';
import ScheduleTable from './ScheduleTable.vue';
const $notification = useNotificationStore();
const dialog = ref(false)
const { form, displayTableId, selectedDay, addScheduleRow, clear, pasteRow, refreshRow, removeScheduleRow } = useForm(null)
const emits = defineEmits(['create'])

const { execute, error, status } = await useApiFetch("/online-application/change-schedule-applications", {
    method: 'POST',
    body: form,
    onResponse(event) {
        if (event.response.ok) {
            $notification.addNotification(
                'Success',
                'Change Schedule Application has been created',
                'success'
            )
            clear()
            emits('create')
            dialog.value = false;
        } else {
            $notification.addNotification(
                'Error',
                event.response._data.message || "",
                'error'
            )
        }
    }
})

watch(dialog, (currentValue) => currentValue == true ? clear() : '')
</script>

<style scoped></style>