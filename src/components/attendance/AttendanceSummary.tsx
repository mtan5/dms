import { useState } from "react";
import Panel from "../Panel";
import Dropdown from "../Dropdown";
import Table from "../Table";
import { iAttendanceMonthly } from "../../api/types/iAttendanceMonthly";
import Input from "../Input";
import { IRootState, useAddAttendanceMonthlyLogMutation, useUpdateAttendanceMonthlyLogMutation } from "../../store";
import { iUserLogin } from "../../api/types/iUserLogin";
import { getUserCredentialCookie } from "../../hooks/coookieHooks";
import { iChildSlice } from "../../api/types/iChldSlice";
import { useSelector } from "react-redux";

interface monthItem{id:number; name:string;}
interface attendanceSummaryProps{
    monthList: monthItem[];
    initYear:number;
    yearOptions:{text:string, value:string}[];
    attendanceData: iAttendanceMonthly[];
}

export function AttendanceSummary({monthList, initYear, yearOptions, attendanceData}: attendanceSummaryProps){  
    let userCookie:iUserLogin = getUserCredentialCookie();         
    let user_id = userCookie.user_id;    
    const [stateAttendanceLog, setStateAttendanceLog] = useState({} as iAttendanceMonthly);
    const [addAttendanceMonthlyLog] = useAddAttendanceMonthlyLogMutation();
    const [updateAttendanceMonthlyLog] = useUpdateAttendanceMonthlyLogMutation();
    const {selectedChild} = useSelector<IRootState, iChildSlice>((state) => {return state.child;}); 
    const [attendanceYear, setAttendanceYear] = useState({text:initYear.toString(), value:initYear.toString()});
    const onYearClick = (optionItem : {text:string, value:string}) =>{
        setAttendanceYear(optionItem);
    };      

    const SaveLoggedHours = () => {
        if(stateAttendanceLog.attendance_monthly_id > 0){            
            updateAttendanceMonthlyLog(stateAttendanceLog);
        }
    }

    const AddLoggedHours = () =>{
        if(stateAttendanceLog.attendance_monthly_id <= 0){  
            addAttendanceMonthlyLog(stateAttendanceLog);
        }        
    }

    const onChangeLogHours = (newHours: number, log: iAttendanceMonthly) => {
        setStateAttendanceLog({
            attendance_monthly_id: log.attendance_monthly_id,
            attendance_monthly_logmonth : log.attendance_monthly_logmonth,
            attendance_monthly_logyear : parseInt(attendanceYear.value), 
            attendance_monthly_remarks : log.attendance_monthly_remarks,
            attendance_monthly_last_modified : log.attendance_monthly_last_modified,
            attendance_monthly_hrs : newHours,
            user_id : log.user_id,
            child_id : log.child_id
        } as iAttendanceMonthly);
    }

    const onChangeLogRemarks = (inputRemarks: string, log: iAttendanceMonthly) => {
        setStateAttendanceLog({
            attendance_monthly_id: log.attendance_monthly_id,
            attendance_monthly_logmonth : log.attendance_monthly_logmonth,
            attendance_monthly_logyear : log.attendance_monthly_logyear, 
            attendance_monthly_remarks : inputRemarks,
            attendance_monthly_last_modified : log.attendance_monthly_last_modified,
            attendance_monthly_hrs : log.attendance_monthly_hrs,
            user_id : log.user_id,
            child_id : log.child_id
        } as iAttendanceMonthly);        
    }

    const onRemarksFocusOut = () => {
        if(stateAttendanceLog && stateAttendanceLog.attendance_monthly_remarks){
            SaveLoggedHours();
            setStateAttendanceLog({} as iAttendanceMonthly);
        }
    }

    const onLogHoursFocusOut = () => {        
        if(stateAttendanceLog.attendance_monthly_id > 0){    
            SaveLoggedHours();
            setStateAttendanceLog({} as iAttendanceMonthly);
        }
        else if(stateAttendanceLog.attendance_monthly_hrs > 0){
            AddLoggedHours();
            setStateAttendanceLog({} as iAttendanceMonthly);
        }        
    }

    let attendanceTableConfig = [
        {label:'Month',  render: (record: iAttendanceMonthly) => {
            //console.log(record);
            return <span>{monthList.filter(x => x.id === record.attendance_monthly_logmonth)[0].name}</span>}         
        },
        {label:'Hours',  render: (record: iAttendanceMonthly) => {
            let displayHours = record.attendance_monthly_hrs;             
            let isRecordAndStateEqual = (
                stateAttendanceLog.attendance_monthly_id === record.attendance_monthly_id 
                || (stateAttendanceLog.attendance_monthly_logmonth === record.attendance_monthly_logmonth
                && stateAttendanceLog.attendance_monthly_hrs > 0)
            );
            if(isRecordAndStateEqual){ displayHours = stateAttendanceLog.attendance_monthly_hrs;}
            return <div className="w-20">
                <Input 
                    type="number" 
                    step="0.01"
                    min="0"
                    onBlur={onLogHoursFocusOut}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{onChangeLogHours(parseInt(event.target.value), record);}}
                    value={displayHours.toString()}
                />
            </div>;
        }
        },
        {label:'Remarks',  render: (record: iAttendanceMonthly) => {
                let displayRemarks = record.attendance_monthly_remarks;  
                let isRecordAndStateEqual = (
                    stateAttendanceLog.attendance_monthly_id === record.attendance_monthly_id 
                    || (stateAttendanceLog.attendance_monthly_logmonth === record.attendance_monthly_logmonth)
                );  
                if(isRecordAndStateEqual){ displayRemarks = stateAttendanceLog.attendance_monthly_remarks;}                            
                if(record.attendance_monthly_id>0){
                    return <div className="w-44">
                        <textarea className="border rounded-md" value={displayRemarks} 
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>{onChangeLogRemarks(event.target.value, record);}}
                            onBlur={onRemarksFocusOut}
                        />
                    </div>;
                }
                return <div className="w-44"></div>;
            }
        },
        {label:'Log Date',  render: (record: iAttendanceMonthly) => {
            let logged_date = record.attendance_monthly_last_modified
            if(!record){ return <span className="italic text-gray-500">No logged hours</span>;}
            let fomrattedDate = new Date(logged_date).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            return <span>{fomrattedDate}</span>
        }}
    ];    

    let attendanceTableRecords : iAttendanceMonthly[];    
    attendanceTableRecords = monthList.map((item) => {   
        let blank_record = {
            attendance_monthly_id: -1 * item.id,
            attendance_monthly_logmonth : item.id,
            attendance_monthly_logyear : parseInt(attendanceYear.value),  
            attendance_monthly_remarks : "",
            attendance_monthly_last_modified : "",
            attendance_monthly_hrs : 0,
            user_id : user_id,
            child_id : selectedChild.child_id           
        } as iAttendanceMonthly;
        if(attendanceData.length > 0){
            let filtered_record =  attendanceData.filter(x => x.attendance_monthly_logmonth === item.id && x.attendance_monthly_logyear.toString() ==attendanceYear.value)[0];           
            if(!filtered_record) {return blank_record;}
            return filtered_record;
        }                
        return blank_record;
    }); 

    return <div>
            <Panel className="mt-5 mb-5">
                <div className=''> 
                    <div className='flex items-center justify-between'>
                        <div>Attendance Log Records for <b>{`${selectedChild.child_first_name} ${selectedChild.child_last_name}`}</b></div>
                        <div><Dropdown options={yearOptions} onChange={onYearClick} value={attendanceYear} /></div>
                    </div>
                    <div>
                        <Table data={attendanceTableRecords} config={attendanceTableConfig}/>
                    </div>
                </div>
            </Panel>        
        </div>;
}