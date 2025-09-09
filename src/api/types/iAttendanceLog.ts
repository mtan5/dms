export interface iAttendanceLog {
    child_id: number;
    attendance_id: number; 
    attendance_date: string; 
    attendance_time_in: string;
    attendance_time_out: string; 
    attendance_remarks: string;
    attendance_last_modified: string;
    attendance_loggedby_userid: number; 
}