<template>
    <div>
        <v-dialog width="1000" v-model="dialog" persistent>
            <template #activator="{props}">
                <v-btn v-bind="props" variant="flat" icon="mdi-pencil" size="small" rounded color="primary" class="text-capitalize"></v-btn>
            </template>
            <template #default="{ isActive }">
                <v-card class="pa-5 rounded-lg" :disabled="status == 'pending'">
                    <v-card-title class="pr-4 text-center">Edit Correction Application</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="px-4" style="max-height: 900px;overflow-y: auto;">
                        <v-container>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="allow_approver" class="font-weight-bold mt-3">Will be approved by
                                        approver?</label>
                                </v-col>
                                <v-col class="pa-0" cols="9">
                                    <select-yes-or-no density="compact"
                                        v-model="form.allow_approver"></select-yes-or-no>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="employee" class="font-weight-bold mt-3">Employee</label>
                                </v-col>
                                <v-col class="pa-0" cols="9">
                                    <SelectEmployee hint="This field can't be edit" :clearable="false" readonly :error-messages="(error?.data.errors?.employee_id || [''])[0]"
                                        density="compact" v-model="form.employee_id"></SelectEmployee>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="date-from" class="font-weight-bold mt-3">Date of deficiency</label>
                                </v-col>
                                <v-col class="pa-0" cols="9">
                                    <div class="w-100">
                                        <VDateInput hint="This field can't be edit" readonly :error-messages="(error?.data.errors?.date || [''])[0]" class="mt-1"
                                            v-model="form.date" variant="outlined" color="primary" density="compact"
                                            prepend-icon="" prepend-inner-icon="mdi-calendar">
                                        </VDateInput>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="date-from" class="font-weight-bold mt-3">Employee Time Records</label>
                                </v-col>
                                <v-col class="pa-0" cols="9">
                                   <Suspense
                                        :key="(form.date && form.employee_id) ? (form.date + form.employee_id) : ''">
                                        <TimeRecordTable v-model:form="form"></TimeRecordTable>
                                        <template #fallback>
                                            <v-skeleton-loader type="heading, text"></v-skeleton-loader>
                                        </template>
                                    </Suspense>
                                </v-col>
                            </v-row>
                            <v-row class="mb-0 pb-0">
                                <v-col class="pa-0" cols="3">
                                    <label for="number-of-days" class="font-weight-bold mt-3">Reason</label>
                                </v-col>
                                <v-col class="pa-0" cols="9">
                                    <v-textarea color="primary" variant="outlined" single-line label="Reason"
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
import SelectEmployee from '~/components/SelectEmployee.vue';
import SelectYesOrNo from '~/components/SelectYesOrNo.vue';
import useForm from '../_composables/useForm';
import { useNotificationStore } from '#imports';
import TimeRecordTable from './TimeRecordTable.vue';
import type { CorrectionApplication } from '~/types/online-application';
const props = defineProps<{correction_application: CorrectionApplication}>()
const $notification = useNotificationStore();
const dialog = ref(false)
const { form, clear } = useForm(props.correction_application)
const emits = defineEmits(['update'])

const { execute, error, status } = await useApiFetch("/online-application/correction-applications/" + props.correction_application.id, {
    method: 'PUT',
    body: form,
    onResponse(event) {
        console.log(event)
        if (event.response.ok) {
            $notification.addNotification(
                'Success',
                'Correction Application has been updated',
                'success'
            )
            clear()
            emits('update')
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

</script>

<style scoped></style>