import {Link } from 'react-router-dom';
import { HeaderImageLogo } from './HeaderImageLogo';
import {destroyCookie, getUserCredentialCookie} from '../hooks/coookieHooks';
import type { iUserLogin } from '../api/types/iUserLogin';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState, setUserName, setUserId } from '../store';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { NavItem } from './NavItem';
import { UserImageLogo } from './UserImageLogo';
import { educator_type_id } from '../hooks/userCategoryHooks';

export default function Header(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let isHomeActive = false;
    let isAttendanceActive = false;
    let isCalculatorActive = false;
    let isProfileActive = false;
    let userCookie:iUserLogin = getUserCredentialCookie();    
    const {user_name, user_id} = useSelector<IRootState, iUserLogin>((state) => {
        return state.userCredentials;
    });
    const {currPage} = useSelector<IRootState, {currPage: string}>((state) => {
        return state.navPage;
    });

    useEffect(() => {
        if(userCookie.user_id !== undefined){
            dispatch(setUserName(userCookie.user_name));
            dispatch(setUserId(userCookie.user_id));                
        }
        else{
            navigate('/login');
        }
    },[user_name, user_id]);

    if(userCookie.user_type_id === educator_type_id){
        if (currPage === 'client'){
            isHomeActive = true;
            isAttendanceActive = false;
            isCalculatorActive = false;
            isProfileActive = false;
        };
        if (currPage === 'attendance'){
            isHomeActive = false;
            isAttendanceActive = true;
            isCalculatorActive = false;
            isProfileActive = false;
        };
        if (currPage === 'calculator'){
            isHomeActive = false;
            isAttendanceActive = false;
            isCalculatorActive = true;
            isProfileActive = false;
        };
        if (currPage === 'profile'){
            isHomeActive = false;
            isAttendanceActive = false;
            isCalculatorActive = false;
            isProfileActive = true;
        }; 
    }   

    const header = (
        <div className="grid grid-cols-5 gap-4 px-4 border-b h-20">
            <div className="col-span-1 flex items-center space-x-16 text-sm">
                <Link to="/" className="text-lg font-bold flex items-center" >
                    <HeaderImageLogo/>
                    Giggle Land Daycare System
                </Link>
            </div>  
            <div className="col-span-3 flex items-center space-x-0 text-base">
                    <NavItem label="Home" active={isHomeActive} link=""/>
                    <NavItem label="Attendance" active={isAttendanceActive} link="attendance"/>
                    <NavItem label="Subsidy Calculator" active={isCalculatorActive} link="calculator"/>
                    <div className={`p-6 hover:cursor-pointer hover:bg-gray-200 hover:border-4`} onClick={destroyCookie}>Logout</div>
                </div>            
            <div className="col-span-1 w-full max-w-xl ml-4">
                <Link to="/profile" className="text-sm flex items-center">
                    <div>{user_name}</div>
                    <UserImageLogo />                    
                </Link>                                    
            </div>             
                               
        </div>);        
    const rendered = userCookie.user_id !== undefined && header;
    return (<div>{rendered}</div>);
}
