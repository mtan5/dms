import { iAttendanceLog } from "./iAttendanceLog";

export interface iAttendance {
    child_id: number;
    family_id: number;
    child_first_name: string;
    child_last_name: string;
    attendance_logs: iAttendanceLog[];
}