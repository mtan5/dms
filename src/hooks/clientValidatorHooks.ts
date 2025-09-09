import { iChild } from "../api/types/iChild";
import { iClientForm } from "../api/types/iClientForm"
import { iParent } from "../api/types/iParent";

const validateClient = (client:iClientForm):string[] => {
    let errors : string[] = [];    

    if(!client.familyName){
        errors.push("Family Name is required!");
    }
    if(client.familyName.length > 31){
        errors.push("Maximum 31 characters length exceeded!");
    }     

    if(!client.street){
        errors.push("Street is required!");
    }
    if(client.street.length > 31){
        errors.push("Maximum 31 characters length exceeded!");
    }    

    if(!client.city){
        errors.push("City is required!");
    } 
    if(client.city.length > 15){
        errors.push("Maximum 15 characters length exceeded!");
    }
    
    if(!client.postal){
        errors.push("Postal is required!");
    }
    if(client.postal.length > 6){
        errors.push("Maximum 6 characters length exceeded!");
    }    

    if(client.postal){
        let isValidPostal = validateCAPostal(client.postal);
        if(!isValidPostal){
            errors.push("Invalid Postal code!");
        }
    }
    
    if(!client.income || client.income <=0){
        errors.push("Income is required!");
    }   
    
    if(!client.parents || client.parents.length <= 0){
        errors.push("Must provide at least one (1) parent!");
    }

    if(!client.children || client.children.length <= 0){
        errors.push("Must provide at least one (1) child!");
    }    
    
    return errors;
} 

const validateCAPostal = (value:string) => {
    const regex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    if(!value){ return "*"}
    if(value.length > 6) {return "Mximum 6 characters exceeded."; }
    var match = regex.exec(value);
    if (!match){
        return false;
    }
    return true;
}

const validatePhoneNumber = (value:string):string => {
    const regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    var match = regex.exec(value);
    if(!value){ return "*"}
    if(value.length > 15) {return "Mximum 15 characters exceeded."; }
    if (!match){
        return "Invalid!";
    }
    return "";    
}

const validateName = (name:string) => {
    if(!name){ return "*"}
    if(name.length > 31) {return "Mximum 31 characters exceeded."; }
    return "";
}

const validateDate = (date:string) => {    
    if(!date){ return "*"}
    if(date.length > 18) {return "Invalid!";}
    let isValid = isValidDateFormat(date, "YYYY-MM-DD");
    
    if(!isValid){
        return "Invallid!";
    }
    return "";
}

const validateChildRecords = (children: iChild[], newChild: iChild) => {
    let isExisting = false;
    for (let i = 0; i < children.length; i++) {
    
        let arePropertiesSimilar = (
            children[i].child_first_name.toLowerCase() === newChild.child_first_name.toLowerCase()
            && children[i].child_last_name.toLowerCase() === newChild.child_last_name.toLowerCase());

        if(arePropertiesSimilar){            
            isExisting = true;
            break;
        }
    }

    if(isExisting){
        return "Dubplicate record!";
    }
    return "";
}

const validateParentRecords = (parents: iParent[], newParent: iParent) => {
    let isExisting = false;
    for (let i = 0; i < parents.length; i++) {
        
        let arePropertiesSimilar = (
            parents[i].parent_first_name.toLowerCase() === newParent.parent_first_name.toLowerCase()
            && parents[i].parent_last_name.toLowerCase() === newParent.parent_last_name.toLowerCase());

        if(arePropertiesSimilar){            
            isExisting = true;
            break;
        }
    }

    if(isExisting){
        return "Duplicate record!";
    }
    return "";
}

const validateEmail = (email:string) =>{    
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!email){ return "*"}
    if(email.length > 127) {return "Mximum 127 characters exceeded."; }
    
    var match = regex.exec(email);
    if (!match){
        return "Invalid!";
    }    
    return "";
}

const isValidDateFormat = (dateString:string, inputFormat:string) => {
    let regex;

    // Define regex patterns for different date formats
    switch (inputFormat) {
        case 'YYYY-MM-DD':
            regex = /^\d{4}-\d{2}-\d{2}$/;
            break;
        case 'DD/MM/YYYY':
            regex = /^\d{2}\/\d{2}\/\d{4}$/;
            break;
        case 'MM-DD-YYYY':
            regex = /^\d{2}-\d{2}-\d{4}$/;
            break;
        default:
            return false; // Unsupported format
    }

    // Check if dateString matches the regex
    if (!regex.test(dateString)) return false;

    // Parse date parts based on the format
    let day, month, year;
    switch (inputFormat) {
        case 'YYYY-MM-DD':
            [year, month, day] = dateString.split('-').map(Number);
            month--; // JS months are 0-based
            break;
        case 'DD/MM/YYYY':
            [day, month, year] = dateString.split('/').map(Number);
            month--;
            break;
        case 'MM-DD-YYYY':
            [month, day, year] = dateString.split('-').map(Number);
            month--;
            break;
    }

    // Create a Date object and validate
    const date = new Date(year, month, day);
    return date.getFullYear() === year && 
           date.getMonth() === month && 
           date.getDate() === day;
}

export {validateClient, validateCAPostal, validatePhoneNumber, validateName, validateEmail, validateDate, isValidDateFormat, validateChildRecords, validateParentRecords}