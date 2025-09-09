import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Panel from "../../components/Panel";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, setNavPage, setSearchChild, useFetchAttendanceMonthlyLogByChildIdQuery} from "../../store";
import { iChildSlice } from "../../api/types/iChldSlice";
import { iUserLogin } from "../../api/types/iUserLogin";
import UploadFileModal from "../../components/attendance/UploadFileModal";
import UploadedFile from "../../components/attendance/UploadedFile";
import { getUserCredentialCookie } from "../../hooks/coookieHooks";
import { ChildList } from "../../components/client/ChildList";
import { AttendanceSummary } from "../../components/attendance/AttendanceSummary";
import { iAttendanceMonthly } from "../../api/types/iAttendanceMonthly";

export default function AttendacneFile(){
    const dispatch = useDispatch();
    let userCookie:iUserLogin = getUserCredentialCookie();  
    let user_id = userCookie.user_id;      
    useEffect(() => {dispatch(setNavPage("attendance"));});        

    let thisYear = new Date().getFullYear();
    let initYear = thisYear;
    let yearOptions : {text:string, value:string}[] = [];        

    const {searchChild} = useSelector<IRootState, iChildSlice>((state) => {return state.child;});
    const {selectedChild} = useSelector<IRootState, iChildSlice>((state) => {return state.child;});     

    yearOptions.push({text:thisYear.toString(), value:thisYear.toString()});
    for(let counter = 0; counter < 4; counter++ ){
        thisYear = thisYear - 1;
        yearOptions.push({text:thisYear.toString(), value:thisYear.toString()});
    }    
    const monthList = [
        {id:1, name:"January"}
        ,{id:2, name:"February"}
        ,{id:3, name:"March"}
        ,{id:4, name:"April"}
        ,{id:5, name:"May"}
        ,{id:6, name:"June"}
        ,{id:7, name:"July"}
        ,{id:8, name:"August"}
        ,{id:9, name:"September"}
        ,{id:10, name:"October"}
        ,{id:11, name:"November"}
        ,{id:12, name:"December"}        
    ];    
            
    let attendanceData: iAttendanceMonthly[] = [];
    
    //START MODAL
    const [isUploadFileModalOpen, setUploadModalFileVisibility] = useState(false);  
    const uploadFileModalButtonHandler = () => {
        setUploadModalFileVisibility(!isUploadFileModalOpen);
    };
    const onSubmitFileUpload = () =>{
        uploadFileModalButtonHandler();
    }
    //END MODAL        
    
    let selectedChildId = -1
    if(selectedChild){selectedChildId = selectedChild.child_id}
    let {data}  = useFetchAttendanceMonthlyLogByChildIdQuery({logyear: initYear, childid: selectedChildId});    
    if(data){attendanceData = data as iAttendanceMonthly[];}
    
    const onSearchChild = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchChild(event.target.value));   
    } 

    let atendanceSummaryTable;
    if(selectedChild){        
        atendanceSummaryTable = <AttendanceSummary monthList={monthList} yearOptions={yearOptions} initYear={initYear} attendanceData = {attendanceData}/>;
    }

    return (
        <div className="grid grid-cols-5 gap-4 mt-5"> 
            <div className="col-span-2 mb-5">
                <Panel className="h-full">
                    <div className='flex items-center justify-between'>
                        <div>Attendance Monthly Log</div>
                        <div className="mb-2">
                            Search
                            {<Input type="text" value={searchChild} onChange={onSearchChild}/>}
                        </div>
                    </div>     
                    <hr className="m-2"/>
                    <ChildList user_id={user_id}/>
                    {atendanceSummaryTable}
                </Panel>               
            </div>
            <div className="col-span-3 mb-5">
                <UploadedFile 
                    uploadFileModalButtonHandler = {uploadFileModalButtonHandler} 
                    monthList = {monthList} 
                    initYear = {initYear} 
                    yearOptions={yearOptions}
                    user_id={user_id}/>
            </div>

            {isUploadFileModalOpen && <UploadFileModal modalCloseHandler={uploadFileModalButtonHandler} submitFileForm={onSubmitFileUpload}/>}     
        </div>        
    );
}