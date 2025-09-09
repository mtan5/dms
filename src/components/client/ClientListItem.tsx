import { useDispatch } from "react-redux";
import { iClient } from "../../api/types/iClient";
import { setSelectedClient } from "../../store";

interface ClientListItemProps{
    client: iClient;
    isSelected: boolean;
}

export function ClientListItem({client, isSelected}: ClientListItemProps){
    const dispatch = useDispatch();
    const onClientClick = (client:iClient) => {  
        dispatch(setSelectedClient(client));
    }

    return (
    <div 
        key={client.family_id} 
        className={`border-2 m-2 p-4 rounded-lg hover:cursor-pointer hover:bg-gray-200 active:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300 ${isSelected && 'bg-gray-200'}`}
        onClick={() => onClientClick(client)}>
        <span className={client.is_active ? "text-black font-bold" : "text-gray-400"}>{client.family_name}</span>
    </div>         
    );
}