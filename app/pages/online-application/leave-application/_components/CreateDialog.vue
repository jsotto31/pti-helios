<template>
    <div>
        <v-btn @click="dialog = true" variant="flat" color="primary" class="text-capitalize">Apply Leave</v-btn>
        <v-dialog width="900" v-model="dialog" persistent>
            <template #default="{ isActive }">
                <v-card class="pa-5 rounded-lg" :disabled="status == 'pending'">
                    <v-card-title class="pr-4">Apply Leave Application</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="px-4">
                        <v-container>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="allow_approver" class="font-weight-bold mt-3">Will be approved by
                                        approver?</label>
                                </v-col>
                                <v-col class="pa-0" cols="7">
                                    <select-yes-or-no density="compact" v-model="form.allow_approver"></select-yes-or-no>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="employee" class="font-weight-bold mt-3">Employee</label>
                                </v-col>
                                <v-col class="pa-0" cols="7">
                                    <SelectEmployee :error-messages="(error?.data.errors?.employee_id || [''])[0]" density="compact" v-model="form.employee_id"></SelectEmployee>

                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="leave-type" class="font-weight-bold mt-3">Leave Type</label>
                                </v-col>
                                <v-col class="pa-0" cols="7">
                                    <SelectLeaveType :error-messages="(error?.data.errors?.type || [''])[0]" density="compact" v-model="form.type"></SelectLeaveType>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="with-pay" class="font-weight-bold mt-3">With Pay</label>
                                </v-col>
                                <v-col class="pa-0" cols="7">
                                    <SelectYesOrNo density="compact" v-model="form.with_pay"></SelectYesOrNo>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3"></v-col>
                                <v-col class="pa-0 d-flex" cols="7" style="gap: 15px">
                                    <div class="w-100">
                                        <label for="date-from" class="font-weight-bold mt-3">Date From</label>
                                        <VDateInput :error-messages="(error?.data.errors?.date_from || [''])[0]" class="mt-1" v-model="form.date_from" variant="outlined" color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar"></VDateInput>
                                    </div>
                                    <div class="w-100">
                                        <label for="date-to" class="font-weight-bold mt-3">Date To</label>
                                        <VDateInput input-format="Y-m-d" :error-messages="(error?.data.errors?.date_to || [''])[0]" class="mt-1" v-model="form.date_to" variant="outlined" color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar"></VDateInput>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="number-of-days" class="font-weight-bold mt-3">Days</label>
                                </v-col>
                                <v-col class="pa-0" cols="7">
                                    <v-number-input :error-messages="(error?.data.errors?.number_of_days || [''])[0]" color="primary" control-variant="hidden" variant="outlined" readonly density="compact" v-model="form.number_of_days"></v-number-input>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="number-of-days" class="font-weight-bold mt-3">Reason</label>
                                </v-col>
                                <v-col class="pa-0" cols="7">
                                    <v-textarea color="primary" variant="outlined" single-line label="Reason" density="compact" v-model="form.reason"></v-textarea>
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
                            color="primary" @click="create">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'
import SelectEmployee from '~/components/SelectEmployee.vue';
import SelectLeaveType from '~/components/SelectLeaveType.vue';
import SelectYesOrNo from '~/components/SelectYesOrNo.vue';
import useForm from '../_composables/useForm';
import { useNotificationStore } from '#imports';
const $notification = useNotificationStore();
const dialog = ref(false)
const {form, clear} = useForm(null)
const emits = defineEmits(['create'])

const { execute: create, error, status } = await useApiFetch("/online-application/leave-applications", {
    method: 'POST',
    body: form,
    onResponse(event) {
        if (event.response.ok) {
            $notification.addNotification(
                'Success',
                'Leave Application has been created',
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