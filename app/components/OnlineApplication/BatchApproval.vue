<template>
    <div class="d-flex align-center w-100">
        <h4>Batch Approval</h4>
        <div class="w-25 d-flex align-center">
            <SelectBatchStatus v-model="form.status" class="ml-5" density="compact" hide-details></SelectBatchStatus>
        </div>
        <v-btn :disabled="!form.status || selected.length === 0" :loading="form.status === 'pending'" @click="execute" flat class="ml-5 mt-2" color="primary">Save</v-btn>
    </div>
    <online-application-batch-approval-progress-dialog :progress="progress" :show="numberOfApplicationToProcess != 0"></online-application-batch-approval-progress-dialog>
</template>
<script setup>
import SelectBatchStatus from '../filters/SelectBatchStatus.vue';
const $notification = useNotificationStore()
const props = defineProps(['applications', "selected"]);
const selected = defineModel('selected')
const processedApplications = ref(0);
const numberOfApplicationToProcess = ref(0)
const progress = ref(0);
const form = reactive({
    approver_list_items: [],
    status: null,
})
const { execute, status } = await useApiFetch('/online-application/change-status', {
    method: 'POST',
    immediate: false,
    body: form,
    onRequest(event){
        if(numberOfApplicationToProcess.value === 0){
            numberOfApplicationToProcess.value = props.selected.length
        }

        if(props.selected.length > 0){
            form.approver_list_items = props.applications.find((item) =>  selected.value[0] === item.id).approval_sequence_items.map((item) => ({...item, status: form.status}));
        }

        return event;
    },
    onResponse(event){
        const employee_name = props.applications.find((item) =>  selected.value[0] === item.id).name;
        props.selected.splice(0, 1)
        progress.value = ((props.selected.length - numberOfApplicationToProcess.value) / numberOfApplicationToProcess.value) * -100

        if(event.response.ok){
            $notification.addNotification(
                'Success',
                `<b>${employee_name}</b> Applications has been ${form.status}`,
                'success'
            )
        }else{
             $notification.addNotification(
                'Error',
                event.response._data.message || "",
                'error'
            )
        }

        if(props.selected.length > 0){
            execute()
        }else{
            form.status = null
            numberOfApplicationToProcess.value = 0
            progress.value = 0
        }
    },
    onError(){
        $notification.addNotification(
            'Error',
            'Something went wrong',
            'error'
        )
    }
})
</script>