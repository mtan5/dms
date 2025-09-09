import { useDispatch } from "react-redux";
import { setSelectedChild} from "../../store";
import { iChild } from "../../api/types/iChild";

interface ChildListItemProps{
    child: iChild;
    isSelected: boolean;
}

export function ChildListItem({child, isSelected}: ChildListItemProps){
    const dispatch = useDispatch();
    const onChildClick = (child:iChild) => {  
        dispatch(setSelectedChild(child));
    }

    return (
        <div 
            key={child.child_id} 
            className={`border-2 m-2 p-4 rounded-lg hover:cursor-pointer hover:bg-gray-200 active:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300 ${isSelected && 'bg-gray-200'}`}
            onClick={() => onChildClick(child)}>
            <span className={child.is_active ? "text-black font-bold" : "text-gray-400"}>{child.child_first_name} {child.child_last_name}</span>
        </div>         
    );
}