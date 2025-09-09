import { useSelector } from "react-redux";
import { iChild } from "../../api/types/iChild";
import { iChildSlice } from "../../api/types/iChldSlice";
import { IRootState, useFetchAllChildQuery } from "../../store";
import { ChildListItem } from "./ChildListItem";
import Skeleton from "../Skeleton";

interface childListProps {
    user_id:number;
}

export function ChildList({user_id}:childListProps){
    const {selectedChild} = useSelector<IRootState, iChildSlice>((state) => {return state.child;});

    let isClientSelected = false;
    let {data, error, isFetching}  = useFetchAllChildQuery(user_id);
    let childList : iChild[] = data as iChild[];
    
    const {searchChild} = useSelector<IRootState, iChildSlice>((state) => {return state.child;});
    const {} = useSelector<IRootState, iChildSlice>((state) => {
        let search = state.child.searchChild;
        if(search === undefined || search === '') return state.child;        
        childList = childList?.filter((child) => {
            return child.child_last_name.toLowerCase().includes(searchChild.toLowerCase()) 
            || child.child_first_name.toLocaleLowerCase().includes(searchChild.toLowerCase());
        });         
        return state.child;
    });    

    let content;
    if(isFetching) { 
        content = (<div className="p-10">            
                <Skeleton times={4} className="h-10 w-full"/>
            </div>);
    }else if(error) { 
        content = (<><div>Error fetching Child data..</div></>);
    }
    else{ 
        content = childList?.map((child: iChild) => {   
            isClientSelected = false;  
            if(child === selectedChild){isClientSelected = true;}
            return (<ChildListItem isSelected = {isClientSelected} child={child} key={child.child_id}/>);  
        });
    }    

    return <div>{content}</div>;
} 