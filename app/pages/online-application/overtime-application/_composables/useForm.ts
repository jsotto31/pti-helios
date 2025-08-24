import type { OvertimeApplication } from "~/types/online-application";

export default function(overtime_applicationn: OvertimeApplication | null) {
    const form = reactive({
        employee_id: overtime_applicationn?.employee_id ?? null,
        date: overtime_applicationn?.date ?? "",
        time_from: overtime_applicationn?.time_from ?? "",
        time_to: overtime_applicationn?.time_to ?? "",
        reason: overtime_applicationn?.reason ?? "",
        duration: overtime_applicationn?.duration ?? "",
        allow_approver: overtime_applicationn?.allow_approver ?? false,
    });

    function clear() {
        form.employee_id = null;
        form.date = "";
        form.time_from = "";
        form.time_to = "";
        form.reason = "";
        form.duration = "";
        form.allow_approver = false;
    }

    watch(() => [form.time_from, form.time_to], () => {
        form.duration = useComputeDuration(form.time_from, form.time_to)
    })

    return { form, clear };
}
