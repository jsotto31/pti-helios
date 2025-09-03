<script setup lang="ts">
import SelectEmployee from "~/components/filters/SelectEmployee.vue";
import SelectStatus from "~/components/filters/SelectStatus.vue";

const employee_id = ref(null);
const selectedStatus = ref(null);
const search = ref("");
const itemsPerPage = ref(10);
const headers = ref([
    { title: 'Employee', key: 'name', sortable: true },
    { title: 'Employee ID', key: 'employee_id', sortable: true },
    { title: 'Email', key: 'email', sortable: true },
    { title: 'Type', key: 'type', sortable: true },
    { title: 'Date Created', key: 'created_at', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
]);

const props = defineProps<{ modelValue: number | null }>();
const emit = defineEmits(["update:modelValue"]);

const { data: employees, execute } = await useApiFetch("/employees", {
    method: "GET",
});

await execute();

// Format date for display
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};
</script>

<style scoped>
.employee-table {
    .v-data-table {
        border-radius: 8px;
        overflow: hidden;
    }

    .employee-avatar {
        margin-right: 12px;
    }

    .employee-info {
        display: flex;
        align-items: center;
    }
}

:deep(.v-data-table-header__content) {
    font-weight: bold;
}
</style>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="rounded-lg" flat>
                    <PageHeader title="Employee 201" subtitle="Manage Employee 201 file." />
                    <v-card-text class="py-5">
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                    <label for="online-request-type" class="text-subtitle-1">Status</label>
                                    <select-status v-model="selectedStatus" hide-details></select-status>
                                </v-col>
                                <v-col cols="6">
                                    <label for="online-request-type" class="text-subtitle-1">Status</label>
                                    <select-status v-model="selectedStatus" hide-details></select-status>
                                </v-col>
                                <v-col cols="6">
                                    <label for="online-request-type" class="text-subtitle-1">Status</label>
                                    <select-status v-model="selectedStatus" hide-details></select-status>
                                </v-col>
                                <v-col cols="6">
                                    <label for="online-request-type" class="text-subtitle-1">Employee</label>
                                    <select-employee v-model="employee_id" hide-details></select-employee>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card class="employee-table">
                    <v-card-title class="d-flex align-center justify-space-between elevated-4 font-weight-bold">
                        <span class="pa-3">Employee List</span>
                        <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Search" single-line
                            hide-details variant="outlined" density="compact" class="search-field"></v-text-field>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-data-table :headers="headers" :items="employees || []" :search="search"
                        :items-per-page="itemsPerPage" class="elevation-1">
                        <template v-slot:item.name="{ item }">
                            <div class="employee-info">
                                <v-avatar size="40" class="employee-avatar">
                                    <v-img alt="Employee" src="~/assets/profile.png"></v-img>
                                </v-avatar>
                                <div>
                                    <div class="font-weight-medium">{{ item.name }}</div>
                                    <div class="text-caption text-grey">{{ item.email }}</div>
                                </div>
                            </div>
                        </template>

                        <template v-slot:item.created_at="{ item }">
                            {{ formatDate(item.created_at) }}
                        </template>

                        <template v-slot:item.actions="{ item }">
                            <v-btn icon size="small" variant="text" color="primary" :to="`/employees/${item.id}`">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                            <v-btn icon size="small" variant="text" color="primary">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon size="small" variant="text" color="error">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>

                        <template v-slot:bottom>
                            <div class="text-center pt-2">
                                <v-pagination v-model="page" :length="pageCount"></v-pagination>
                            </div>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>