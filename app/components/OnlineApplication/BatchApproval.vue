<template>
    <div class="d-flex align-center w-100">
        <h4>Batch Approval</h4>
        <div class="w-25 d-flex align-center">
            <select-batch-status v-model="selectedStatus" class="ml-5" density="compact" hide-details></select-batch-status>
        </div>
        <v-btn flat class="ml-5 mt-2" color="primary">Save</v-btn>
    </div>
    <online-application-batch-approval-progress-dialog progress="0" :show="status == 'pending'"></online-application-batch-approval-progress-dialog>
</template>
<script setup>
const $notification = useNotificationStore()
const props = defineProps(['applications', 'selected']);
const selectedStatus = ref()
const form = reactive({
    approver_list_items: []
})
const { execute, status } = await useApiFetch('/online-application/change-status', {
    method: 'POST',
    immediate: false,
    onRequest(){

    },
    onResponse(event){
        if(event.response.ok){
            $notification.addNotification(
                'Success',
                'Applications has been ' + selectedStatus.value,
                'success'
            )
        }
    }
})
</script>