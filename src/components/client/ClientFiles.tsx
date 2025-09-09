import { FaFileUpload } from "react-icons/fa";
import Button from "../Button";

export function ClientFiles(){
    return (
        <div className="text-gray-500 text-xl flex items-center justify-between mt-4 mb-8">
            <div>Files </div>
            <Button><FaFileUpload/></Button>
        </div>        
    );
}