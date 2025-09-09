import { useState } from "react";
import Button from "../../Button";
import Table from "../../Table";
import { NewInputClientRecord } from "./NewInputClientRecord";
import { iParent } from "../../../api/types/iParent";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, setParents } from "../../../store";
import { iClientForm } from "../../../api/types/iClientForm";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { validatePhoneNumber, validateName, validateEmail, validateParentRecords } from "../../../hooks/clientValidatorHooks";
import { ClientErrorMessageDisplay } from "./ClientErrorMessageDisplay";

export function ClientNewParentInfo(){
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[phone, setPhone] = useState("");
    const[email, setEmail] = useState("");

    const dispatch = useDispatch();
    const {parents, family_id} = useSelector<IRootState, iClientForm>((state) => {
        return state.clientForm;
    });       

    const onDeleteParent = (id:number) => {
        let newParentList = parents.filter((parent:iParent) => {
            return parent.parent_id !== id;
        });
        dispatch(setParents(newParentList));
    }     

    const parentTableConfig = [
        {
            label:'',  
            render: (item:iParent) => <Button danger rounded onClick={() => onDeleteParent(item.parent_id)}><HiOutlineDocumentRemove  /></Button>
                
        },
        {
            label:'Name',  
            render: (item:iParent) => `${item.parent_first_name} ${item.parent_last_name}`
        }        
        ,{
            label:'Phone / Email',
            render: (item:iParent) => (item.phone_numbers.length === 0) ? "" : `${item.phone_numbers[0].phone_value} / ${item.emails[0].email_value}`
        }
    ];      

    const onAddClick =()=>{
        let newPhoneArr = [{
            parent_id:-1,
            phone_id: -1,
            phone_value: phone
        }];

        let newEmailArr = [{
            email_id: -1,                
            parent_id: -1,
            email_value: email
        }];

        let newParent:iParent = {
            parent_first_name: firstName,
            parent_last_name: lastName,
            phone_numbers:newPhoneArr,
            emails:newEmailArr,
            family_id: family_id ? family_id : -1,
            parent_id: -1
        }        

        let newParentList = [...parents , newParent];
        let phoneErr = validatePhoneNumber(phone);
        let firstNameErr = validateName(firstName);
        let lastNameErr = validateName(lastName);
        let emailErr = validateEmail(email);
        let isRecordDuplicate = validateParentRecords(parents, newParent);

        if(!phone || phoneErr){return;} 
        if(!firstName || firstNameErr){return;}
        if(!lastName || lastNameErr){return;} 
        if(!email || emailErr){return;} 
        if(isRecordDuplicate) {return;} 
        
        dispatch(setParents(newParentList));
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        //onAddParent(newParent);        
    }    

    const onFirstNameChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        setFirstName(event.target.value);
    }

    const onLastNameChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        setLastName(event.target.value);
    }    

    const onPhoneChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        setPhone(event.target.value);
    }

    const onEmailChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(event.target.value);
    }

    let parentPhoneValidationErr:string = validatePhoneNumber(phone);
    let parentFirstNameValidationErr:string = validateName(firstName);
    let parentLastNameValidationErr:string = validateName(lastName);
    let parentEmailValidationErr:string = validateEmail(email);

    return (
        <>
            <h3 className="font-bold">Parents/Guradians</h3>
            <div className="h-64 border-2 overflow-auto"> 
                <Table data={parents} config={parentTableConfig} customClass="w-full"/>
            </div>
            <div className="flex">
                <NewInputClientRecord inputMaxLength={31} label="First name" value={firstName} onChange={onFirstNameChange} />
                <ClientErrorMessageDisplay error={parentFirstNameValidationErr}/>
            </div>            
            <div className="flex">
                <NewInputClientRecord inputMaxLength={31} label="Last name" value={lastName} onChange={onLastNameChange} />
                <ClientErrorMessageDisplay error={parentLastNameValidationErr}/>
            </div>                                    
            <div className="flex">
                <NewInputClientRecord inputMaxLength={15} label="Phone" value={phone} onChange={onPhoneChange} />
                <ClientErrorMessageDisplay error={parentPhoneValidationErr}/>
            </div>
            <div className="flex">
                <NewInputClientRecord inputMaxLength={127} label="Email" value={email} onChange={onEmailChange} />
                <ClientErrorMessageDisplay error={parentEmailValidationErr}/>
            </div>            
            
            <div className=""><Button success rounded className="w-full text-center m-1" onClick={onAddClick}>Add</Button></div>        
        </>
    );
}