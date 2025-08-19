import type { Timesheet, TimesheetForm } from "~/types/attendance";


export default function (props: any) {
    const selected: Ref<number | null> = ref(null)
    const time_in: Ref<null | string> = ref(null)
    const time_out: Ref<null | string> = ref(null)
    const timesheets: Ref<TimesheetForm[]> = ref([])

    function removeTime(index: number) {
        if (timesheets.value[index]) {
            timesheets.value.splice(index, 1);
        }
    }

    function updateTime() {
        if (
            selected.value != null &&
            timesheets.value &&
            timesheets.value.length > 0
        ) {
            const sheet = timesheets.value[selected.value]
            if (sheet) {
                sheet.requested_time_in = time_in.value
                sheet.requested_time_out = time_out.value
                sheet.status = "EDIT"
            }
        } else {
            timesheets.value.push({
                work_date: props.form.date,
                actual_time_in: time_in.value,
                actual_time_out: time_out.value,
                requested_time_in: time_out.value,
                requested_time_out: time_out.value,
                status: 'NEW',
            })
        }

        selected.value = null;
        time_in.value = null;
        time_out.value = null;
    }

    watch(selected, function (currentValue) {
        if (currentValue != null && timesheets.value.length > 0) {
            time_in.value = timesheets.value[currentValue]?.actual_time_in || null;
            time_out.value = timesheets.value[currentValue]?.actual_time_out || null;
        }
    })

    return {selected, time_in, time_out, timesheets, removeTime, updateTime}
}