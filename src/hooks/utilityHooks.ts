import { iChild } from "../api/types/iChild";
import { iParent } from "../api/types/iParent";

const formatPhoneNumber = (phoneNumberString: string) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
}

const formatDate = (date:Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const createParentsWithFamilyId = (parents :iParent[], family_id:number): iParent[] => {
    let newParents:iParent[] = [];
    for(let i=0; i<parents.length; i++){
        newParents.push({
            family_id: family_id,
            parent_first_name :  parents[i].parent_first_name,
            parent_last_name : parents[i].parent_last_name,
            phone_numbers: parents[i].phone_numbers,
            emails: parents[i].emails
        } as iParent);        
    }
    return newParents;
}

const createChildrenWithFamilyId = (children :iChild[], family_id:number): iChild[] => {
    let newChildren:iChild[] = [];
    for(let i=0; i<children.length; i++){
        newChildren.push({
            family_id: family_id,
            child_first_name :  children[i].child_first_name,
            child_last_name : children[i].child_last_name,
            child_birth_date : children[i].child_birth_date
        } as iChild);        
    }
    return newChildren;
}

const formatToMoney=(input:number)=>{    
    if(!input) return input;
    return input.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const addStrCurrDateOnly = (inputDate: string, splitter: string, addDay: number) =>{
    let dateNow = new Date(inputDate);
    if(addDay > 0){        
        dateNow.setDate(dateNow.getDate() + addDay);
    }
    var output = dateNow.toJSON().slice(0,10).replace(/-/g, splitter);
    return output;
}

const addDateOutString = (inputDate: string, splitter: string, addDay: number) => {
    let newDate = new Date(inputDate);
    if(addDay > 0){  
        let ms = newDate.getTime() + (addDay * 86400000);  
        newDate = new Date(ms);
    }    
    var output = newDate.toJSON().slice(0,10).replace(/-/g, splitter);
    return output;    
}

const convertMilitaryToStandard = function(time:string) {
    let timeParts = time.split(":");
    let standardTime = "";
    let intHour = 0;
    if (parseInt(timeParts[0]) > 12) {
        intHour = Number(timeParts[0]) - 12;
        timeParts[0] = (intHour).toString();

        if(intHour < 10){
            timeParts[0] = "0" + (intHour).toString();
        }        
        standardTime = timeParts.join(":") + " PM";
    } else if (parseInt(timeParts[0]) === 12) {
        standardTime = timeParts.join(":") + " PM";
    } else {
        standardTime = timeParts.join(":") + " AM";
    }
  
    return standardTime;
  }

const generateRandomNumber=()=>{
    return (Date.now() + Math.random()).valueOf();
}

const convertToNegative=(input:number)=>{
    return Math.ceil(-Math.abs(input));
}

const addDaystoDate=(input:string, additionaDays: number)=>{
    let outputDate = new Date(input);
    outputDate.setDate(outputDate.getDate() + additionaDays);
    return outputDate;
}

const getYearsAge = (birthDate : Date) => {
    let now = new Date();
    let current_year = now.getFullYear();
    let year_diff = current_year - birthDate.getFullYear();
    let birthday_this_year = new Date(current_year, birthDate.getMonth(), birthDate.getDate());
    let has_had_birthday_this_year = (now >= birthday_this_year);

    return has_had_birthday_this_year
        ? year_diff
        : year_diff - 1;    
}

const getMonthsAge = (birthDate : Date) => {
    let months;
    let now = new Date();
    months = (now.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth();
    months += now.getMonth();
    return months <= 0 ? 0 : months; 
}


export {getMonthsAge, getYearsAge, formatPhoneNumber, formatDate, createParentsWithFamilyId, createChildrenWithFamilyId, formatToMoney, addStrCurrDateOnly, convertMilitaryToStandard, generateRandomNumber, convertToNegative, addDaystoDate, addDateOutString}