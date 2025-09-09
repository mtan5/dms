interface ClientErrorMessageDisplayProps{
    error:string
}
const ClientErrorMessageDisplay = ({error}: ClientErrorMessageDisplayProps) =>{
    return <span className="text-red-700 font-semibold text-xs justify-center"><br/>{error}</span>;
}

export {ClientErrorMessageDisplay};