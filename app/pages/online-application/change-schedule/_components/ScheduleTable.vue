<template>
    <div>
        <v-table class="rounded-lg border border-e-0 mb-5">
            <thead class="bg-primary">
                <tr>
                    <th class="text-center border-e pa-0 "></th>
                    <th class="text-center border-e pa-0 ">
                        Day of week
                    </th>
                    <th class="text-center border-e pa-0 ">
                        From
                    </th>
                    <th class="text-center border-e pa-0 ">
                        To
                    </th>
                    <th class="text-center border-e pa-0 ">
                        Tardy Start
                    </th>
                    <th class="text-center border-e pa-0 ">
                        Absent Start
                    </th>
                    <th class="text-center border-e pa-0 ">
                        Early Dismissal
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="schedule_item, day in form.schedule" :key="generateRandomKey()">
                    <tr v-for="item, index in schedule_item" :key="generateRandomKey()">
                        <td class="border-e" align="center">
                            <div class="d-flex justify-center w-100" style="gap: 5px;width: 60px;">
                                <v-btn :active="selectedDay == day" @click="emits('copy', day)" :disabled="index != 0" color="primary" variant="tonal" rounded size="small" icon="mdi-content-copy" />
                                <v-btn @click="emits('paste', day)" :disabled="index != 0" color="secondary" variant="tonal" rounded size="small" icon="mdi-content-paste" />
                                <v-btn @click="emits('refresh', day, index)" color="info" variant="tonal" rounded size="small" icon="mdi-refresh" />
                                <v-btn v-if="index == 0" @click="emits('add', day)" color="success" variant="tonal" rounded size="small" icon="mdi-plus" />
                                <v-btn v-else @click="emits('remove', day, index)" color="error" variant="tonal" rounded size="small" icon="mdi-trash-can-outline" />
                            </div>
                        </td>
                        <td class="border-e text-capitalize" align="center" style="width: 10%">
                            <span v-if="index == 0">{{ day }}</span>
                        </td>
                        <td class="border-e" align="center" style="width: 15%">
                            <div class="d-flex justify-center align-center">
                                <TimePicker v-model="
                                    //@ts-ignore
                                    form.schedule[day][index].start" single-line class="mt-5" variant="outlined"
                                    color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar">
                                </TimePicker>
                            </div>
                        </td>
                        <td class="border-e" align="center" style="width: 15%">
                            <div class="d-flex justify-center align-center">
                                <TimePicker v-model="
                                    //@ts-ignore
                                    form.schedule[day][index].end" single-line class="mt-5" variant="outlined"
                                    color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar">
                                </TimePicker>
                            </div>
                        </td>
                        <td class="border-e" align="center" style="width: 15%">
                            <div class="d-flex justify-center align-center">
                                <TimePicker v-model="
                                    //@ts-ignore
                                    form.schedule[day][index].tardy_start" single-line class="mt-5" variant="outlined"
                                    color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar">
                                </TimePicker>
                            </div>
                        </td>
                        <td class="border-e" align="center" style="width: 15%">
                            <div class="d-flex justify-center align-center">
                                <TimePicker v-model="
                                    //@ts-ignore
                                    form.schedule[day][index].absent_start" single-line class="mt-5" variant="outlined"
                                    color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar">
                                </TimePicker>
                            </div>
                        </td>
                        <td class="border-e" align="center" style="width: 15%">
                            <div class="d-flex justify-center align-center">
                                <TimePicker v-model="
                                    //@ts-ignore
                                    form.schedule[day][index].early_dismiss" single-line class="mt-5" variant="outlined"
                                    color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar">
                                </TimePicker>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </v-table>
    </div>
</template>

<script setup lang="ts">
import type { ChangeScheduleForm } from '~/types/online-application';

const props = defineProps<{ form: ChangeScheduleForm, selectedDay: string, serverSide: boolean }>();
const emits = defineEmits(['update:form', 'paste', 'copy', 'refresh', 'remove', 'add'])

const {data} = await useApiFetch('/employee-schedule/' + props.form.employee_id, {
    method: "GET",
    immediate: props.serverSide,
    query: {
        date: props.form.date && !(props.form.date_from || props.form.date_to) ? new Date(props.form.date).toISOString() : "",
        date_from: props.form.date_from ? new Date(props.form.date_from).toISOString() : "",
        date_to: props.form.date_to ? new Date(props.form.date_to).toISOString() : "",
    },
    onResponse(event){
        if(event.response.status == 200){
            props.form.schedule = useGroupSchedulesByDay(event.response._data.data);
        }
    }
})
</script>
