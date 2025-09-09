
interface RecordLabelValueProps{
    label:string;
    value?:string;
    children?: React.ReactNode;
}

export function RecordLabelValue({label, value, children}: RecordLabelValueProps){    
    return(
    <div className="grid grid-cols-5 gap-2 mt-2">
        <div className="font-bold col-span-2 text-end">{label}</div>
        <div className="col-span-3">
            {value}
            <div>{children}</div>
        </div>
    </div>        
    );

}