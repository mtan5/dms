import { useEffect } from "react";
import { IRootState, setAnnualIncome, setChildAge, setMonthlyCharge, setNavPage } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { formatToMoney } from "../../hooks/utilityHooks";
import Input from "../../components/Input";
import { iSubsidySliceProps } from "../../api/types/iSubsidySLiceProps";
import { GrantTable } from "../../components/subsidy/GrantTable";
import { SubsidyTable } from "../../components/subsidy/SubsidyTable";

const SubsidyPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(setNavPage("calculator"));});
    const {annualIncome, monthlyCharge, childAge, subsidyAmount, grantAmount} = useSelector<IRootState, iSubsidySliceProps>((state) => {
        return state.subsidy;
    });
   
    const onChangeMonthlyCharge = (event:React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(setMonthlyCharge(parseInt(event.target.value)));
    }
    const onChangeAnnualIncome = (event:React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(setAnnualIncome(parseInt(event.target.value)));
    }   
    const onChangeChildAge = (event:React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(setChildAge(parseInt(event.target.value)));
    }    

        
    return (
    <div className="m-8">
        <div className="flex justify-center m-8">
            <h3 className="font-bold text-xl">Subsidy and Grant Calculator</h3>
        </div>
        <div className="flex justify-center m-8">
            <div className="mt-2 me-8"> 
                <div className="ms-1">Daycare Monthly Charge:</div>
                <Input type="number" value={monthlyCharge.toString()} onChange={onChangeMonthlyCharge}/>

                <div className="ms-1 mt-4">Family Annual Income:</div>
                <Input type="number" onChange={onChangeAnnualIncome} value={annualIncome.toString()}/>  

                <div className="ms-1 mt-4">Child Age (in months):</div>
                <Input type="number" onChange={onChangeChildAge} value={childAge.toString()}/>                   

                <hr className="mt-8"/>
                <div className="ms-1 mt-4 grid grid-cols-2">
                    <div>Daycare Fee</div>
                    <div>{`$${formatToMoney(monthlyCharge)}`}</div>
                </div>
                <div className="ms-1 mt-4 grid grid-cols-2">
                    <div>Subsidy</div>
                    <div>{`-$${formatToMoney(subsidyAmount)}`}</div>
                </div>                 
                <div className="ms-1 mt-4 grid grid-cols-2">
                    <div>Grant</div>
                    <div>{`-$${formatToMoney(grantAmount)}`}</div>
                </div>               
                <div className="ms-1 mt-4">Estimated Monthly Payment:</div>
                <div className="border p-2 rounded">{`$${formatToMoney(monthlyCharge - subsidyAmount - grantAmount)}`}</div>                               
            </div>
            <SubsidyTable />
            <GrantTable />                      
        </div>

    </div>);
};

export {SubsidyPage}
