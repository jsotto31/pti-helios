<template>
    <v-card :disabled="loading" class="pa-8 rounded-lg">
        <div class="d-flex align-center">
            <v-icon class="mr-2">mdi-alert-octagon-outline</v-icon>
            <h3 class="title-card">Confirm Deletion</h3>
        </div>
        <v-divider class="mb-3 mt-4"></v-divider>
        <v-card-text class="subtitle">
            <slot></slot>
        </v-card-text>
        <v-card-actions class="px-0">
            <v-spacer></v-spacer>
            <v-btn rounded="lg" class="text-capitalize" @click="emits('cancel')" variant="text">No, Keep It!</v-btn>
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

<style scoped>
.title-card {
    font-size: 1.2rem;
    /* 24px */
    font-weight: 700;
    color: #111827;
    /* almost black */
    line-height: 1.3;
    letter-spacing: -0.01em;
}
</style>