import { createSlice } from "@reduxjs/toolkit";
import { iAttendanceSlice } from "../../api/types/iAttendanceSlice";
import { iAttendanceLog } from "../../api/types/iAttendanceLog";

interface actionStrProps {
    type: string;
    payload: string;
}

interface actionIntProps {
  type: string;
  payload: number;
}

interface actionAttendanceLogProps {
  type: string;
  payload: iAttendanceLog;
}


const attendanceSlice = createSlice({
    name: "attendanceSlice",
    initialState: {
      searchAttendanceLog: "", 
      selectedChild: {
        child_id: -1,
        child_first_name: "",
        child_last_name: ""
      }, 
      attendanceLog:{
        child_id: -1,
        attendance_date: "",
        attendance_time_in: "",
        attendance_time_out: "",
        attendance_remarks: ""
      }
    } as iAttendanceSlice,
    reducers: {
      setSearchAttendanceLog(localState, action: actionStrProps) {        
        localState.searchAttendanceLog = action.payload;
      },    
      setAttendanceLogDate(localState, action: actionStrProps) {        
        localState.attendanceLog.attendance_date = action.payload;
      },
      setSelectedChildFirstName(localState, action: actionStrProps) {        
        localState.selectedChild.child_first_name = action.payload;
      },
      setSelectedChildLastName(localState, action: actionStrProps) {        
        localState.selectedChild.child_last_name = action.payload;
      },
      setSelectedChildId(localState, action: actionIntProps) {        
        localState.selectedChild.child_id = action.payload;        
      },            
      setAttendanceTimeIn(localState, action: actionStrProps) {        
        localState.attendanceLog.attendance_time_in = action.payload;
      },
      setAttendanceTimeOut(localState, action: actionStrProps) {        
        localState.attendanceLog.attendance_time_out = action.payload;
      },
      setAttendanceRemarks(localState, action: actionStrProps) {        
        localState.attendanceLog.attendance_remarks = action.payload;
      }, 
      setAttendanceLoggedByUserId(localState, action: actionIntProps) {        
        localState.attendanceLog.attendance_loggedby_userid = action.payload;
      }, 
      setAttendanceChildId(localState, action: actionIntProps) {        
        localState.attendanceLog.child_id = action.payload;
      }, 
      setAttendanceLog(localState, action: actionAttendanceLogProps) {        
        localState.attendanceLog = {...action.payload};
      },                             
    }
  });

const attendanceSliceReducer = attendanceSlice.reducer;
export const {
  setAttendanceLog, 
  setAttendanceChildId, 
  setAttendanceLoggedByUserId, 
  setSearchAttendanceLog, 
  setAttendanceLogDate, 
  setSelectedChildFirstName, 
  setSelectedChildLastName, 
  setSelectedChildId, 
  setAttendanceTimeIn, 
  setAttendanceTimeOut, 
  setAttendanceRemarks}= attendanceSlice.actions;
export {attendanceSliceReducer}