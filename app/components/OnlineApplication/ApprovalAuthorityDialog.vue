<template>
    <v-dialog width="600" :persistent="isApprover" v-model="dialog">
        <template #activator="{ props }">
            <online-application-approving-chip-button v-bind="props" :current_status="current_status" :is-approver="isApprover" />
        </template>
        <template #default="{ isActive }">
            <v-card max-height="500" height="500" class="w-100 rounded-lg d-flex flex-column" flat>
                <v-card-title class="pa-2 d-flex align-center px-6 text-subtitle-1 border-b">
                    <span>List of Approvers</span>
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" class="" @click="dialog=false" flat></v-btn>
                </v-card-title>
                <v-list class="bg-transparenth-100" style="overflow-y: auto;">
                    <ApproverList 
                            v-for="item, index in approver_list_items" :approver="item" :key="item.id" 
                            class="d-flex align-center rounded-0 px-5 pa-1" variant="text" flat 
                            :class="index == approver_list_items.length ? '' : 'border-b'"
                            :current_status="current_status"
                    ></ApproverList>
                </v-list>
                <v-spacer></v-spacer>
                <v-overlay contained class="d-flex align-center pa-5 justify-center" width="400"
                    :model-value="current_status != 'pending'">
                    <online-application-overlay-status-content  class="pa-6 py-10 rounded-lg elevation-2 text-center" style="min-width: 320px;" :current_status="current_status"></online-application-overlay-status-content>
                </v-overlay>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup>
import ApproverList from './ApproverList.vue'

const { user } = storeToRefs(useAuthStore())
const props = defineProps(['current_status', 'approver_items'])
const emits = defineEmits(['update'])
const dialog = ref(false)
const approver_list_items = ref(props.approver_items)
const $notification = useNotificationStore();
const isApprover = computed(() => !!props.approver_items.find((item) => item.can_approve && item.approver_id == user.value.id))

const { execute, status, error } = await useApiFetch("/transaction/change-status", {
    method: 'POST',
    body: {
        approver_list_items
    }, onResponse(event) {
        if (event.response.ok) {
            $notification.addNotification(
                'Success',
                'Approval Sequence has been updated',
                'success'
            )
            dialog.value = false
            emits('update')
        } else {
            $notification.addNotification(
                'Error',
                event.response._data.message,
                'error'
            )
        }
    }
})

watch(() => props.approver_items, (newVal) => {
    approver_list_items.value = newVal
})
</script>