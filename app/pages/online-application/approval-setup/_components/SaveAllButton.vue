<template>
  <div style="gap: 5px;">
    <v-btn :loading="status == 'pending'" @click="execute" color="primary" class="text-capitalize">Save All</v-btn>
  </div>
</template>

<script setup lang="ts">
import type { ApprovalSequenceSetupItem, ApprovalSetupItem } from '~/types/online-application';
const $notification = useNotificationStore();
const props = defineProps<{approval_setup_items: ApprovalSetupItem[], type: string, selected: boolean}>()
const emits = defineEmits(['save'])
const form = reactive({
  employee_list: {},
  type: ""
});

const { execute, status } = await useApiFetch("/online-application/approval-setups", {
    method: 'POST',
    body: form,
    onRequest(){
      props.approval_setup_items.forEach((item: ApprovalSetupItem) => {
         const employee_id = item.approval_sequence_setup_items[0]?.employee_id as string
         if(employee_id){
                //@ts-ignore
            form.employee_list[employee_id] = item.approval_sequence_setup_items
         }
      })
    
      form.type = props.type
    },
    onResponse(event) {
        if (event.response.ok) {
            $notification.addNotification(
                'Success',
                'Approval Setup has been updated',
                'success'
            )
            emits('save')
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
