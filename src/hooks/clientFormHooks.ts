import { store, setChildren, setCity, setFamilyName, setIncome, setParents, setPostal, setStreet, setFamilyId, setValidationErrors } from "../store";
import { iParent } from "../api/types/iParent";
import { iChild } from "../api/types/iChild";
import { iClient } from "../api/types/iClient";

const clearClientForm=()=>{
    store.dispatch(setParents([] as iParent[]));
    store.dispatch(setChildren([] as iChild[]));
    store.dispatch(setValidationErrors([] as string[]));
    store.dispatch(setFamilyName(""));
    store.dispatch(setStreet(""));
    store.dispatch(setCity(""));
    store.dispatch(setPostal(""));
    store.dispatch(setIncome(0));        
}; 

const setClientFormData=(client?: iClient | null)=>{
    if(client === null){
        store.dispatch(setParents([] as iParent[]));
        store.dispatch(setChildren([] as iChild[]));
        store.dispatch(setValidationErrors([] as string[]));
        store.dispatch(setFamilyName(""));
        store.dispatch(setStreet(""));
        store.dispatch(setCity(""));
        store.dispatch(setPostal(""));
        store.dispatch(setIncome(0)); 
        store.dispatch(setFamilyId(-1));       
        return;
    }

    let {family_id, family_name, family_street, family_city, family_income, family_postal, parents, children} : iClient = client as iClient;  

    store.dispatch(setFamilyName(family_name));
    store.dispatch(setStreet(family_street));
    store.dispatch(setCity(family_city));
    store.dispatch(setPostal(family_postal));
    store.dispatch(setIncome(family_income));
    store.dispatch(setFamilyId(family_id));
    store.dispatch(setParents(parents));
    store.dispatch(setChildren(children));
    store.dispatch(setValidationErrors([] as string[]));
};  

export {clearClientForm, setClientFormData}