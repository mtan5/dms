import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, setNavPage, setSearchAttendanceLog,useAddAttendanceLogMutation, useDeleteAttendanceByIdMutation, useFetchAllChildAttendanceQuery, useUpdateAttendanceLogMutation } from "../../store";
import { AttendanceTable } from "../../components/attendance/AttendanceTable";
import { iAttendance } from "../../api/types/iAttendance";
import Skeleton from "../../components/Skeleton";
import { addStrCurrDateOnly, formatDate } from "../../hooks/utilityHooks";
import { InputDatePicker } from "../../components/InputDatePicker";
import Input from "../../components/Input";
import { iAttendanceSlice } from "../../api/types/iAttendanceSlice";
import { AddLogModal } from "../../components/attendance/AddLogModal";
import { clearAddLogForm, setAttendanceLogModal, setAttendanceModalInfo, validateAttendanceLogForm } from "../../hooks/attendanceFormHooks";
import { iChild } from "../../api/types/iChild";
import { iUserLogin } from "../../api/types/iUserLogin";
import { EditModalLog } from "../../components/attendance/EditLog.Modal";
import { iAttendanceLog } from "../../api/types/iAttendanceLog";

export default function AttendancePage(){
    const dispatch = useDispatch();
    useEffect(() => {dispatch(setNavPage("attendance"));});
    let [date_start, setDateStart] = useState(formatDate(new Date()));
    let [date_end, setDateEnd] = useState(addStrCurrDateOnly(date_start, '-', 6));
    const {user_id} = useSelector<IRootState, iUserLogin>((state) => {return state.userCredentials;});    
    let {data, error, isFetching}  = useFetchAllChildAttendanceQuery({dfrm: date_start, dto: date_end, userid: user_id});

    const {attendanceLog, selectedChild} = useSelector<IRootState, iAttendanceSlice>((state) => {
        let search = state.attendance.searchAttendanceLog;        
        if(search === undefined || search === '') return state.attendance;        
        data = data?.filter((log) => {        
            return log.child_first_name.toLowerCase().includes(search.toLowerCase());
        });           
        return state.attendance;
    });   

    //START MODAL
    const [isAddModalOpen, setAddModalVisibility] = useState(false);   
    const [isEditModalOpen, setEditModalVisibility] = useState(false);   
    const [addAttendanceLog] = useAddAttendanceLogMutation();
    const [editAttendanceLog] = useUpdateAttendanceLogMutation();
    const [deleteAttendanceLog] = useDeleteAttendanceByIdMutation();    
    const addLogModalButtonHandler = (logDate:string, child: iChild) => {
        setAddModalVisibility(!isAddModalOpen);        
        setAttendanceModalInfo(logDate, child, user_id);
    };
    const editLogModalButtonHandler = (logDate:string, child: iChild, attendance: iAttendanceLog) => {
        setEditModalVisibility(!isEditModalOpen);
        setAttendanceModalInfo(logDate, child, user_id);
        setAttendanceLogModal(attendance, child.child_id);
    };  
    const onSubmitNewLog = () => {
        const error = validateAttendanceLogForm(selectedChild.child_id, user_id, attendanceLog.attendance_time_in, attendanceLog.attendance_date);
        if(error){
            alert(error);
            return;
        }         
        addAttendanceLog(attendanceLog);
        clearAddLogForm();
        setAddModalVisibility(!isAddModalOpen);        
    }   
    const onSubmitLogChanges = () => {
        const error = validateAttendanceLogForm(selectedChild.child_id, user_id, attendanceLog.attendance_time_in, attendanceLog.attendance_date);
        if(error){
            alert(error);
            return;
        }
        editAttendanceLog(attendanceLog);
        clearAddLogForm();
        setEditModalVisibility(!isEditModalOpen);                
    }
    const onDeleteAttendance = () => {
        var ans = confirm("Are you sure you want to delete this attendance?");
        if(ans){
            deleteAttendanceLog(attendanceLog.attendance_id);
            clearAddLogForm();
            setEditModalVisibility(!isEditModalOpen);                            
        }
    }
    //END MODAL
    
    let content;    
    if(isFetching) { 
        content = (<div className="p-10">            
                <Skeleton times={4} className="h-10 w-full"/>
            </div>);
    }else if(error) { 
        console.log(error);
        content = <div>Error fetching album data: {}</div>
    }
    else{
        content = <AttendanceTable 
            attendanceData={data as iAttendance[]} 
            date_end={date_end} 
            date_start={date_start} 
            onAddLogHandler={addLogModalButtonHandler}
            onEditLogHandler={editLogModalButtonHandler}/>;
    }  
    
    const onDateStartChange = (dateValue:string) => {
        setDateStart(dateValue);
        setDateEnd(addStrCurrDateOnly(dateValue, '-', 6));
    }
    const onSearchLog = (event: React.ChangeEvent<HTMLInputElement>) => {    
        dispatch(setSearchAttendanceLog(event.target.value));
    }      

    return (
    <>
        <div className="grid grid-cols-4 m-4">
            <div className=""><h3 className="font-bold text-lg">Attendance Log</h3></div>
            <div className="flex">
                <span className="mt-2 me-2">Search:</span><Input type="text" onChange={onSearchLog}/>
            </div>
            <div className="flex col-span-2">
                <InputDatePicker label="Date Start" valueDate={date_start} onDateChange={onDateStartChange}/>
                <InputDatePicker label="Date End" valueDate={date_end} onDateChange={setDateEnd}/>                
            </div>  

        </div>
        {content}
        {isAddModalOpen && <AddLogModal modalCloseHandler={addLogModalButtonHandler} submitNewAttendanceLogForm={onSubmitNewLog}/>}      
        {isEditModalOpen && <EditModalLog modalCloseHandler={editLogModalButtonHandler} submitAttendanceLogForm={onSubmitLogChanges} deleteAttendance={onDeleteAttendance}/>}
    </>);
}