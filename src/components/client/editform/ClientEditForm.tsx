import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import Modal from "../../Modal";
import { IRootState, setCity, setFamilyName, setPostal, setStreet, setIncome} from "../../../store";
import { iClientForm } from "../../../api/types/iClientForm";
import { ClientNewFamilyInfo } from "../newform/ClientNewFamilyInfo";
import { ClientEditParentInfo } from "./ClientEditParentInfo";
import { ClientEditChildrenInfo } from "./ClientEditChildrenInfo";

interface ClientEditFormProps{
    modalCloseHandler: Function;  
    onSubmitChanges: Function;    
}

const ClientEditForm = ({modalCloseHandler, onSubmitChanges} : ClientEditFormProps) => {
    let renderedErrors;
    const dispatch = useDispatch();
    let {familyName, street, city, postal, income, errors} = useSelector<IRootState, iClientForm>((state) => {return state.clientForm;});
    
    const onFamilyNameChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setFamilyName(event.target.value));
    }

    const onStreetChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setStreet(event.target.value));
    }    

    const onCityChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setCity(event.target.value));
    }

    const onPostalChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setPostal(event.target.value));
    } 

    const onIncomeChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setIncome(parseInt(event.target.value)));
    }    

    const actionBar = (
        <div className="flex items-center justify-between">
            <Button className="m-1" success rounded onClick={onSubmitChanges}>Save</Button>
            <Button className="m-1" primary rounded onClick={modalCloseHandler}>Close</Button>        
        </div>
    );         

    renderedErrors = errors!.map((error, index) => {return <div key={index} className="font-semibold text-red-700">{error}</div>;});
    const editClientModal = (
        <Modal onChange={modalCloseHandler} actionBar={actionBar} large>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-1">
                    <ClientNewFamilyInfo 
                        family_name={familyName} 
                        street = {street} 
                        city={city} 
                        postal={postal}
                        income={income}
                        onFamilyNameChange={onFamilyNameChange}
                        onPostalChange ={onPostalChange}
                        onCityChange={onCityChange}
                        onStreetChange={onStreetChange}
                        onIncomeChange={onIncomeChange}/>
                    <div className="border-t-2 mt-8">                            
                        {renderedErrors}    
                    </div>                 
                </div>
                <div className="col-span-2">
                    <ClientEditParentInfo />
                </div>
                <div className="col-span-2">
                    <ClientEditChildrenInfo />
                </div>
            </div>       
        </Modal>);
        return editClientModal;
}

export {ClientEditForm}
