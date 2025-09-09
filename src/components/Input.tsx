interface InputtProps{    
    value?: string;
    type?: string;
    [x:string]: any;
  }

function Input({value, type, ...otherAttributes}: InputtProps){
    return (<input {...otherAttributes} value={value} type={type} className="flex w-full border rounded border-slate-300 p-1 m-1"/>);
}

export default Input;