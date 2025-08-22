<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'
import SelectEmployee from '~/components/SelectEmployee.vue';
import SelectLeaveType from '~/components/SelectLeaveType.vue';
import SelectYesOrNo from '~/components/SelectYesOrNo.vue';
import useForm from '../_composables/useForm';
import { useNotificationStore } from '#imports';

const $notification = useNotificationStore();
const dialog = ref(false)
const { form, clear } = useForm(null)
const { form, clear } = useForm(null)
const emits = defineEmits(['create'])

const { execute, error, status } = await useApiFetch("/online-application/leave-applications", {
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

<template>
    <div>
        <v-btn @click="dialog = true" class="button button-primary rounded-md" height="45" flat>
            <v-icon start size="18">mdi-plus</v-icon>
            Apply Leave
        </v-btn>

        <v-dialog width="800" v-model="dialog" persistent>
            <v-card class="pa-4 rounded-lg" :disabled="status == 'pending'">
                <h1 class="p-4 dialog-header text-center font-weight-medium" >Add Leave Application</h1>
                <v-divider class="my-2"></v-divider>

                <v-card-text class="px-2">
                    <v-container fluid class="pa-0">
                        <!-- Simplified form rows with cleaner structure -->
                        <v-row dense class="mb-1 align-center">
                            <v-col cols="12" sm="3">
                                <label class=" dialog-label">Approver Required?</label>
                            </v-col>
                            <v-col cols="12" sm="9">
                                <SelectYesOrNo density="compact" v-model="form.allow_approver" />
                            </v-col>
                        </v-row>

                        <v-row dense class="mb-1 align-center">
                            <v-col cols="12" sm="3">
                                <label class=" dialog-label">Employee</label>
                            </v-col>
                            <v-col cols="12" sm="9">
                                <SelectEmployee :error-messages="(error?.data.errors?.employee_id || [''])[0]"
                                    density="compact" v-model="form.employee_id" />
                            </v-col>
                        </v-row>

                        <v-row dense class="mb-1 align-center">
                            <v-col cols="12" sm="3">
                                <label class=" dialog-label">Leave Type</label>
                            </v-col>
                            <v-col cols="12" sm="9">
                                <SelectLeaveType :error-messages="(error?.data.errors?.type || [''])[0]"
                                    density="compact" v-model="form.type" />
                            </v-col>
                        </v-row>

                        <v-row dense class="mb-1 align-center">
                            <v-col cols="12" sm="3">
                                <label class=" dialog-label">With Pay</label>
                            </v-col>
                            <v-col cols="12" sm="9">
                                <SelectYesOrNo density="compact" v-model="form.with_pay" />
                            </v-col>
                        </v-row>

                        <v-row dense class="mb-1">
                            <v-col cols="12" sm="3" class="d-flex align-center">
                                <label class=" dialog-label">Date Range</label>
                            </v-col>
                            <v-col cols="12" sm="9">
                                <v-row dense>
                                    <v-col cols="12" sm="6">
                                        <VDateInput :error-messages="(error?.data.errors?.date_from || [''])[0]"
                                            v-model="form.date_from" variant="outlined" color="primary"
                                            density="compact" label="From" />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <VDateInput :error-messages="(error?.data.errors?.date_to || [''])[0]"
                                            v-model="form.date_to" variant="outlined" color="primary" density="compact"
                                            label="To" />
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                        <v-row dense class="mb-1 align-center">
                            <v-col cols="12" sm="3">
                                <label class="dialog-label">Days</label>
                            </v-col>
                            <v-col cols="12" sm="9">
                                <v-text-field :error-messages="(error?.data.errors?.number_of_days || [''])[0]"
                                    color="primary" variant="outlined" readonly density="compact"
                                    v-model="form.number_of_days"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row dense class="mb-1">
                            <v-col cols="12" sm="3">
                                <label class="dialog-label">Reason</label>
                            </v-col>
                            <v-col cols="12" sm="9">
                                <v-textarea color="primary" variant="outlined" density="compact" v-model="form.reason"
                                    rows="2" hide-details></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-divider class="my-2"></v-divider>

                <v-card-actions class="px-2">
                    <v-spacer></v-spacer>
                    <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
                    <v-btn :loading="status == 'pending'" variant="flat" color="primary" @click="execute">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>