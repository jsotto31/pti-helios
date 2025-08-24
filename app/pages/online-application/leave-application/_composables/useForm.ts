import type { LeaveRequest } from "~/types/online-application"


export default function(leave_application: LeaveRequest | null) {
    const form = reactive({
        employee_id: leave_application?.employee_id ?? null,
        date_from: leave_application?.date_from ?? "",
        date_to: leave_application?.date_to ?? "",
        number_of_days: leave_application?.number_of_days ?? 0,
        type: leave_application?.type ?? null,
        reason: leave_application?.reason ?? "",
        allow_approver: leave_application?.allow_approver ?? false,
        with_pay: leave_application?.with_pay ?? true
    });

    const dialog = ref(false)


    function clear() {
        form.employee_id = null;
        form.date_from = "";
        form.date_to = "";
        form.number_of_days = 0;
        form.type = null;
        form.reason = "";
        form.allow_approver = false;
        form.with_pay = true;
    }

    watch([() => form.date_from, () => form.date_to], ([from, to]) => {
        if (!from || !to) return form.number_of_days = 0;

        let start = new Date(from), end = new Date(to), days = 0;
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            if (![0, 6].includes(d.getDay())) days++;
        }
        form.number_of_days = days;
    });

    return { form, clear, dialog };
}
