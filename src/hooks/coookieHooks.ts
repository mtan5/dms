import Cookies from 'js-cookie';
import type { iUserLogin } from '../api/types/iUserLogin';

const getUserCredentialCookie = () => {
    let userCookie:iUserLogin = {} as iUserLogin;
    let cookieUserId: string | undefined = Cookies.get("cookieUserId"); 
    let cookieUserName: string | undefined = Cookies.get("cookieUserName");
    let cookieUserTypeId: string | undefined = Cookies.get("cookieUserTypeId");

    if(cookieUserId === undefined || cookieUserName === undefined){
        return userCookie;
    }

    userCookie.user_id = parseInt(cookieUserId ? cookieUserId : "-1");
    userCookie.user_type_id = parseInt(cookieUserTypeId ? cookieUserTypeId : "-1");
    userCookie.user_name = cookieUserName ? cookieUserName : "";

    return userCookie;
}

const setUserCredentialCookie = ({user_id, user_name, user_type_id} : iUserLogin) => {
    Cookies.set('cookieUserId', user_id.toString());
    Cookies.set('cookieUserName', user_name);
    Cookies.set('cookieUserTypeId', user_type_id.toString());
}

const destroyCookie = () => {
    var ans = confirm("Are you sure you want to log out?");
    if(ans){
        Cookies.remove('cookieUserId');
        Cookies.remove('cookieUserName');
        window.location.href = "/";
    }        
}

export {getUserCredentialCookie, setUserCredentialCookie, destroyCookie};