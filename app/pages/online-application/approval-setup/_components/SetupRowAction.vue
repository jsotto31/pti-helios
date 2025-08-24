<template>
  <div class="d-flex justify-center pa-3" style="gap: 5px;">
    <v-btn :loading="status == 'pending'" :disabled="status == 'pending'" 
           @click="execute" size="small" variant="outlined" color="grey" rounded flat 
           icon="mdi-content-save"
    ></v-btn>
    <v-btn :disabled="status == 'pending' || selected" @click="emits('copy')" size="small" variant="outlined" color="grey" rounded flat icon="mdi-content-copy"></v-btn>
    <v-btn :disabled="status == 'pending'" @click="emits('paste')" size="small" variant="outlined" color="grey" rounded flat icon="mdi-content-paste"></v-btn>
    <v-btn :disabled="status == 'pending'" @click="clear" size="small" variant="outlined" color="grey" rounded flat icon="mdi-reload"></v-btn>
  </div>
</template>

<script setup lang="ts">
import type { ApprovalSequenceSetupItem } from '~/types/online-application';
const $notification = useNotificationStore();
const props = defineProps<{approval_sequence_setup_items: ApprovalSequenceSetupItem[], type: string, selected: boolean}>()
const emits = defineEmits(['copy', 'paste', 'refresh', 'save'])
const form = reactive({
  employee_list: {},
  type: ""
});

const { execute, error, status } = await useApiFetch("/online-application/approval-setups", {
    method: 'POST',
    body: form,
    onRequest(){
      const employee_id = props.approval_sequence_setup_items[0]?.employee_id as string
      if(employee_id){
        //@ts-ignore
        form.employee_list[employee_id] = props.approval_sequence_setup_items
        form.type = props.type
      }
    },
    onResponse(event) {
        if (event.response.ok) {
            $notification.addNotification(
                'Success',
                'Approval Setup has been created',
                'success'
            )
            clear()
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

function clear(){
  props.approval_sequence_setup_items.forEach((item: ApprovalSequenceSetupItem, index: number) => {
    if(props.approval_sequence_setup_items[index]?.approver_id){
      props.approval_sequence_setup_items[index].approver_id = null;
    }
  })
}
</script>
