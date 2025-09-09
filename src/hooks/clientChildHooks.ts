import { iGrant } from "../api/types/iGrant";
import { iSubsidy } from "../api/types/iSubsidy";

const computeSubsidy=(income: number, data: iSubsidy[])=>{
    let sibsidy = 0;    
    if(!data || data.length <=0) return 0;
    data = data?.filter((item) => {
        if(income >= item.subsidy_income_from && income <=item.subsidy_income_to){                
            sibsidy=item.subsidy_amount;
            return item;        
        }            
    });
    return sibsidy;
}

const computeGrant=(ageMonths: number, data: iGrant[])=>{
    let grant = 0;
    if(!data || data.length <=0 ) return 0;
    data = data?.filter((item) => {
        if(ageMonths >= item.grant_start && ageMonths <=item.grant_end){                
            grant=item.grant_amount;
            return item;        
        }            
    });
    return grant;
}

export {computeSubsidy, computeGrant}