<template>
    <v-dialog max-width="500" v-model="dialog">
        <template #activator="{props}">
            <v-btn v-bind="props" flat class="text-capitalize" color="error" rounded size="small" icon="mdi-trash-can-outline"></v-btn>
        </template>
        <template #default="{isActive}">
            <DeleteConfirmationCard
                :loading="status == 'pending'" 
                @delete="execute" 
                @cancel="isActive.value = false"
            > 
                Are you sure you want to delete this OB Application? 
                This action cannot be undone and will permanently remove all related data associated with this OB request.
            </DeleteConfirmationCard>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import DeleteConfirmationCard from '~/components/DeleteConfirmationCard.vue';

const $notification = useNotificationStore();
const dialog = ref(false);

const props = defineProps<{
    id: number
}>();

const emits = defineEmits(['delete']);

const { execute, status } = await useApiFetch("/online-application/ob-applications/" + props.id, {
    method: 'DELETE',
    onResponse(event) {
        if (event.response.ok) {
            $notification.addNotification(
                'Success',
                'OB Application has been deleted',
                'success'
            );
            dialog.value = false;
            emits('delete');
        } else {
            $notification.addNotification(
                'Error',
                'Failed to delete OB Application',
                'error'
            );
        }
    }
});
</script>

<style scoped>
</style>
