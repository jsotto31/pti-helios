<template>
    <div>
        <v-table class="rounded border mb-5">
            <thead class="bg-primary">
                <tr>
                    <th class="text-center pa-0 border"></th>
                    <th class="text-center pa-0 border">
                        Day of week
                    </th>
                    <th class="text-center pa-0 border">
                        From
                    </th>
                    <th class="text-center pa-0 border">
                        To
                    </th>
                    <th class="text-center pa-0 border">
                        Tardy Start
                    </th>
                    <th class="text-center pa-0 border">
                        Absent Start
                    </th>
                    <th class="text-center pa-0 border">
                        Early Dismissal
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="schedule_item, day in form.schedule" :key="generateRandomKey()">
                    <tr v-for="item, index in schedule_item" :key="generateRandomKey()">
                        <td class="border" align="center">
                            <div class="d-flex justify-center w-100" style="gap: 5px;width: 60px;">
                                <v-btn :active="selectedDay == day" @click="emits('copy', day)" :disabled="index != 0" variant="tonal" rounded size="small" icon="mdi-content-copy"></v-btn>
                                <v-btn @click="emits('paste', day)" :disabled="index != 0" variant="tonal" rounded size="small" icon="mdi-content-paste"></v-btn>
                                <v-btn @click="emits('refresh', day, index)"  variant="tonal" rounded size="small" icon="mdi-refresh"></v-btn>
                                <v-btn @click="emits('add', day)" v-if="index == 0" variant="tonal" rounded size="small" icon="mdi-plus"></v-btn>
                                <v-btn @click="emits('remove', day, index)"  v-else variant="tonal" rounded size="small" icon="mdi-trash-can-outline"></v-btn>
                            </div>
                        </td>
                        <td class="border text-capitalize" align="center" style="width: 10%">
                            <span v-if="index == 0">{{ day }}</span>
                        </td>
                        <td class="border" align="center" style="width: 15%">
                            <div class="d-flex justify-center align-center">
                                <TimePicker v-model="
                                    //@ts-ignore
                                    form.schedule[day][index].start" single-line class="mt-5" variant="outlined"
                                    color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar">
                                </TimePicker>
                            </div>
                        </td>
                        <td class="border" align="center" style="width: 15%">
                            <div class="d-flex justify-center align-center">
                                <TimePicker v-model="
                                    //@ts-ignore
                                    form.schedule[day][index].end" single-line class="mt-5" variant="outlined"
                                    color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar">
                                </TimePicker>
                            </div>
                        </td>
                        <td class="border" align="center" style="width: 15%">
                            <div class="d-flex justify-center align-center">
                                <TimePicker v-model="
                                    //@ts-ignore
                                    form.schedule[day][index].tardy_start" single-line class="mt-5" variant="outlined"
                                    color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar">
                                </TimePicker>
                            </div>
                        </td>
                        <td class="border" align="center" style="width: 15%">
                            <div class="d-flex justify-center align-center">
                                <TimePicker v-model="
                                    //@ts-ignore
                                    form.schedule[day][index].absent_start" single-line class="mt-5" variant="outlined"
                                    color="primary" density="compact" prepend-icon="" prepend-inner-icon="mdi-calendar">
                                </TimePicker>
                            </div>
                        </td>
                        <td class="border" align="center" style="width: 15%">
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
