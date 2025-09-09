import Button from "../Button";
import { iClient } from "../../api/types/iClient";
import { setSelectedClient, /*useDeleteClientMutation,*/ useUpdateClientMutation } from "../../store";
import { ClientChildren } from "./ClientChildren";
import { ClientFamilyDetails } from "./ClientFamilyDetails";
import { ClientParents } from "./ClientParents";
import { useDispatch } from "react-redux";
import { ClientFiles } from "./ClientFiles";

interface ClientDetailsProps{
    client: iClient;
}

export function ClientDetails({client}: ClientDetailsProps){
    let rendered;
    const dispatch = useDispatch();
    // const [deleteClient] = useDeleteClientMutation();
    const [updateClient] = useUpdateClientMutation();

    // const onDelete=()=>{
    //     var ans = confirm("Are you sure you want to delete this record?");
    //     if(ans){
    //         const deletedClient = {...client};
    //         deletedClient.is_active = false;
    //         dispatch(setSelectedClient({family_id:-1} as iClient));
    //         deleteClient(client);         
    //     }        
    // };

    const onDeactivate=()=>{
        var ans = confirm("Are you sure you want to activate this record?");
        if(ans){
            const deactivatedClient = {...client};
            deactivatedClient.is_active = false;            
            dispatch(setSelectedClient(deactivatedClient));
            updateClient(deactivatedClient);            
        }
    };

    const onActivate=()=>{
        const activatedClient = {...client};
        activatedClient.is_active = true;
        dispatch(setSelectedClient(activatedClient));
        updateClient(activatedClient);        
    };    

    let statusButton = <Button className="m-1" warning rounded onClick={onDeactivate}>DEACTIVATE</Button>;
    if(client && !client.is_active){
        statusButton = <Button className="m-1" success rounded onClick={onActivate}>ACTIVATE</Button>
    }

    if(client&& client.family_id > 0){        
        return (
            <>                
                <ClientFamilyDetails client={client}/> 
                <hr className="m-4"/>                   
                <ClientChildren clientChildren={client.children} familyAnnualIncome={client.family_income}/>    
                <hr className="m-4"/>
                <ClientParents parents={client.parents} />
                <hr className="m-4"/>
                <ClientFiles />
                <div className="flex items-center m-4 mb-6">
                    {statusButton}
                    {/* <Button danger rounded onClick={onDelete}>DELETE</Button> */}
                </div>                
            </>
        );
    }
    return (<div>{rendered}</div>);
}