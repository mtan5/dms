import { ClientList } from "../../components/client/ClientList";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, setNavPage, setSearchClient } from "../../store";
import Input from "../../components/Input";
import Panel from "../../components/Panel";
import { iClientSlice } from "../../api/types/iClientSlice";
import { ClientDetails } from "../../components/client/ClientDetails";
import { useEffect } from "react";

export function ClientPage(){  
    const dispatch = useDispatch();
    useEffect(() => {dispatch(setNavPage("client"));});
    
    const {searchClient} = useSelector<IRootState, iClientSlice>((state) => {
        return state.client;
    });
    const {selectedClient} = useSelector<IRootState, iClientSlice>((state) => {
        return state.client;
    });    
    const onSearchClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchClient(event.target.value));
    }
    
    return (
        <div className="grid grid-cols-3 gap-4 mt-5"> 
            <div className="">
                <Panel className="">
                    <div className='flex items-center justify-between'>
                        <div>My Clients</div>
                        <div className="mb-2">
                            Search
                            <Input type="text" value={searchClient} onChange={onSearchClient}/>
                        </div>
                    </div>     
                    <hr className="m-2"/>
                    <ClientList />                   
                </Panel>
            </div>
            <div className="col-span-2">
                <ClientDetails client={selectedClient} />
            </div>
        </div>
    );
}