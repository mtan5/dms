import { iChild } from "../api/types/iChild";
import { iParent } from "../api/types/iParent"
import { store, setParents, setChildren } from "../store";

const updateParentsFirstNameState = (newParentFirstName: string, inputParent:iParent, stateParents:iParent[]) =>{
    if(!newParentFirstName || newParentFirstName.length > 31){return;}
    let newParentList = stateParents.map((parent) => {
        if(parent.parent_id === inputParent.parent_id){
            return {
                family_id: inputParent.family_id,
                parent_id: inputParent.parent_id,
                parent_first_name:newParentFirstName,
                parent_last_name: inputParent.parent_last_name,
                phone_numbers: inputParent.phone_numbers,
                emails: inputParent.emails
            } as iParent;                
        }
        return parent;
    });
    store.dispatch(setParents(newParentList)); 
}

const updateParentsLastNameState = (newParentLastName: string, inputParent:iParent, stateParents:iParent[]) =>{
    if(!newParentLastName || newParentLastName.length > 31){return;}
    let newParentList = stateParents.map((parent) => {
        if(parent.parent_id === inputParent.parent_id){
            return {
                family_id: inputParent.family_id,
                parent_id: inputParent.parent_id,
                parent_first_name:inputParent.parent_first_name,
                parent_last_name: newParentLastName,
                phone_numbers: inputParent.phone_numbers,
                emails: inputParent.emails
            } as iParent;                
        }
        return parent;
    });
    store.dispatch(setParents(newParentList)); 
}

const updateParentsEmailsState = (newEmail: string, inputParent:iParent, stateParents:iParent[]) =>{
    if(!newEmail || newEmail.length > 127){return;}
    let newParentList = stateParents.map((parent) => {
        if(parent.parent_id === inputParent.parent_id){
            return {
                family_id: inputParent.family_id,
                parent_id: inputParent.parent_id,
                parent_first_name:inputParent.parent_first_name,
                parent_last_name: inputParent.parent_last_name,
                phone_numbers: inputParent.phone_numbers,
                emails: [{
                    email_id: inputParent.emails[0].email_id,
                    email_value: newEmail,
                    parent_id: inputParent.emails[0].parent_id
                }]
            } as iParent;                
        }
        return parent;
    });
    store.dispatch(setParents(newParentList)); 
}

const updateParentsPhonesState = (newPhone: string, inputParent:iParent, stateParents:iParent[]) =>{
    if(!newPhone || newPhone.length > 15){return;}
    let newParentList = stateParents.map((parent) => {
        if(parent.parent_id === inputParent.parent_id){
            return {
                family_id: inputParent.family_id,
                parent_id: inputParent.parent_id,
                parent_first_name:inputParent.parent_first_name,
                parent_last_name: inputParent.parent_last_name,
                phone_numbers: [{
                    phone_id: inputParent.phone_numbers[0].phone_id,
                    phone_value: newPhone,
                    parent_id: inputParent.phone_numbers[0].parent_id 
                }],
                emails: inputParent.emails
            } as iParent;                
        }
        return parent;
    });
    store.dispatch(setParents(newParentList)); 
}

const updateChildFirstNameState = (newChildFirstName: string, inputChild:iChild, stateChildren:iChild[]) =>{
    if(!newChildFirstName || newChildFirstName.length > 31){return;}
    let newChildList = stateChildren.map((child) => {
        if(child.child_id === inputChild.child_id){
            return {
                family_id: inputChild.family_id,
                child_id: inputChild.child_id,
                child_first_name:newChildFirstName,
                child_last_name: inputChild.child_last_name,
                child_birth_date: inputChild.child_birth_date,
                is_active: inputChild.is_active,
            } as iChild;                
        }
        return child;
    });
    store.dispatch(setChildren(newChildList)); 
}

const updateChildLastNameState = (newChildLastName: string, inputChild:iChild, stateChildren:iChild[]) =>{
    if(!newChildLastName || newChildLastName.length > 31){return;}
    let newChildList = stateChildren.map((child) => {
        if(child.child_id === inputChild.child_id){
            return {
                family_id: inputChild.family_id,
                child_id: inputChild.child_id,
                child_first_name:inputChild.child_first_name,
                child_last_name: newChildLastName,
                child_birth_date: inputChild.child_birth_date,
                is_active: inputChild.is_active,
            } as iChild;                
        }
        return child;
    });
    store.dispatch(setChildren(newChildList)); 
}

const updateChildDateOfBirthState = (newChildBirthDate: string, inputChild:iChild, stateChildren:iChild[]) =>{
    if(!newChildBirthDate || newChildBirthDate.length > 18){return;}
    let newChildList = stateChildren.map((child) => {
        if(child.child_id === inputChild.child_id){
            return {
                family_id: inputChild.family_id,
                child_id: inputChild.child_id,
                child_first_name:inputChild.child_first_name,
                child_last_name: inputChild.child_last_name,
                child_birth_date: newChildBirthDate,
                is_active: inputChild.is_active,
            } as iChild;                
        }
        return child;
    });
    store.dispatch(setChildren(newChildList)); 
}

export {updateParentsFirstNameState, updateParentsLastNameState, updateParentsEmailsState, updateParentsPhonesState, updateChildFirstNameState, updateChildLastNameState, updateChildDateOfBirthState}