import type { ScheduleDay } from "~/types/attendance";
import type { ChangeScheduleApplication } from "~/types/online-application"


export default function (change_schedule_application: ChangeScheduleApplication | null) {
    const form = reactive({
        employee_id: change_schedule_application?.employee_id ?? null,
        date: change_schedule_application?.date ?? "",
        date_from: change_schedule_application?.date_from ?? "",
        date_to: change_schedule_application?.date_to ?? "",
        type: change_schedule_application?.type ?? "permanent",
        reason: change_schedule_application?.reason ?? "",
        allow_approver: change_schedule_application?.allow_approver ?? false,
        schedule: {} as Record<string, ScheduleDay[]>,
    });

    const selectedDay = ref("");

    function clear() {
        form.employee_id = null;
        form.date = "";
        form.date_from = "";
        form.date_to = "";
        form.type = "permanent";
        form.reason = "";
        form.allow_approver = false;

        initializeChangeSchedule()
    }

    function addScheduleRow(day: string) {
        form.schedule[day]?.push({
            start: null,
            end: null,
            day: day,
            tardy_start: null,
            absent_start: null,
            early_dismiss: null,
            date_effective: null
        })
    }

    function removeScheduleRow(day: string, index: number) {
        form.schedule[day]?.splice(index, 1);
    }

    function pasteRow(day: string) {
        if (selectedDay.value) {
            form.schedule[day] = Object.assign([], form.schedule[selectedDay.value])
        }
    }

    function refreshRow(day: string, index: number) {
        // @ts-ignore
        form.schedule[day][index] = {
            start: null,
            end: null,
            day: day,
            tardy_start: null,
            absent_start: null,
            early_dismiss: null,
            date_effective: null
        }
    }

    function initializeChangeSchedule() {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        for (const day of days) {
            let items = [
                {
                    start: null,
                    end: null,
                    day,
                    tardy_start: null,
                    absent_start: null,
                    early_dismiss: null,
                    date_effective: null
                }
            ];

            if (change_schedule_application?.items?.length) {
                items = []
            }

            form.schedule[day] = items;
        }


        if (change_schedule_application?.items?.length) {
            for (const item of change_schedule_application.items) {
                if (item.day && form.schedule[item.day]) {
                    //@ts-ignore
                    form.schedule[item.day].push({
                        start: item.start ?? null,
                        end: item.end ?? null,
                        day: item.day,
                        tardy_start: item.tardy_start ?? null,
                        absent_start: item.absent_start ?? null,
                        early_dismiss: item.early_dismiss ?? null,
                        date_effective: item.date_effective ?? null
                    })
                }
            }
        }
    }

    const displayTableId = computed(() => {
        if (form.date && form.employee_id) {
            return form.date + form.employee_id
        } else if (form.date_from && form.date_to && form.employee_id) {
            return form.date_from + form.date_to + form.employee_id
        }
        return ""
    })


    initializeChangeSchedule()

    return {
        form, displayTableId, selectedDay,
        addScheduleRow, removeScheduleRow, refreshRow, pasteRow, clear
    };
}
