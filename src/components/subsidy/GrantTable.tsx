import { useDispatch, useSelector } from "react-redux";
import { iGrant } from "../../api/types/iGrant";
import { formatToMoney } from "../../hooks/utilityHooks";
import { IRootState, setGrantAmount, useFetchAllGrantsQuery } from "../../store";
import Table from "../Table";
import { iSubsidySliceProps } from "../../api/types/iSubsidySLiceProps";
import { useEffect } from "react";

const GrantTable = () => {
    let currentGrantAmount = 0;
    const dispatch = useDispatch();
    let {data}  = useFetchAllGrantsQuery();
    const {} = useSelector<IRootState, iSubsidySliceProps>((state) => {
        let age = state.subsidy.childAge;
        if(!age || age === undefined || age <= 0) {return state.subsidy;}
        data = data?.filter((item) => {
            if(age >= item.grant_start && age <=item.grant_end){                
                currentGrantAmount=item.grant_amount;
                return item;        
            }            
        });                             
        return state.subsidy;
    });

    useEffect(() => {
        dispatch(setGrantAmount(currentGrantAmount));
    }, [currentGrantAmount]);    
    const grantTableConfig = [
        {
            label:'Age from',  
            render: (item:iGrant) =>`${item.grant_start} (months)`
                
        },
        {
            label:'Age to',  
            render: (item:iGrant) => `${item.grant_end} (months)`
        }        
        ,{
            label:'Grant Amount',
            render: (item:iGrant) => `$${formatToMoney(item.grant_amount)}`
        }
    ];    
    
    return (
        <div className="ms-8">
            Canada Federal Grant
            <Table data={data as iGrant[]} config={grantTableConfig}/>
        </div>          
    );
}

export {GrantTable}