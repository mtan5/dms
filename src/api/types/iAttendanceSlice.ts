import { iAttendanceLog } from "./iAttendanceLog";
import { iChild } from "./iChild";

export interface iAttendanceSlice{
    searchAttendanceLog: string;    
    selectedChild: iChild;
    attendanceLog: iAttendanceLog;
}