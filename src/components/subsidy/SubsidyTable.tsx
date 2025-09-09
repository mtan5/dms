import Table from "../Table";
import { useDispatch, useSelector } from "react-redux";
import { iSubsidy } from "../../api/types/iSubsidy";
import { formatToMoney } from "../../hooks/utilityHooks";
import { IRootState, setSubsidyAmount, useFetchAllSubsidiesQuery } from "../../store";
import { iSubsidySliceProps } from "../../api/types/iSubsidySLiceProps";
import { useEffect } from "react";

const SubsidyTable = () => {
    let currentSubsidyAmount = 0;
    const dispatch = useDispatch();
    let {data} = useFetchAllSubsidiesQuery();
    const {} = useSelector<IRootState, iSubsidySliceProps>((state) => {
        let income = state.subsidy.annualIncome;            
        if(!income || income === undefined || income <= 0) {return state.subsidy;}
        data = data?.filter((item) => {
            if(income >= item.subsidy_income_from && income <=item.subsidy_income_to){                
                currentSubsidyAmount=item.subsidy_amount;
                return item;        
            }            
        });
        return state.subsidy;
    }); 

    useEffect(() => {
        dispatch(setSubsidyAmount(currentSubsidyAmount));    
    }, [currentSubsidyAmount]);

    const subsidyTableConfig = [
        {
            label:'Amount From',  
            render: (item:iSubsidy) => `$${formatToMoney(item.subsidy_income_from)}`
                
        },
        {
            label:'Amount To',  
            render: (item:iSubsidy) => `$${formatToMoney(item.subsidy_income_to)}`
        }        
        ,{
            label:'Subsidy Amount',
            render: (item:iSubsidy) => `$${formatToMoney(item.subsidy_amount)}`
        }
    ]; 

    return (
        <div className="ms-8">
            Alberta Provincial Subsidy
            <Table data={data as iSubsidy[]} config={subsidyTableConfig}/>
        </div>        
    );
}

export {SubsidyTable}