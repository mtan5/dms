import { useDispatch, useSelector } from 'react-redux';
import { iClient } from '../../api/types/iClient';
import { IRootState, setValidationErrors, useAddClientMutation, useFetchAllClientsQuery} from '../../store';
import Button from '../Button';
import Skeleton from '../Skeleton';
import { iClientSlice } from '../../api/types/iClientSlice';
import { ClientListItem } from './ClientListItem';
import { useState } from 'react';
import { ClientAddForm } from './newform/ClientAddForm';
import { iClientForm } from '../../api/types/iClientForm';
import { validateClient } from '../../hooks/clientValidatorHooks';
import { clearClientForm, setClientFormData } from '../../hooks/clientFormHooks';
import { getUserCredentialCookie } from '../../hooks/coookieHooks';
import { iUserLogin } from '../../api/types/iUserLogin';

export function ClientList(){
    let isClientSelected = false;  
    let userCookie:iUserLogin = getUserCredentialCookie();  
    let userid = userCookie.user_id;
    const dispatch = useDispatch();
    let{data, error, isFetching}  = useFetchAllClientsQuery(userid);
    const [addClient] = useAddClientMutation();
    const {familyName, street, city, postal, parents, children, income} = useSelector<IRootState, iClientForm>((state) => {
        return state.clientForm;
    });

    //START MODAL
    const [isModalOpen, setModalVisibility] = useState(false);
    const clearAddClientForm=()=>{setClientFormData(null);};  

    const addClientModalButtonHandler = () => {
        setModalVisibility(!isModalOpen);
        clearClientForm();
    };   
    const submitNewClientForm = () => {
        const clientFamily: iClient = {
            family_name: familyName,
            family_street: street,
            family_city:city,
            family_postal:postal,
            parents: parents,
            children: children,
            family_id:-1,
            family_income: income,
            user_id: userid
        }

        let validationErrors:string[] = validateClient({familyName, street, city, postal, income, parents, children})!;
        dispatch(setValidationErrors(validationErrors));
        if(validationErrors.length <= 0){
            addClient(clientFamily);
            setModalVisibility(!isModalOpen);
            clearAddClientForm();
        }        
    };   
    //END MODAL

    const {selectedClient} = useSelector<IRootState, iClientSlice>((state) => {return state.client;});
    const {} = useSelector<IRootState, iClientSlice>((state) => {
        let search = state.client.searchClient;
        if(search === undefined || search === '') return state.client;
        
        data = data?.filter((client) => {
            return client.family_name.toLowerCase().includes(search.toLowerCase());
        });           
        return state.client;
    });    
    //console.log(data);          
    
    let content;
    if(isFetching) { 
        content = (<div className="p-10">            
                <Skeleton times={4} className="h-10 w-full"/>
            </div>);
    }else if(error) { 
        content = (
            <>
                <div>Error fetching album data..</div>
            </>
        );
    }
    else{ 
        if(data && data.length > 0){
            content = data?.map((client: iClient) => {   
                isClientSelected = false;  
                if(client === selectedClient){isClientSelected = true;}
                return (<ClientListItem isSelected = {isClientSelected} client={client} key={client.family_id}/>);  
            });
        }
        // else{
        //     let clientData = data as iClient;
        //     let familyId = data.family_id;
        //     if(clientData === selectedClient){isClientSelected = true;}
        //     content = <ClientListItem isSelected = {isClientSelected} client={clientData} key={familyId}/>          
        // }
        content = <>{content}<Button onClick={addClientModalButtonHandler} primary rounded>ADD NEW CLIENT</Button></>  
    }    

    return(
    <div>
        {content}  
        {isModalOpen && <ClientAddForm modalCloseHandler={addClientModalButtonHandler} submitNewClientForm={submitNewClientForm}/>}      
    </div>);
}