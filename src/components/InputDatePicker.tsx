import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDaystoDate, formatDate } from "../hooks/utilityHooks";

interface datePickerProps{
    label:string;
    valueDate:string; 
    onDateChange:Function;
}

const InputDatePicker = ({label, valueDate, onDateChange}: datePickerProps) => {

    return (
    <div className="mt-1 grid grid-cols-6">
        <div className="col-span-2 text-end mt-1">{label}:</div>
        <div className="ml-2 col-span-4">
            <DatePicker 
                className="border-2 rounded-md p-1 hover:cursor-pointer" 
                selected={addDaystoDate(valueDate, 1)} 
                onChange={(date) => {   
                        let inputDate = formatDate(date as Date);
                        onDateChange(inputDate);
                    }
                }
                value={valueDate}
                />
        </div>
    </div>
    );
}

export {InputDatePicker}