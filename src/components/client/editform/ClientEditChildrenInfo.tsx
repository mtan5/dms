import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Table from "../../Table";
import "react-datepicker/dist/react-datepicker.css";
import { iChild } from "../../../api/types/iChild";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, setChildren } from "../../../store";
import { iClientForm } from "../../../api/types/iClientForm";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { validateDate, validateName, validateChildRecords } from "../../../hooks/clientValidatorHooks";
import { InputDatePicker } from "../../InputDatePicker";
import { NewInputClientRecord } from "../newform/NewInputClientRecord";
import { ClientErrorMessageDisplay } from "../newform/ClientErrorMessageDisplay";
import { updateChildDateOfBirthState, updateChildFirstNameState, updateChildLastNameState } from "../../../hooks/clientEditFormHooks";
import { addDaystoDate, convertToNegative, formatDate, generateRandomNumber } from "../../../hooks/utilityHooks";
import DatePicker from "react-datepicker";

export function ClientEditChildrenInfo(){
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[dateOfBirth, setDateOfBirth] = useState(new Date().toISOString().split('T')[0]);
    const dispatch = useDispatch();
    const {children, family_id} = useSelector<IRootState, iClientForm>((state) => {
        return state.clientForm;
    });       


    const onAddClick =()=>{
        let child: iChild= {
            child_id: convertToNegative(generateRandomNumber()),
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

    const onChildFirstNameChange=(event: React.FormEvent<HTMLFormElement>, inputChild:iChild)=>{
        let newParentFirstName = (event.target as HTMLFormElement).value;        
        updateChildFirstNameState(newParentFirstName, inputChild, children);
    };

    const onChildLastNameChange=(event: React.FormEvent<HTMLFormElement>, inputChild:iChild)=>{
        let newParentLastName = (event.target as HTMLFormElement).value;        
        updateChildLastNameState(newParentLastName, inputChild, children);
        console.log(children);
    }; 

    const onChildDateOfBirthChange=(inputDate: string, inputChild:iChild)=>{
        updateChildDateOfBirthState(inputDate, inputChild, children);
        console.log(children);
    };         

    const childTableConfig = [
        {
            label:'',  
            render: (item:iChild) => <Button danger rounded onClick={() => onDeleteChild(item.child_id)}><HiOutlineDocumentRemove  /></Button>                
        },        
        {
            label:'Name',
            render: (item:iChild) => {
                return (
                    <>
                        <Input type="text" value={item.child_first_name} onChange={(event: React.FormEvent<HTMLFormElement>) => onChildFirstNameChange(event, item)}/>
                        <Input type="text" value={item.child_last_name} onChange={(event: React.FormEvent<HTMLFormElement>) => onChildLastNameChange(event, item)}/>
                    </>);
            }
        }        
        ,{
            label:'Date Of Birth',
            render: (item:iChild) =>  {
                let childDateOfBirth = new Date(item.child_birth_date).toISOString().split('T')[0];
                return (
                    <>
                        <DatePicker 
                        className="border-2 rounded-md p-1 hover:cursor-pointer" 
                        selected={addDaystoDate(childDateOfBirth, 1)} 
                        onChange={(date) => {   
                                let inputDate = formatDate(date as Date);
                                onChildDateOfBirthChange(inputDate, item);
                            } 
                        }
                        value={childDateOfBirth}
                        />
                    </>);
            }
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
            <div className="h-80 border-2 overflow-auto"> 
                <Table data={children} config={childTableConfig} customClass="w-full"/>            
            </div>
            <div className="grid grid-cols-2 gap-1">
                <div className="col-span-1 flex">
                    <div className="flex">
                        <NewInputClientRecord inputMaxLength={31} label="First Name" value={firstName} onChange={onFirstNameChange} />
                        <ClientErrorMessageDisplay error={firstNameValidationErr}/>
                    </div>
                </div>
                <div className="col-span-1 flex">
                    <div className="flex">
                        <NewInputClientRecord inputMaxLength={31} label="Last Name" value={lastName} onChange={onLastNameChange} />
                        <ClientErrorMessageDisplay error={lastNameValidationErr}/>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
                <div className="col-span-2 flex">
                    <div className="flex">
                        <InputDatePicker label="Birth date" valueDate={dateOfBirth} onDateChange={setDateOfBirth}/>
                        <ClientErrorMessageDisplay error={dateVallidationErr}/>
                    </div> 
                </div>
            </div>                       
            {/* <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1 text-end"></div>
                <div className="col-span-2 invisible"><Input type="text"/></div>
            </div> */}
                                                           
            <div className=""><Button success rounded className="w-full text-center m-1" onClick={onAddClick}>Add</Button></div>        
        </>
    );    
}

