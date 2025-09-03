<template>
    <v-btn :loading="status == 'pending'" flat size="small" color="error" prepend-icon="mdi-trash-can-outline" @click="execute">Delete</v-btn>
</template>
<script setup>
const $notification = useNotificationStore()
const emits = defineEmits(['saved'])
const props = defineProps(['type']);
const selected = defineModel('selected')
const form = reactive({
    ids: [],
    type: props.type
})
const {execute, status} = await useApiFetch('/online-application/batch-destroy', {
    method: 'POST',
    immediate: false,
    body: form,
    onRequest(){
        form.ids = selected.value
    },
    onResponse(event){
        if (event.response.ok) {
            $notification.addNotification(
                'Success',
                'Applications has been deleted',
                'success'
            )
            selected.value = []
            emits('saved')
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