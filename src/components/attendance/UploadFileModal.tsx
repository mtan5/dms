import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import { IRootState, useUploadFileMutation } from "../../store";
import { iUserLogin } from "../../api/types/iUserLogin";
import { useSelector } from "react-redux";

interface ModalProps{
    modalCloseHandler: Function;
    submitFileForm:Function;
}

export default function UploadFileModal({modalCloseHandler, submitFileForm} : ModalProps) {
    const [isUploadLoading, setUploadLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [UploadFile] = useUploadFileMutation();
    const {user_id} = useSelector<IRootState, iUserLogin>((state) => {return state.userCredentials;});
    
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setSelectedFile(event.target.files[0]);        
    };

    const onFileUpload = () => {
        if(!selectedFile) {return;}
        const familyid=0;
        const attendance_categoryid=4;
        const fileType = selectedFile.type;
        const fileSize = selectedFile.size;
        const formData = new FormData();
        formData.append(
            "gdmsFile",
            selectedFile!,
            selectedFile?.name
        ); 

        if(fileType.toLowerCase() != "application/pdf" && fileType.toLowerCase()!="image/jpeg" && fileType.toLowerCase()!="image/png") {
            alert("The file you are trying to upload is not in PDF, JPEG or PNG format. This feature only accepts files in PDF format.");
            return;
        }

        if(fileSize > 15000000) {
            alert("The file you are trying to upload is beyond the file size limit of 15MB.");
            return;
        }        
        setUploadLoading(true);
        UploadFile({
            userid: user_id, 
            familyid: familyid,
            ctgryid: attendance_categoryid, 
            formdata: formData})
        .unwrap()
        .then(() => {
            setUploadLoading(false);
            submitFileForm();
        })
        .catch((error) => {
            alert("Something went wrong in puoading your file, please check console logs.");
            console.error('rejected', error);
        });                            
    }

    const actionBar = (
        <div className="flex items-center justify-between">
            <Button className="m-1" success rounded onClick={onFileUpload} loading={isUploadLoading}>Upload</Button>
            <Button className="m-1" primary rounded onClick={() => modalCloseHandler('')}>Close</Button>        
        </div>
    ); 
    
    const LogFormModal = (
        <Modal onChange={modalCloseHandler} actionBar={actionBar} xsmall>
            <h3 className="font-bold text-lg">Upload File</h3>    
            <div className="flex items-center justify-between mt-3">
                <Input type="file" onChange={onFileChange} />
            </div>
            <div className="text-[10px] mt-2 text-red-600 font-bold">* File should be in PDF, JPG, JPEG or PNG format and should not exceed 15MB file size.</div>
            <div className="text-xs mt-2"><b>File Name:</b> {selectedFile?.name}</div>    
            <div className="text-xs"><b>File Type:</b> {selectedFile?.type}</div>
        </Modal>);
    return LogFormModal;  
}