<template>
    <v-dialog max-width="500" v-model="dialog">
        <template #activator="{props}">
            <v-btn v-bind="props" flat class="text-capitalize" color="error" rounded size="small" icon="mdi-trash-can-outline"></v-btn>
        </template>
        <template #default="{isActive}">
            <v-card>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus vero eligendi expedita eaque rerum quae amet provident eveniet quisquam deleniti, quibusdam facilis, mollitia praesentium maxime iusto perspiciatis minus? Facilis, maxime!
            </v-card>
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

</script>

<style scoped>
</style>
