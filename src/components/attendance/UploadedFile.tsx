import { FaFileUpload, FaWindowClose } from "react-icons/fa";
import Button from "../Button";
import Panel from "../Panel";
import { iFile } from "../../api/types/iFile";
import { Link } from "react-router-dom";
import { useDeleteFileMutation, useFetchUploadedFilesQuery } from "../../store";
import Dropdown from "../Dropdown";
import { useState } from "react";

interface UploadedFileProps{
    uploadFileModalButtonHandler:Function;
    monthList: {id:number, name:string}[];
    initYear:number;
    yearOptions:{text:string, value:string}[];
    user_id: number;
}

export default function UploadedFile({uploadFileModalButtonHandler, monthList, initYear, yearOptions, user_id}:UploadedFileProps){   
    const attendancelogfile_categoryid = 4; 
    const [uploadYear, setUploadYear] = useState({text:initYear.toString(), value:initYear.toString()});
    let {data} = useFetchUploadedFilesQuery({userid: user_id, familyid: 0, ctgryid: attendancelogfile_categoryid});    
    let logFiles : iFile[] = data as iFile[];
    if(logFiles){
        logFiles = logFiles.filter((file:iFile) => {
            if(file && file.file_date_modified){
                let uploadDate = new Date(file.file_date_modified);
                // console.log(uploadDate);
                // console.log(uploadDate.getFullYear());
                // console.log(initYear);
                // console.log((initYear === uploadDate.getFullYear()));
                if(uploadYear.value === uploadDate.getFullYear().toString()){return file;}
            }        
        }) as iFile[];
    }    

    const [deleteFile] = useDeleteFileMutation();    
    const onDeleteFile = (filename:string , file_id:number) => {
        var ans = confirm("Are you sure you want to delete this file?");
        if(ans) {
            deleteFile({fileid: file_id, filename:filename});
        }
    }

    const onYearClick = (optionItem : {text:string, value:string}) =>{
        setUploadYear(optionItem);
    };      
    //console.log(logFiles);
    let UploadedFilePanels = monthList.map((item, index) => {
        const renderedLogFiles = logFiles?.map((logfile, index) => {
            let monthNumber = new Date(logfile.file_date_modified).getMonth()+1;
            let baseurl = import.meta.env.VITE_api_base_url;
            let downloadlink = `${baseurl}/file/0/0/0/${logfile.file_name}/`;
            if(monthNumber == item.id){
                return <div className="flex items-center justify-between mt-1" key={index}>
                    <Button><Link to={downloadlink}>{logfile.file_name}</Link></Button>
                    <Button onClick={() => {onDeleteFile(logfile.file_name, logfile.file_id)} } danger rounded><FaWindowClose/></Button>
                </div>
            }
        });

        return <Panel className="h-72 overflow-auto" key={index}>
        <div className="flex items-center justify-between">
            <div><b>{item.name}</b></div>
            <div><Button onClick={() => uploadFileModalButtonHandler()}><FaFileUpload/></Button></div>
        </div>
        <div>{renderedLogFiles}</div>
        </Panel>
    });

    let UploadedFileSection = <Panel className="h-full">
        {/* <ClientDetails client={selectedClient} /> */}
        <div className="flex items-center justify-between p-1">
            <div>Attendance Uploaded Files</div>
            <div><Dropdown options={yearOptions} onChange={onYearClick} value={uploadYear} /></div>
        </div>
        <div className="grid grid-cols-2 gap-1">         
            {UploadedFilePanels}
        </div>
    </Panel>

    return <>{UploadedFileSection}</>;
} 