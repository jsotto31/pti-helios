<template>
    <div>
         <v-btn @click="dialog = true" variant="flat" color="primary" class="text-uppercase" prepend-icon="mdi-plus">
            Apply OB/WFH
        </v-btn>
        <v-dialog width="900" v-model="dialog" persistent>
            <template #default="{ isActive }">
                <v-card class="pa-5 rounded-lg" :disabled="status == 'pending'">
                    <v-card-title class="pr-4 text-center">Apply OB/WFH Application</v-card-title>
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
                                    <label for="leave-type" class="font-weight-bold mt-3">Official Business Type</label>
                                </v-col>
                                <v-col class="pa-0" cols="7">
                                    <SelectOBType :error-messages="(error?.data.errors?.type || [''])[0]" density="compact" v-model="form.type"></SelectOBType>
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
                                <v-col class="pa-0" cols="3"></v-col>
                                <v-col class="pa-0 d-flex" cols="7" style="gap: 15px">
                                    <div class="w-100">
                                        <label for="date-from" class="font-weight-bold mt-3">Date From</label>
                                        <VDateInput :error-messages="(error?.data.errors?.date_from || [''])[0]" class="mt-1" v-model="form.date_from" variant="outlined" color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar"></VDateInput>
                                    </div>
                                    <div class="w-100">
                                        <label for="date-to" class="font-weight-bold mt-3">Date To</label>
                                        <VDateInput time input-format="Y-m-d" :error-messages="(error?.data.errors?.date_to || [''])[0]" class="mt-1" v-model="form.date_to" variant="outlined" color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar"></VDateInput>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3"></v-col>
                                <v-col class="pa-0 d-flex" cols="7" style="gap: 15px">
                                    <div class="w-100">
                                        <label for="date-from" class="font-weight-bold mt-3">Time From</label>
                                        <TimePicker :error-messages="(error?.data.errors?.time_from || [''])[0]" class="mt-1" v-model="form.time_from" variant="outlined" color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar"></TimePicker>
                                    </div>
                                    <div class="w-100">
                                        <label for="date-to" class="font-weight-bold mt-3">Time To</label>
                                        <TimePicker :error-messages="(error?.data.errors?.time_to || [''])[0]" class="mt-1" v-model="form.time_to" variant="outlined" color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar"></TimePicker>
                                    </div>
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
                            color="primary" @click="execute">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'
import SelectEmployee from '~/components/SelectEmployee.vue';
import SelectYesOrNo from '~/components/SelectYesOrNo.vue';
import useForm from '../_composables/useForm';
import { useNotificationStore } from '#imports';
const $notification = useNotificationStore();
const dialog = ref(false)
const {form, clear} = useForm(null)
const emits = defineEmits(['create'])

const { execute, error, status } = await useApiFetch("/online-application/ob-applications", {
    method: 'POST',
    body: form,
    onResponse(event) {
        console.log(event)
        if (event.response.ok) {
            $notification.addNotification(
                'Success',
                'OB Application has been created',
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