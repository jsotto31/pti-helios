<template>
    <div>
        <v-table class="rounded border">
            <thead class="bg-primary">
                <tr>
                    <th class="text-center pa-0 border">
                        Actual Time
                    </th>
                    <th class="text-center pa-0 border">
                        Request Time
                    </th>
                    <th class="text-center pa-0 border">
                        Status
                    </th>
                    <th class="text-center pa-0 border">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-if="timesheets && timesheets.length > 0">
                    <tr v-for="timesheet, index in timesheets" :key="index">
                        <td class="border py-2" align="center">{{ useFormatTimeRange(timesheet.actual_time_in || null,
                            timesheet.actual_time_out || null) }}</td>
                        <td class="border py-2" align="center">{{ useFormatTimeRange(timesheet.requested_time_in ||
                            null,
                            timesheet.requested_time_out || null) }}</td>
                        <td class="border py-2" align="center">
                            {{ timesheet.status }}
                        </td>
                        <td class="border py-2">
                            <div class="d-flex w-100 justify-center" style="gap: 5px;">
                                <v-btn :disabled="selected == index" class="mb-2" @click="selected = index" rounded
                                    variant="tonal" size="small" color="primary" icon="mdi-pencil-outline"></v-btn>
                                <v-btn @click="removeTime(index)" class="mb-2" rounded variant="tonal" size="small"
                                    color="error" icon="mdi-trash-can-outline"></v-btn>
                            </div>
                        </td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="4" align="center">No Record</td>
                </tr>
            </tbody>
        </v-table>
        <div class="pa-0 d-flex mt-5 align-center" style="gap: 15px">
            <div class="w-100">
                <label for="date-from" class="font-weight-medium">Time From</label>
                <TimePicker class="mt-1" v-model="time_in" variant="outlined" color="primary" density="compact"
                    prepend-inner-icon="mdi-calendar">
                </TimePicker>
            </div>
            <div class="w-100">
                <label for="date-to" class="font-weight-medium">Time To</label>
                <TimePicker class="mt-1" v-model="time_out" variant="outlined" color="primary" density="compact"
                    prepend-inner-icon="mdi-calendar">
                </TimePicker>
            </div>
            <v-btn icon="mdi-content-save" size="small" class="mt-1" color="primary" rounded flat
                @click="updateTime"></v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Timesheet } from '~/types/attendance'
import useTimeRecordForm from '../_composables/useTimeRecordForm'
const props = defineProps(['form'])
const { timesheets, time_in, time_out, selected, updateTime, removeTime } = useTimeRecordForm(props)

const { data } = await useApiFetch('/timesheets/' + props.form.employee_id, {
    method: "GET",
    immediate: true,
    query: {
        date: props.form.date?.toISOString()
    },
    onResponse(event) {
        if (event.response._data && event.response._data.length > 0) {
            if(props.form.items.length > 0){
                timesheets.value = props.form.items;
            }else{
                timesheets.value = event.response._data.map((item: Timesheet) => ({ 
                    actual_time_in: item.time_in, actual_time_out: item.time_out, status: 'NEW', request_time_in: null, request_time_out: null,
                }));
                props.form.items = timesheets.value
            }
        }
    }
})

watch(timesheets, () => {
    props.form.items = timesheets.value
}, { deep: true })
</script>

<style lang="css" scoped></style>