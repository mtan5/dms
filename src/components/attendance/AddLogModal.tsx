import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import Modal from "../Modal";
import { IRootState, setAttendanceRemarks, setAttendanceTimeIn, setAttendanceTimeOut } from "../../store";
import { iAttendanceSlice } from "../../api/types/iAttendanceSlice";
import Input from "../Input";

interface AddLogModalProps{
    modalCloseHandler: Function;
    submitNewAttendanceLogForm:Function;
}

const AddLogModal = ({modalCloseHandler, submitNewAttendanceLogForm}: AddLogModalProps) => {
    const dispatch = useDispatch();
    const actionBar = (
        <div className="flex items-center justify-between">
            <Button className="m-1" success rounded onClick={submitNewAttendanceLogForm}>Submit</Button>
            <Button className="m-1" primary rounded onClick={() => modalCloseHandler('')}>Close</Button>        
        </div>
    );   
    const {attendanceLog, selectedChild} = useSelector<IRootState, iAttendanceSlice>((state) => {return state.attendance;});     
    const onTimeInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setAttendanceTimeIn(event.target.value));
    }
    const onTimeOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setAttendanceTimeOut(event.target.value));
    }  
    const onRemarksChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setAttendanceRemarks(event.target.value));
    }        
    const LogFormModal = (
        <Modal onChange={modalCloseHandler} actionBar={actionBar} small>
            <h3 className="font-bold text-lg">Add Attendance Log</h3>
            <div className="m-1 mt-2"><span className="font-bold">Child: </span>{`${selectedChild.child_first_name} ${selectedChild.child_last_name}`}</div>
            <div className="grid grid-cols-2">
                <div>
                    <div className="grid grid-cols-2">
                        <div className="font-bold text-end">Log Date:</div>
                        <div className="ps-4">{attendanceLog.attendance_date}</div>
                    </div>
                    <div className="grid grid-cols-2 mt-2">
                        <div className="font-bold text-end">Log in:</div>
                        <div className="ps-4"><Input type="time" value={attendanceLog.attendance_time_in} onChange={onTimeInChange}/></div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="font-bold text-end">Log out:</div>
                        <div className="ps-4"><Input type="time" value={attendanceLog.attendance_time_out} onChange={onTimeOutChange}/></div>
                    </div>                                
                </div>
                <div>
                    <div className="font-bold">Remarks:</div>
                    <textarea maxLength={255} className="border p-2" cols={36} rows={5} value={attendanceLog.attendance_remarks} onChange={onRemarksChange}></textarea>
                </div>
            </div>
        </Modal>);
    return LogFormModal;    
}

export {AddLogModal}