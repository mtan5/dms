import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Table from "../../Table";
import "react-datepicker/dist/react-datepicker.css";
import { iChild } from "../../../api/types/iChild";
import { NewInputClientRecord } from "./NewInputClientRecord";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, setChildren } from "../../../store";
import { iClientForm } from "../../../api/types/iClientForm";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { validateDate, validateName, validateChildRecords } from "../../../hooks/clientValidatorHooks";
import { ClientErrorMessageDisplay } from "./ClientErrorMessageDisplay";
import { InputDatePicker } from "../../InputDatePicker";

export function ClientNewFamilyChildren(){
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[dateOfBirth, setDateOfBirth] = useState(new Date().toISOString().split('T')[0]);
    const dispatch = useDispatch();
    const {children, family_id} = useSelector<IRootState, iClientForm>((state) => {
        return state.clientForm;
    });       


    const onAddClick =()=>{
        let child: iChild= {
            child_id: -1,
            child_first_name: firstName,
            child_last_name: lastName,
            child_birth_date: dateOfBirth.toString(),
            is_active: true,
            family_id: family_id ? family_id : -1
        };        
        let newChildList = [...children, child];    
        let firstNameErr = validateName(firstName);
        let lastNameErr = validateName(lastName);
        let dateErr = validateDate(dateOfBirth.toString());
        let existingRecord = validateChildRecords(children, child);

        if(!firstName || firstNameErr){return;}
        if(!lastName || lastNameErr){return;}         
        if(!dateOfBirth || dateErr){return;}         
        if(existingRecord){return;}         
        
        dispatch(setChildren(newChildList)); 
        setFirstName("");
        setLastName("");
    }

    const childTableConfig = [
        {
            label:'',  
            render: (item:iChild) => <Button danger rounded onClick={() => onDeleteChild(item.child_id)}><HiOutlineDocumentRemove  /></Button>                
        },        
        {
            label:'Name',
            render: (item:iChild) => `${item.child_first_name} ${item.child_last_name}`,
        }        
        ,{
            label:'Date Of Birth',
            render: (item:iChild) => new Date(item.child_birth_date).toISOString().split('T')[0]
            //render: (item:iChild) => new Date(item.child_birth_date).toDateString()
        }
    ];  
     
    const onDeleteChild = (id:number) => {
        let newChildList = children.filter((child: iChild) => {
           return child.child_id !== id;
        });
        dispatch(setChildren(newChildList));
    }       

    const onFirstNameChange=(event : React.ChangeEvent<HTMLInputElement>)=>{        
        setFirstName(event.target.value);
    }

    const onLastNameChange=(event : React.ChangeEvent<HTMLInputElement>)=>{
        setLastName(event.target.value);
    }      

    const firstNameValidationErr = validateName(firstName);
    const lastNameValidationErr = validateName(lastName);
    const dateVallidationErr = validateDate(dateOfBirth.toString());
    
    return (
        <>
            <div className="flex justify-between">
                <h3 className="font-bold">Child Details</h3>
            </div>
            <div className="h-64 border-2 overflow-auto"> 
                <Table data={children} config={childTableConfig} customClass="w-full"/>            
            </div>
            <div className="flex">
                <NewInputClientRecord inputMaxLength={31} label="First name" value={firstName} onChange={onFirstNameChange} />
                <ClientErrorMessageDisplay error={firstNameValidationErr}/>
            </div>
            <div className="flex">
                <NewInputClientRecord inputMaxLength={31} label="Last name" value={lastName} onChange={onLastNameChange} />
                <ClientErrorMessageDisplay error={lastNameValidationErr}/>
            </div>
            <div className="flex">
                <InputDatePicker label="Birth date" valueDate={dateOfBirth} onDateChange={setDateOfBirth}/>
                <ClientErrorMessageDisplay error={dateVallidationErr}/>
            </div>            
            <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1 text-end"></div>
                <div className="col-span-2 invisible"><Input type="text"/></div>
            </div> 
                                                           
            <div className=""><Button success rounded className="w-full text-center m-1" onClick={onAddClick}>Add</Button></div>        
        </>
    );    
}

