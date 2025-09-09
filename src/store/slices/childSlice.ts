import { createSlice } from "@reduxjs/toolkit";
import { iChild } from "../../api/types/iChild";
import { iChildSlice } from "../../api/types/iChldSlice";

interface searchString {
    type: string;
    payload: string;
}

interface childData {
    type: string;
    payload: [];
}

interface selectedChild {
    type: string;
    payload: iChild;
}

const childSlice = createSlice({
    name: "childSlice",
    initialState: {searchChild: ""} as iChildSlice,
    reducers: {
      setSearchChild(childState, action: searchString) {        
        childState.searchChild = action.payload;
      },
      setChildData(childState, action: childData) {        
        childState.childList = action.payload;
      },
      setSelectedChild(childState, action: selectedChild) {        
        childState.selectedChild = action.payload;
      }
    }
  });

const {setSearchChild, setChildData, setSelectedChild} = childSlice.actions;
const childSliceReducer = childSlice.reducer;

export {setSelectedChild, setSearchChild, setChildData, childSliceReducer};