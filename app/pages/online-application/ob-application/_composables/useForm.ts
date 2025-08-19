import type { ObRequest } from "~/types/online-application";

export default function(ob_application: ObRequest | null) {
    const form = reactive({
        employee_id: ob_application?.employee_id ?? null,
        date_from: ob_application?.date_from ?? "",
        date_to: ob_application?.date_to ?? "",
        time_from: ob_application?.time_from ?? "",
        time_to: ob_application?.time_to ?? "",
        type: ob_application?.type ?? null,
        reason: ob_application?.reason ?? "",
        allow_approver: ob_application?.allow_approver ?? false,
    });

    function clear() {
        form.employee_id = null;
        form.date_from = "";
        form.date_to = "";
        form.time_from = "";
        form.time_to = "";
        form.type = null;
        form.reason = "";
        form.allow_approver = false;
    }

    return { form, clear };
}
