import { useDispatch } from "react-redux";
import { setNavPage } from "../../store";
import { useEffect } from "react";

const ProfilePage = () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(setNavPage("profile"));});    
    return <div className="m-4">
        <div className="flex m-4">
            <h3 className="font-bold text-xl">My Profile</h3>
        </div>
    </div>
}

export {ProfilePage} 
