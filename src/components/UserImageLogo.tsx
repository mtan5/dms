import user_educator from '../imgs/user_educator_logo.png';
import user_superadmin from '../imgs/user_superadmin_logo.png';
import { iUserLogin } from '../api/types/iUserLogin';
import { getUserCredentialCookie } from '../hooks/coookieHooks';
import { educator_type_id } from '../hooks/userCategoryHooks';

export function UserImageLogo(){
    let userCookie:iUserLogin = getUserCredentialCookie();   
    let user_image =  user_superadmin;
    if(userCookie.user_type_id === educator_type_id){
        user_image = user_educator;
    }
    return <>
        <img className="h-12 w-auto m-2" alt={userCookie.user_name} src={user_image} />        
    </>;
}