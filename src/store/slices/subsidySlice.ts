import { createSlice } from "@reduxjs/toolkit";
import { iSubsidySliceProps } from "../../api/types/iSubsidySLiceProps";

interface payloadProps {
    type: string;
    payload: number;
}

const subsidySlice = createSlice({
    name: "subsidySlice",
    initialState: {annualIncome: 0, monthlyCharge:1200, estimateCharge:0, subsidyAmount:0, grantAmount:0, childAge: 0} as iSubsidySliceProps,
    reducers: {
      setAnnualIncome(subsidyState, action: payloadProps) {        
        if(!action.payload) {action.payload = 0;}
        subsidyState.annualIncome = action.payload;
      },
      setMonthlyCharge(subsidyState, action: payloadProps) {     
        if(!action.payload) {action.payload = 0;}   
        subsidyState.monthlyCharge = action.payload;
      },
      setEstimateCharge(subsidyState, action: payloadProps) {   
        if(!action.payload) {action.payload = 0;}     
        subsidyState.estimateCharge = action.payload;
      },
      setSubsidyAmount(subsidyState, action: payloadProps) { 
        if(!action.payload) {action.payload = 0;}       
        subsidyState.subsidyAmount = action.payload;
      },
      setGrantAmount(subsidyState, action: payloadProps) { 
        if(!action.payload) {action.payload = 0;}       
        subsidyState.grantAmount = action.payload;
      },      
      setChildAge(subsidyState, action: payloadProps) { 
        if(!action.payload) {action.payload = 0;}       
        subsidyState.childAge = action.payload;
      }              
    }
});

const {setAnnualIncome, setMonthlyCharge, setEstimateCharge, setSubsidyAmount, setGrantAmount, setChildAge} = subsidySlice.actions;
const subsidySliceReducer = subsidySlice.reducer;

export {setAnnualIncome, setMonthlyCharge, setEstimateCharge, setSubsidyAmount, setGrantAmount, setChildAge, subsidySliceReducer};