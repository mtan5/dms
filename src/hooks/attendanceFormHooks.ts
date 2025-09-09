import { iAttendanceLog } from "../api/types/iAttendanceLog";
import { iChild } from "../api/types/iChild";
import { setAttendanceChildId, setAttendanceLog, setAttendanceLogDate, setAttendanceLoggedByUserId, setAttendanceRemarks, setAttendanceTimeIn, setAttendanceTimeOut, setSelectedChildFirstName, setSelectedChildId, setSelectedChildLastName, store } from "../store";

const clearAddLogForm = () => {
    store.dispatch(setAttendanceRemarks(''));
    store.dispatch(setAttendanceTimeIn(''));
    store.dispatch(setAttendanceTimeOut(''));
    store.dispatch(setAttendanceLogDate(''));
    store.dispatch(setAttendanceLoggedByUserId(-1));
    store.dispatch(setAttendanceChildId(-1));
}

const validateAttendanceLogForm = (child_id: number, user_id: number, time_in:string, attendance_date : string) => {
    let err = '';
    if(child_id <= -1){err = `No Child was selected! Please try again later`;}
    if(user_id <= -1){err = `User not identified, please login again!`;}
    if(!time_in){err = `Please provide a time in for the attendance for ${attendance_date}!`;}
    return err;
}

const setAttendanceModalInfo = (log_date:string, child: iChild, user_id:number) => {
    store.dispatch(setAttendanceLoggedByUserId(user_id));
    if(log_date){store.dispatch(setAttendanceLogDate(log_date));}
    if(child){
        store.dispatch(setSelectedChildId(child.child_id));
        store.dispatch(setSelectedChildFirstName(child.child_first_name));
        store.dispatch(setSelectedChildLastName(child.child_last_name));  
        store.dispatch(setAttendanceChildId(child.child_id));      
    }
}

const setAttendanceLogModal=(attendance: iAttendanceLog, child_id:number)=>{
    if(attendance){
        let updatedAttendance = {} as iAttendanceLog;
        updatedAttendance = {...attendance};
        updatedAttendance.child_id = child_id;
        if(attendance.attendance_time_out === '00:00:00'){
            updatedAttendance.attendance_time_out = "";
        }
        if(attendance.attendance_time_in === '00:00:00'){
            updatedAttendance.attendance_time_in = "";
        }
        store.dispatch(setAttendanceLog(updatedAttendance));
    }
}

export {clearAddLogForm, validateAttendanceLogForm, setAttendanceModalInfo, setAttendanceLogModal}