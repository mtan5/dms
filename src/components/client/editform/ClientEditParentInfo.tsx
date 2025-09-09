import { useState } from "react";
import Button from "../../Button";
import Table from "../../Table";
import { iParent } from "../../../api/types/iParent";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, setParents } from "../../../store";
import { iClientForm } from "../../../api/types/iClientForm";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { validatePhoneNumber, validateName, validateEmail, validateParentRecords } from "../../../hooks/clientValidatorHooks";
import { NewInputClientRecord } from "../newform/NewInputClientRecord";
import { ClientErrorMessageDisplay } from "../newform/ClientErrorMessageDisplay";
import Input from "../../Input";
import { updateParentsEmailsState, updateParentsFirstNameState, updateParentsLastNameState, updateParentsPhonesState } from "../../../hooks/clientEditFormHooks";
import { convertToNegative, generateRandomNumber } from "../../../hooks/utilityHooks";

export function ClientEditParentInfo(){
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
    };  

    const onParentFirstNameChange=(event: React.FormEvent<HTMLFormElement>, inputParent:iParent)=>{
        let newParentFirstName = (event.target as HTMLFormElement).value;        
        updateParentsFirstNameState(newParentFirstName, inputParent, parents);
    };

    const onParentLastNameChange=(event: React.FormEvent<HTMLFormElement>, inputParent:iParent)=>{
        let newParentLastName = (event.target as HTMLFormElement).value;        
        updateParentsLastNameState(newParentLastName, inputParent, parents);
    }; 
    
    const onParentPhoneChange=(event: React.FormEvent<HTMLFormElement>, inputParent:iParent)=>{
        let newPhone = (event.target as HTMLFormElement).value;        
        updateParentsPhonesState(newPhone, inputParent, parents);
    };     

    const onParentEmailChange=(event: React.FormEvent<HTMLFormElement>, inputParent:iParent)=>{
        let newEmail = (event.target as HTMLFormElement).value;        
        updateParentsEmailsState(newEmail, inputParent, parents);
        console.log(parents);
    };     

    const parentTableConfig = [
        {
            label:'',  
            render: (item:iParent) => <Button danger rounded onClick={() => onDeleteParent(item.parent_id)}><HiOutlineDocumentRemove  /></Button>
                
        },
        {
            label:'Name',  
            render: (item:iParent) => {
                return (
                <>
                    <Input type="text" value={item.parent_first_name} onChange={(event: React.FormEvent<HTMLFormElement>) => onParentFirstNameChange(event, item)}/>
                    <Input type="text" value={item.parent_last_name} onChange={(event: React.FormEvent<HTMLFormElement>) => onParentLastNameChange(event, item)}/>
                </>);
            }
        }        
        ,{
            label:'Phone / Email',
            render: (item:iParent) => {
                return (
                <>
                    <Input type="text" value={item.phone_numbers[0].phone_value} onChange={(event: React.FormEvent<HTMLFormElement>) => onParentPhoneChange(event, item)}/>
                    <Input type="text" value={item.emails[0].email_value} onChange={(event: React.FormEvent<HTMLFormElement>) => onParentEmailChange(event, item)}/>
                </>);
            }
        }
    ];      

    const onAddClick =()=>{
        const randomParentId = convertToNegative(generateRandomNumber());
        let newPhoneArr = [{
            parent_id: randomParentId,
            phone_id: convertToNegative(generateRandomNumber()),
            phone_value: phone
        }];

        let newEmailArr = [{
            email_id: convertToNegative(generateRandomNumber()),                
            parent_id: randomParentId,
            email_value: email
        }];

        let newParent:iParent = {
            parent_first_name: firstName,
            parent_last_name: lastName,
            phone_numbers:newPhoneArr,
            emails:newEmailArr,
            family_id: family_id ? family_id : -1,
            parent_id: randomParentId
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

    const onInputFirstNameChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        setFirstName(event.target.value);
    }

    const onInputLastNameChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        setLastName(event.target.value);
    }    

    const onInputPhoneChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        setPhone(event.target.value);
    }

    const onInputEmailChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(event.target.value);
    }

    let parentPhoneValidationErr:string = validatePhoneNumber(phone);
    let parentFirstNameValidationErr:string = validateName(firstName);
    let parentLastNameValidationErr:string = validateName(lastName);
    let parentEmailValidationErr:string = validateEmail(email);

    return (
        <>
            <h3 className="font-bold">Parents/Guradians</h3>
            <div className="h-80 border-2 overflow-auto h-3/4"> 
                <Table data={parents} config={parentTableConfig} customClass="w-full"/>
            </div>
            <div className="grid grid-cols-2 gap-1">
                <div className="col-span-1">
                    <div className="flex">
                        <NewInputClientRecord inputMaxLength={31} label="First Name" value={firstName} onChange={onInputFirstNameChange} />
                        <ClientErrorMessageDisplay error={parentFirstNameValidationErr}/>
                    </div>                    
                </div>                
                <div className="col-span-1 flex">
                    <div className="flex">
                        <NewInputClientRecord inputMaxLength={31} label="Last Name" value={lastName} onChange={onInputLastNameChange} />
                        <ClientErrorMessageDisplay error={parentLastNameValidationErr}/>
                    </div>
                </div>                
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
                <div className="col-span-1">
                    <div className="flex">
                        <NewInputClientRecord inputMaxLength={15} label="Phone" value={phone} onChange={onInputPhoneChange} />
                        <ClientErrorMessageDisplay error={parentPhoneValidationErr}/>
                    </div>                    
                </div>
                <div className="col-span-1">
                    <div className="flex">
                        <NewInputClientRecord inputMaxLength={127} label="Email" value={email} onChange={onInputEmailChange} />
                        <ClientErrorMessageDisplay error={parentEmailValidationErr}/>
                    </div>
                </div>
            </div>            
            <div className=""><Button success rounded className="w-full text-center m-1" onClick={onAddClick}>Add</Button></div>        
        </>
    );
}