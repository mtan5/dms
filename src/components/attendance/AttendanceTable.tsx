import { iAttendance } from "../../api/types/iAttendance";
import { addDateOutString, convertMilitaryToStandard} from "../../hooks/utilityHooks";
import Table from "../../components/Table";
import { iAttendanceLog } from "../../api/types/iAttendanceLog";
import Button from "../../components/Button";
import { iChild } from "../../api/types/iChild";

interface iAttendanceTableProps {
    attendanceData:iAttendance[];
    date_end:string;
    date_start:string;
    onAddLogHandler:Function;
    onEditLogHandler:Function;
}

const AttendanceTable = ({attendanceData, date_end, date_start, onAddLogHandler, onEditLogHandler}:iAttendanceTableProps) => {    
    let attendanceTableConfig = [
        {
            label:'Name',  
            render: (item:iAttendance) => <span>{`${item.child_first_name} ${item.child_last_name}`}</span>
        }         
    ];

    const parseAttendanceLog = (attendance: iAttendance, inputdate: string) => {
        let childLogEntry : iAttendanceLog[] = [];
        const clickedChild = {
            child_id: attendance.child_id,
            child_first_name: attendance.child_first_name,
            child_last_name: attendance.child_last_name,
            child_birth_date: "",
            is_active: false,
            family_id: -1         
        } as iChild;

        if(attendance.attendance_logs){
            for(let i=0; i<attendance.attendance_logs.length; i++){
                let log = attendance.attendance_logs[i];
                if(log.attendance_date === inputdate){
                    childLogEntry.push(log);
                }                
            }            
            if(childLogEntry.length > 1){                
                return <span>Multiple Entry Err</span>
            }
            else if (!childLogEntry || childLogEntry.length <=0){                
                return <div className="flex items-stretch justify-between"><Button onClick={() => onAddLogHandler(inputdate, clickedChild)}>Add</Button></div>;
            }
            else{         
                return (
                <div className="flex items-stretch justify-between">
                    <div className="p-1 m-auto border">{convertMilitaryToStandard(childLogEntry[0].attendance_time_in)}</div>
                    <div className="p-1 m-auto border">{convertMilitaryToStandard(childLogEntry[0].attendance_time_out)}</div>
                    <div className="p-1 m-auto"><Button onClick={() => onEditLogHandler(inputdate, clickedChild, childLogEntry[0])}>Edit</Button></div>
                </div>);                
            }              
        } 
        return <span>No Data</span>;           
    }

    while(new Date(date_end) >= new Date(date_start)){  
        let log_date = date_start;
        attendanceTableConfig.push(
            {
                label:date_start,  
                render: (item:iAttendance) => parseAttendanceLog(item, log_date)
            }            
        );
        date_start = addDateOutString(date_start, "-", 1); 
    }

    return(
    <div>        
        <Table data={attendanceData} config={attendanceTableConfig}/>
    </div>);    
}

export {AttendanceTable};