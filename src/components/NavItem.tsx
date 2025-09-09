import { Link } from "react-router-dom";

interface NavItemProps {
    label:string;
    link:string;
    active:boolean;
}

const NavItem =({label, active, link}:NavItemProps) =>{
    return(        
    <Link to={`/${link}`}>
        <div className={`p-6 hover:cursor-pointer hover:bg-gray-200 hover:border-4 ${active && 'bg-gray-200 border-4 text-gray-500 font-bold'}`}>
            {label}
        </div>
    </Link>);
}

export {NavItem}