import { iChild } from "../../api/types/iChild";
import { iGrant } from "../../api/types/iGrant";
import { iSubsidy } from "../../api/types/iSubsidy";
import { computeGrant, computeSubsidy } from "../../hooks/clientChildHooks";
import { addDaystoDate, formatToMoney, getMonthsAge} from "../../hooks/utilityHooks";
import { useFetchAllGrantsQuery, useFetchAllSubsidiesQuery } from "../../store";
import { RecordLabelValue } from "../RecordLabelValue";

interface ClientChildrenProp {
    clientChildren: iChild[];
    familyAnnualIncome: number;
}

export function ClientChildren({clientChildren, familyAnnualIncome}: ClientChildrenProp){
    const monhtlyCharge = import.meta.env.VITE_monthyl_daycare_charge;
    const subsidyQuery = useFetchAllSubsidiesQuery();
    const grantQuery = useFetchAllGrantsQuery();
    let rendered;
    let birthdate = "";
    let ageMonths = 0;        
    let estimatedFee=0;
    let subsidy=computeSubsidy(familyAnnualIncome, subsidyQuery.data as iSubsidy[]);
    let grant=computeGrant(ageMonths, grantQuery.data as iGrant[]);
    estimatedFee = monhtlyCharge - subsidy - grant;

    rendered = clientChildren.map((child) => {
        if(child.child_birth_date){
            let childDateOfBirth = addDaystoDate(child.child_birth_date, 1);
            birthdate = new Date(childDateOfBirth).toDateString();
            ageMonths = getMonthsAge(childDateOfBirth);
        }
        return(            
            <div key={child.child_id} className="w-auto border rounded-md p-5">
                <RecordLabelValue label="Full name:" value={`${child.child_first_name} ${child.child_last_name}`} />                
                <RecordLabelValue label="Date of birth:" value={birthdate} />
                <RecordLabelValue label="Age (months):" value={`${ageMonths.toString()} months old`} />
                <RecordLabelValue label="Estimated Fee: " value={`$${formatToMoney(estimatedFee)}`} />
                <div className="border rounded w-75 p-2">                          
                    <RecordLabelValue label="Monthly Charge:" value={`$${formatToMoney(parseInt(monhtlyCharge)).toString()}`} />
                    <RecordLabelValue label="Subsidy:" value={`-$${formatToMoney(subsidy)}`} />
                    <RecordLabelValue label="Grant:" value={`-$${formatToMoney(grant)}`} />
                    <RecordLabelValue label="Estimated Fee:" value={`$${formatToMoney(estimatedFee)}`} />
                </div>
            </div>
        );
    });

    return (
    <>
        <div className="text-gray-500 text-xl flex items-center justify-between">
            Registered Children(s)            
        </div>
        <div className="grid gap-1 grid-cols-2 mt-2">
            {rendered}
        </div>        
    </>
    );
}