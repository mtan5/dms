import { createSlice } from "@reduxjs/toolkit";

interface navPageString {
    type: string;
    payload: string;
}

interface navPageSliceState{
    currPage:string;
}

const navPageSlice = createSlice({
    name: "navSlice",
    initialState: {currPage: ""} as navPageSliceState,
    reducers: {
        setNavPage(navPageState, action: navPageString) {        
            navPageState.currPage = action.payload;
        }    
    }
});

const {setNavPage} = navPageSlice.actions;
const navPageSliceReducer = navPageSlice.reducer;

export {setNavPage, navPageSliceReducer};