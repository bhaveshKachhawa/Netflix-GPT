import { signOut } from "firebase/auth";
import {auth} from './../utils/firebase';
import { useDispatch , useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../redux/userSlice';
import { updateVisibility, emptyUserSearchData } from "../redux/gptSlice";
import { PROFILE_LOGO, LOGO } from "../utils/constant";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);
    const visibility = useSelector((store) => store.gpt.visibility);

    const handleGptClick = () => {
        dispatch(updateVisibility());
        if(visibility) dispatch(emptyUserSearchData());
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
        if (user){
            const {uid, email, displayName} = auth.currentUser;
            dispatch(addUser({uid,email,displayName}));
            navigate('/browse');        
        }
        else {
            dispatch(removeUser());
            navigate('/');
        }
    });

    return () => {
        unSubscribe();
    }
    }, []);

    return (
        <div className="absolute mx-40 my-2 z-10 flex justify-between h-20 w-[88%]">
            <img src={LOGO} className="z-10"/>
            <div className="pointer-events-none fixed inset-0 bg-black/30  bg-linear-to-b from-black/60 via-transparent to-black/60"></div>
            {userData &&
                      <div className="flex">
                      <button className="bg-white h-10 self-center px-4 rounded-lg opacity-70 cursor-pointer text-black hover:opacity-60" onClick={handleGptClick}>{visibility?"Home":"GPT Search"}</button>
                      <img className='ml-auto scale-50 mt-0' src={PROFILE_LOGO} />
                      <button className="mr-2 font-bold cursor-pointer  opacity-70 hover:opacity-60 text-white" onClick={handleSignOut}>Sign out</button></div>}
        </div>
    )
}

export default Header;