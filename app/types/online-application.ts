export interface LeaveRequest {
  id: number
  employee_id: number        // foreign key
  created_by: number         // foreign key
  date_from: string          // ISO date string (e.g. "2025-08-17")
  date_to: string            // ISO date string
  number_of_days: number
  type: string
  reason: string
  allow_approver: boolean
  with_pay: boolean
  created_at: string         // timestamp
  updated_at: string         // timestamp
}

export interface ObRequest {
    id: number
    employee_id: number | string;   // match your DB type (string if storing codes like 'EMP-...')
    created_by: number | string;    // same as above
    date_from: string;              // ISO date string e.g. "2025-08-17"
    date_to: string;                // ISO date string
    time_from: string;              // "HH:mm:ss" format
    time_to: string;                // "HH:mm:ss" format
    type: string;
    reason: string;
    allow_approver: boolean;
    status: "pending" | "approved" | "disapproved" | 'cancelled'; // enum-like
}

type CorrectionApplicationStatus = "pending" | "approved" | "rejected";
type CorrectionItemStatus = "NEW" | "APPROVED" | "REJECTED";

export interface CorrectionApplicationItem {
  actual_log_in: string;   // "HH:mm"
  actual_log_out: string;  // "HH:mm"
  request_log_in: string;  // "HH:mm"
  request_log_out: string; // "HH:mm"
  status: CorrectionItemStatus;
}

export interface CorrectionApplication {
  id: number;
  employee_id: string;
  date: string;  // "YYYY-MM-DD"
  reason?: string | null;
  allow_approver: boolean;
  status: CorrectionApplicationStatus;
  items: CorrectionApplicationItem[];
}