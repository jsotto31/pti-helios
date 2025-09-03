<template>
    <v-card class="pa-6 text-center rounded-lg elevation-2" max-width="400">
        <!-- Status Icon -->
        <v-icon v-if="current_status == 'approved'" color="success" size="70" class="mb-4">
            mdi-check-circle-outline
        </v-icon>

        <v-icon v-else-if="current_status == 'disapproved'" color="error" size="70" class="mb-4">
            mdi-close-circle-outline
        </v-icon>

        <v-icon v-else-if="current_status == 'cancelled'" color="red-darken-4" size="70" class="mb-4">
            mdi-cancel
        </v-icon>

        <v-icon v-else color="warning" size="70" class="mb-4">
            mdi-clock-outline
        </v-icon>

        <!-- Status Text -->
        <div v-if="current_status == 'approved'">
            <h2 class="text-success mb-2">Application Approved</h2>
            <p class="text-body-2 mb-1">
                Your online application has been approved successfully.
            </p>
        </div>

        <div v-else-if="current_status == 'disapproved'">
            <h2 class="text-error mb-2">Application Disapproved</h2>
            <p class="text-body-2 mb-1">
                Unfortunately, your application was not approved.
            </p>
            <p class="text-caption text-grey-darken-1">
                Please contact HR or your administrator for more details.
            </p>
        </div>

        <div v-else-if="current_status == 'cancelled'">
            <h2 class="text-red-darken-4 mb-2">Application Cancelled</h2>
            <p class="text-body-2 mb-1">
                This application has been cancelled.
            </p>
            <p class="text-caption text-grey-darken-1">
                No further action is needed.
            </p>
        </div>

        <div v-else>
            <h2 class="text-warning mb-2">Pending Approval</h2>
            <p class="text-body-2 mb-1">
                Your online application is awaiting review.
            </p>
            <p class="text-caption text-grey-darken-1">
                Please check back later for updates.
            </p>
        </div>
    </v-card>

</template>

<script setup>
const props = defineProps(['current_status'])
</script>
