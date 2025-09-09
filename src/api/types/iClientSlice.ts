import { iClient } from "./iClient";

export interface iClientSlice{
    searchClient: string;
    clientList: [];
    selectedClient: iClient;
}