import { iEmail } from "../../api/types/iEmail";
import { iParent } from "../../api/types/iParent";
import { iPhone } from "../../api/types/iPhone";
import { RecordLabelValue } from "../RecordLabelValue";
import { formatPhoneNumber } from "../../hooks/utilityHooks";

interface ClientParentsProps{
    parents: iParent[];
}

export function ClientParents({parents}: ClientParentsProps){

    const extractEmails = (emails: iEmail[]) =>{
        const renderedEmails = emails.map((email) => {            
            return <div key={email.email_id}>{email.email_value}</div>
        });

        return (
            <div>{renderedEmails}</div>
        );
    };

    const extractPhones = (phones: iPhone[]) =>{
        const renderedPhones = phones.map((phone) => {            
            return <div key={phone.phone_id}>{formatPhoneNumber(phone.phone_value)}</div>
        });

        return (
            <div>{renderedPhones}</div>
        );        
    }

    const rendered = parents.map((parent) => {
        const emails = extractEmails(parent.emails);
        const phones = extractPhones(parent.phone_numbers);
        return (
            <div key={parent.parent_id} className="mb-8 w-auto border rounded-md p-5">
                <RecordLabelValue label="Full name:" value={`${parent.parent_first_name} ${parent.parent_last_name}`}/>
                <RecordLabelValue label="Email:">{emails}</RecordLabelValue>
                <RecordLabelValue label="Phone:">{phones}</RecordLabelValue>
            </div>
        );
    });

    return(
    <>
        <div className="text-gray-500 text-xl flex items-center justify-between">
            Parents/Guradians        
        </div>
        <div className="grid gap-1 grid-cols-2 mt-2">
            {rendered}
        </div>        
    </>);
}