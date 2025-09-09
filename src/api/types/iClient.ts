import { iChild } from "./iChild";
import { iParent } from "./iParent";

export interface iClient    {
    family_id: number;
    family_name: string;
    family_street: string;
    family_city: string;
    family_postal:  string;
    family_income: number;
    user_id: number;
    children: iChild[];
    parents:iParent[];
    is_active?:boolean;
}