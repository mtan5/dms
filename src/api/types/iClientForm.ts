import { iChild } from "./iChild";
import { iParent } from "./iParent";

export interface iClientForm{
    parents: iParent[];
    children: iChild[];
    familyName: string;
    street: string;
    city: string;
    postal: string;   
    income: number;  
    errors?: string[];
    family_id?: number;
}