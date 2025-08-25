<template>
    <v-card :disabled="loading" class="pa-8 rounded-lg">
        <div class="d-flex flex-column gap-4">
            <div class="d-flex align-center mb-2 ">
                <v-icon class="mr-2 ">mdi-alert-octagon-outline</v-icon>
                <h3 class="font-weight-bold">Confirm Deletion</h3>
            </div>
            <v-divider></v-divider>
        </div>
        <v-card-text class="px-0 text-subtitle-2">
            <slot></slot>
        </v-card-text>
        <v-card-actions class="px-0">
            <v-spacer></v-spacer>
            <v-btn rounded="lg" class="text-capitalize px-3" @click="emits('cancel')" variant="outlined">No, Keep
                It!</v-btn>
            <v-btn rounded="lg" color="error" :loading="loading" class="text-capitalize px-3" variant="flat"
                @click="emits('delete')">Yes, Delete It!</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    loading: boolean
}>()
const emits = defineEmits(['delete', 'cancel'])
</script>

<style scoped></style>