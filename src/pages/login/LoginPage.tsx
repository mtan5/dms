import Button from "../../components/Button";
import Input from "../../components/Input";
import { GiggleLandImage } from "../../components/GiggleLandImage";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserMutation, setUserName, setPassword, setUserId, IRootState } from "../../store";
import type { iUserLogin } from "../../api/types/iUserLogin";
import { useEffect, useState } from "react";
import MD5 from 'crypto-js/md5';
import { useNavigate } from "react-router-dom";
import { getUserCredentialCookie, setUserCredentialCookie } from "../../hooks/coookieHooks";
import React from "react";

export default function Loginpage(){
    const REACT_VERSION = React.version;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser, {isLoading}] = useFetchUserMutation();
    const [error, setError] = useState<string>("");
    const {user_name, user_password} = useSelector<IRootState, iUserLogin>((state) => {
        return state.userCredentials;
    });

    const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserName(event.target.value));
    }

    const onPasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(event.target.value));
    } 
    
    useEffect(() => {
        let userCookie:iUserLogin = getUserCredentialCookie(); 
        if(userCookie.user_id !== undefined){
            navigate('/');
        }        
    });

    const onLogin = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(user_name === '' || user_name === undefined || user_password==='' || user_password=== undefined){
            setError("Please provide your username and/or password");
            return;
        }

        let user: iUserLogin = {
            user_name:user_name,
            user_password:MD5(user_password).toString(),
            user_id: -1,
            user_type_id: -1
        };

        loginUser(user)
        .unwrap()
        .then((data:iUserLogin) => {
            if(!data || data === undefined || (Array.isArray(data) && data.length === 0)){                
                setError("Login Failed...");
            }
            else{
                setError("");
                setUserCredentialCookie(data);
                navigate('/');
            }                                  
            dispatch(setUserName(""));
            dispatch(setPassword(""));
            dispatch(setUserId(data.user_id)); 
        })
        .catch((err) =>{
            console.log(err);
            setError("Username / Password Denied...");
        });        
    };        
    
    return (
    <>
    <div className="container mt-24 grid grid-cols-2 gap-4">
        <div className="col-span-1 mt-14 w-1/3 ml-auto">
            <form onSubmit={onLogin}>
                <div>
                    <div className="">Username</div> 
                    <div><Input value={user_name || ''} type="text" onChange={onUserNameChange}/></div>
                </div>
                <div>
                    <div>Password</div> 
                    <div><Input value={user_password || ''} type="password" onChange={onPasswordChange}/></div>            
                </div>
                <div className="m-2 grid justify-end">
                    <Button primary loading={isLoading}>Login</Button>
                </div> 
                <div className="text-l text-rose-500 font-bold">{error}</div>
            </form>          
        </div>
        <div className="col-span-1">
            <GiggleLandImage />
        </div>        
    </div>
    <div className="border m-auto w-3/6 rounded-md mt-10 p-10 italic text-gray-400">
        If you wish to access this app, use the followng login credentials:
        <ul className="ml-5 mt-5">
            <li><b>Username:</b> educator01</li>
            <li><b>Password:</b> guestme05</li>
            <li><b>REACT VERSION:</b> {REACT_VERSION}</li>
        </ul>
    </div>
    </>);
}