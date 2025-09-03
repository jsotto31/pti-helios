<template>
    <v-dialog :model-value="show" max-width="500" persistent>
        <v-card class="pa-6 rounded-lg elevation-3 text-center">
            <v-card-title class="text-h6 justify-center mb-2">
                Batch Approval in Progress
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <p class="mb-4 text-body-2 text-grey-darken-1">
                    Please wait while the system processes the batch approval.
                </p>

                <div class="d-flex flex-column align-center">
                    <v-progress-circular :model-value="progress" size="80" width="8" color="primary" class="mb-4"
                        indeterminate="progress < 100">
                        <strong>{{ progress }}%</strong>
                    </v-progress-circular>

                    <v-progress-linear :model-value="progress" color="primary" height="12" rounded class="w-100" striped
                        animated></v-progress-linear>
                </div>

                <p v-if="progress < 100" class="text-caption text-grey-darken-1 mt-3">
                    Processing {{ progress }}% completed...
                </p>
                <p v-else class="text-subtitle-2 text-success mt-3">
                    ✅ Batch approval completed successfully!
                </p>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn v-if="progress >= 100" color="success" variant="flat" @click="dialog = false">
                    Done
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps(['progress', 'show'])
</script>
