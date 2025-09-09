import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../Input";
import { IRootState, setAttendanceRemarks, setAttendanceTimeIn, setAttendanceTimeOut } from "../../store";
import { iAttendanceSlice } from "../../api/types/iAttendanceSlice";

interface EditLogModalProps{
    modalCloseHandler: Function;
    submitAttendanceLogForm:Function;
    deleteAttendance:Function;
}

const EditModalLog = ({modalCloseHandler, submitAttendanceLogForm, deleteAttendance}: EditLogModalProps) => {
    const dispatch = useDispatch();
    const {attendanceLog, selectedChild} = useSelector<IRootState, iAttendanceSlice>((state) => {return state.attendance;});     
    const actionBar = (
        <div className="flex items-center justify-between">
            <Button className="m-1" danger rounded onClick={deleteAttendance}>Delete</Button>
            <Button className="m-1" success rounded onClick={submitAttendanceLogForm}>Submit</Button>
            <Button className="m-1" primary rounded onClick={() => modalCloseHandler('', {}, {})}>Close</Button>
        </div>
    );  
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
            <h3 className="font-bold text-lg">Edit Attendance Log</h3>
            <hr />
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
                    <textarea className="border p-2" cols={36} rows={5} value={attendanceLog.attendance_remarks} onChange={onRemarksChange}></textarea>
                </div>
            </div>
        </Modal>);
        return LogFormModal; 
}

export {EditModalLog}
