import { iEmail } from "./iEmail";
import { iPhone } from "./iPhone";

export interface iParent{
    parent_id: number;
    parent_first_name: string;
    parent_last_name: string;
    family_id: number;
    phone_numbers:iPhone[];
    emails: iEmail[];
}