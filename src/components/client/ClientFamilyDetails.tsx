import { useState } from "react";
import Button from "../Button";
import { FcSettings } from "react-icons/fc";
import { iClient } from "../../api/types/iClient";
import { RecordLabelValue } from "../RecordLabelValue";
import { ClientEditForm } from "./editform/ClientEditForm";
import { IRootState, setSelectedClient, setValidationErrors, useUpdateClientMutation } from "../../store";
import { useDispatch, useSelector} from "react-redux";
import { iClientForm } from "../../api/types/iClientForm";
import { validateClient } from "../../hooks/clientValidatorHooks";
import { clearClientForm, setClientFormData } from "../../hooks/clientFormHooks";
import { formatToMoney } from "../../hooks/utilityHooks";
import { getUserCredentialCookie } from "../../hooks/coookieHooks";
import { iUserLogin } from "../../api/types/iUserLogin";

interface ClientFamilyDetailsProps{
    client: iClient;
}

export function ClientFamilyDetails({client}: ClientFamilyDetailsProps){
    //console.log(client);
    const dispatch = useDispatch();
    const [isModalOpen, setModalVisibility] = useState(false);
    const [updateClient] = useUpdateClientMutation();   
     
    let renderedDetails;
    let clientIncome = '';
    let userCookie:iUserLogin = getUserCredentialCookie();  
    let userid = userCookie.user_id;
    let status = <span className="text-green-600">Active</span>;
    let {familyName, street, city, postal, income, parents, children} = useSelector<IRootState, iClientForm>((state) => {return state.clientForm;});

    const editClientModalButtonHandler = () => {
        setClientFormData(client);
        setModalVisibility(!isModalOpen);
    };  
    
    const onSubmitChanges = () => {
        let validationErrors:string[] = validateClient({familyName, street, city, postal, income, parents, children})!;
        dispatch(setValidationErrors(validationErrors));    

        if(validationErrors.length <= 0){  
            const clientFamily: iClient = {
                family_id: client.family_id,
                family_name: familyName,
                family_street: street,
                family_city:city,
                family_postal:postal,
                parents: parents,
                children: children,
                family_income: income,
                is_active: client.is_active,
                user_id: userid
            }
            updateClient(clientFamily);
            setModalVisibility(!isModalOpen);
            clearClientForm();
            dispatch(setSelectedClient(clientFamily));            
        }        
    }         

    if(client.family_income){ clientIncome = formatToMoney(client.family_income) as string;}
    if(!client.is_active){status = <span className="text-red-600">InActive</span>;}
    renderedDetails = (
        <div className="mt-2 w-full flex items-center justify-between">            
            <RecordLabelValue label="Family name:" value={client.family_name}/>
            <RecordLabelValue label="Address:" value={`${client.family_street} ${client.family_city} ${client.family_postal}`} />
            <RecordLabelValue label="Family income:" value={`$${clientIncome}`} />                             
        </div>
    );  
    
    return (<>
        <div className="text-gray-500 text-xl flex items-center justify-between mt-4">
            <div>Client Information ({status})</div>
            <Button onClick={editClientModalButtonHandler}><FcSettings/></Button>
        </div>
        {renderedDetails}
        {isModalOpen && <ClientEditForm modalCloseHandler={editClientModalButtonHandler} onSubmitChanges={onSubmitChanges}/>}
    </>);
}
