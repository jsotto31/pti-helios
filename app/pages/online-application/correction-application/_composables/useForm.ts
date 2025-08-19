import type { Timesheet, TimesheetForm } from "~/types/attendance";
import type { CorrectionApplication, CorrectionApplicationItem, ObRequest } from "~/types/online-application";

export default function(correction_application: CorrectionApplication | null) {
    const form = reactive({
        employee_id: correction_application?.employee_id || null,
        date: correction_application?.date ? new Date(correction_application.date) : null,
        reason: correction_application?.reason || null,
        allow_approver: correction_application?.allow_approver || false,
        items: (correction_application?.items || []) as CorrectionApplicationItem[]
    });

    function clear() {
        form.employee_id = null;
        form.date = null;
        form.reason = null;
        form.allow_approver = false;
    }

    return { form, clear };
}
