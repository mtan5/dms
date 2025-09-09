import { iParent } from "../../api/types/iParent";
import { iChild } from "../../api/types/iChild";
import { createSlice } from "@reduxjs/toolkit";
import { iClientForm } from "../../api/types/iClientForm";

interface formParents {
  type: string;
  payload: iParent[];
}

interface formChildren {
  type: string;
  payload: iChild[];
}

interface formFamilyName {
  type: string;
  payload: string;
}

interface formStreet {
  type: string;
  payload: string;
}

interface formCity {
  type: string;
  payload: string;
}

interface formPostal {
  type: string;
  payload: string;
}

interface formIncome {
  type: string;
  payload: number;
}

interface formRecId {
  type: string;
  payload: number;
}

interface formValidationErrors{
  type: string;
  payload: string[];    
}

const clientFormSlice = createSlice({
  name: "clientFormSlice",
  initialState: {
    parents:[] as iParent[]
    ,children: [] as iChild[]
    ,errors: [] as string[]
  } as iClientForm,
  reducers: {
    setParents(clientState, action: formParents){
      clientState.parents = action.payload;
    },
    setChildren(clientState, action: formChildren){        
      clientState.children = action.payload;
    },
    setFamilyName(clientState, action:formFamilyName){
      clientState.familyName = action.payload;
    },
    setFamilyId(clientState, action:formRecId){
      clientState.family_id = action.payload;
    },      
    setStreet(clientState, action:formStreet){
      clientState.street = action.payload;
    },
    setCity(clientState, action:formCity){
      clientState.city = action.payload;
    },
    setPostal(clientState, action:formPostal){
      clientState.postal = action.payload;
    },    
    setIncome(clientState, action:formIncome){
      clientState.income = action.payload;
    },    
    setValidationErrors(clientState, action: formValidationErrors){
      clientState.errors = action.payload;
    }                          
  }
});

const {setParents, setChildren, setFamilyName, setStreet, setCity, setPostal, setIncome, setValidationErrors, setFamilyId} = clientFormSlice.actions;
const clientFormSliceReducer = clientFormSlice.reducer;

export {setParents, setChildren, setFamilyName, setStreet, setCity, setPostal, setIncome, setValidationErrors, setFamilyId, clientFormSliceReducer};