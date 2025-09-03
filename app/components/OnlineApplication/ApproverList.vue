<template>
    <v-card>
        <v-col cols="8">
            <div class="d-flex">
                <v-icon size="45" class="mr-3">mdi-account-circle</v-icon>
                <div>
                    <h5 class="font-weight-medium text-subtitle-2">{{ approver.employee.name }}</h5>
                    <h5 class="font-weight-regular text-caption text-grey-darken-1">{{
                        approver.employee.email }}</h5>
                </div>
            </div>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-center">
            <div v-if="approver.can_approve && approver.approver_id == user.id" class="d-flex" style="gap: 5px;">
                <v-chip prepend-icon="mdi-alert-circle-outline" class="text-capitalize rounded" color="warning">
                    Need Action
                </v-chip>
            </div>
            <v-chip class="rounded text-capitalize" prepend-icon="mdi-reload" v-else-if="approver.can_approve"
                variant="tonal" color="purple">
                Processing
            </v-chip>
            <v-chip class="rounded text-capitalize" v-else-if="approver.status == 'approved'" variant="tonal"
                color="success" prepend-icon="mdi-check">
                {{ approver.status }}
            </v-chip>
            <v-chip class="rounded text-capitalize" v-else-if="approver.status == 'disapproved'" variant="tonal"
                color="error" prepend-icon="mdi-cancel">
                {{ approver.status }}
            </v-chip>
            <div v-else>
                <v-icon v-if="current_status == 'disapproved' || current_status == 'cancelled'" color="grey-darken-1">
                    mdi-minus
                </v-icon>
                <v-chip v-else class="rounded text-capitalize" variant="tonal" color="yellow-darken-4"
                    prepend-icon="mdi-reload">
                    {{ approver.status }}
                </v-chip>
            </div>
        </v-col>
    </v-card>
</template>

<script setup>
const { user } = storeToRefs(useAuthStore())
const props = defineProps(['approver', 'current_status'])
</script>
