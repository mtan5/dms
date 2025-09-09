import { createSlice } from "@reduxjs/toolkit";
import { iClientSlice } from "../../api/types/iClientSlice";
import { iClient } from "../../api/types/iClient";

interface searchString {
    type: string;
    payload: string;
}

interface clientData {
    type: string;
    payload: [];
}

interface selectedClient {
    type: string;
    payload: iClient;
}

const clientSlice = createSlice({
    name: "clientSlice",
    initialState: {searchClient: ""} as iClientSlice,
    reducers: {
      setSearchClient(clientState, action: searchString) {        
        clientState.searchClient = action.payload;
      },
      setClientData(clientState, action: clientData) {        
        clientState.clientList = action.payload;
      },
      setSelectedClient(clientState, action: selectedClient) {        
        clientState.selectedClient = action.payload;
      }
    }
  });

const {setSearchClient, setClientData, setSelectedClient} = clientSlice.actions;
const clientSliceReducer = clientSlice.reducer;

export {setSelectedClient, setSearchClient, setClientData, clientSliceReducer};