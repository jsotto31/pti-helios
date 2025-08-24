export interface Timesheet {
  id: number;
  employee_id: string;      // FK or unique employee code
  work_date: string;        // ISO date string: "2025-08-18"
  time_in?: string | null;  // "HH:mm:ss" or null
  time_out?: string | null; // "HH:mm:ss" or null
  status?: string;          // string
  created_at?: string;       // timestamp
  updated_at?: string;       // timestamp
}


export interface TimesheetForm {
  work_date: string;
  actual_time_in: string | null;
  actual_time_out: string | null;
  requested_time_in: string | null;
  requested_time_out: string | null;
  status: string;
}

export type ScheduleDay = {
  start: string | null;
  end: string | null;
  day: string;
  tardy_start: string | null;
  absent_start: string | null;
  early_dismiss: string | null;
  date_effective: string | null;
};

export type ScheduleGrouped = Record<string, ScheduleDay[]>