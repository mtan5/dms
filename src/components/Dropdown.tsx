import { useEffect, useState, useRef} from "react";
import { IoCaretDown } from "react-icons/io5";
import Panel from "./Panel";

interface DropDownProps {
    options : dropdownItem[],
    onChange: Function,
    value: dropdownItem
}

interface dropdownItem {text:string, value:string}

function Dropdown({ options, onChange, value }:DropDownProps) {    
    const [isShowOptions, setOptionVisibility] = useState(false);
    const onOptionItemClick = (optionItem: dropdownItem) => {
        onChange(optionItem); 
        setOptionVisibility(!isShowOptions);        
    }

    const dropDownElement = options.map((option, index) => {
        return (
            <div className="hover:bg-sky-100 rounded cursor-pointer p-1" onClick={() => {onOptionItemClick(option);}} key={index}>                
                <div>{option.text}</div>                
            </div>
        );
    });

    const onDropDownClick = () => {
        setOptionVisibility(!isShowOptions);
    };

    //let selectedLabel = 'Select...';
    //if(selected){
    //    selectedLabel = selected.text;
    //}

    let selectedLabel = value?.text || 'Select';

    //run a function at a certain point of time
    const element = useRef<HTMLDivElement>(null);
    useEffect(() => {    
        if(!element.current){return;}
        const dropdown = element.current;
        const onClickHandler = (event: MouseEvent | TouchEvent) => {            
            if(!dropdown.contains(event.target as Element)){
                setOptionVisibility(false);
            }            
        };

        document.addEventListener('click', onClickHandler);

        return () => {
            //remove the listener when the page reloads
            document.removeEventListener('click', onClickHandler);        
        };
    }, []);
    
    return(
    <div ref={element} className="w-48 relative">    
        <Panel className="flex justify-between items-center cursor-pointer" onClick={onDropDownClick}>
            {selectedLabel}
            <IoCaretDown />
        </Panel>
        {isShowOptions && <Panel className="absolute top-full">{dropDownElement}</Panel>}
    </div>);
}

export default Dropdown;
