import Input from "../../Input";

interface NewInputProps{
    label:string;
    value:string;  
    onChange:Function;
    inputType?:string;
    inputMaxLength: number;
}

export function NewInputClientRecord({label, value, onChange, inputType="text", inputMaxLength}: NewInputProps){
    return (
        <>
            <div className="grid grid-cols-6 gap-1">
                <div className="col-span-2 text-end text-sm">{label}:</div>
                <div className="col-span-4"><Input maxLength={inputMaxLength} type={inputType} value={value} onChange={onChange}/></div>
            </div>          
        </>
    );
}