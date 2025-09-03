<template>
    <!-- Need Action Chip if the current user is the approver -->
    <v-chip v-if="isApprover" prepend-icon="mdi-alert-circle-outline"
        class="text-capitalize rounded" size="small" color="warning">
        Need Action
    </v-chip>

    <!-- Approved -->
    <v-chip prepend-icon="mdi-check-circle-outline" v-else-if="current_status == 'approved'"
        class="text-capitalize rounded" size="small" color="success">
        {{ current_status }}
    </v-chip>

    <!-- Disapproved -->
    <v-chip prepend-icon="mdi-close-circle-outline" v-else-if="current_status == 'disapproved'"
        class="text-capitalize rounded" size="small" color="error">
        {{ current_status }}
    </v-chip>

    <!-- Cancelled -->
    <v-chip prepend-icon="mdi-cancel" v-else-if="current_status == 'cancelled'"
        class="text-capitalize rounded" size="small" color="red-darken-4">
        {{ current_status }}
    </v-chip>

    <!-- Pending / Processing -->
    <v-chip prepend-icon="mdi-progress-clock" v-else
        class="text-capitalize rounded" size="small" color="purple">
        {{ current_status == 'pending' ? 'Processing' : current_status }}
    </v-chip>
</template>

<script setup>
const props = defineProps(['current_status', 'isApprover'])
</script>
