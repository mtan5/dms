import { ClientFamilyInfoProps } from "../../../api/types/iClientFamilyInfoProps";
import { NewInputClientRecord } from "./NewInputClientRecord";

export function ClientNewFamilyInfo({family_name="", street="", city="", postal="", income=0, onFamilyNameChange, onStreetChange, onCityChange, onPostalChange, onIncomeChange}: ClientFamilyInfoProps){
    return (
        <>            
            <h3 className="font-bold mb-4">Family Information</h3>
            <NewInputClientRecord label="Name" inputMaxLength={31} value={family_name} onChange={onFamilyNameChange} />
            <NewInputClientRecord label="Street" inputMaxLength={31} value={street} onChange={onStreetChange} />
            <NewInputClientRecord label="City"  inputMaxLength={15} value={city} onChange={onCityChange} />
            <NewInputClientRecord label="Postal" inputMaxLength={31} value={postal} onChange={onPostalChange} />
            <NewInputClientRecord label="Income"  inputMaxLength={10} inputType="number" value={income?.toString()} onChange={onIncomeChange} />
        </>
    );
}