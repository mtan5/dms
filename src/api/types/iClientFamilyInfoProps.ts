export interface ClientFamilyInfoProps{
    family_name: string;
    street: string;
    city: string;
    postal: string;
    income: number;
    onFamilyNameChange: Function;
    onStreetChange:Function;
    onCityChange:Function;
    onPostalChange:Function;
    onIncomeChange:Function;
}