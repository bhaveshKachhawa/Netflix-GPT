import { signOut } from "firebase/auth";
import {auth} from './../utils/firebase';
import { useDispatch , useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../redux/userSlice';
import { updateVisibility, emptyUserSearchData, updateShimmerVisibility } from "../redux/gptSlice";
import { PROFILE_LOGO, LOGO } from "../utils/constant";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);
    const visibility = useSelector((store) => store.gpt.visibility);

    const handleGptClick = () => {
        dispatch(updateVisibility());
        dispatch(updateShimmerVisibility(false));
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
    <div className="absolute top-0 left-0 w-full z-50 flex flex-col md:flex-row md:justify-between items-start px-4 py-3">
        <div className="fixed inset-0 bg-black/30 bg-linear-to-b from-black/60 via-transparent to-black/60 -z-10 pointer-events-none"></div>
        <div className="z-50 md:px-30">
            <img src={LOGO} className="w-40 md:w-48" alt="logo" />
        </div>
        {userData && (
            <div className="relative z-[100] flex items-center justify-start md:justify-between w-full md:w-auto mt-4 px-4 pointer-events-auto">
                <button 
                    className="bg-white h-10 px-4 md:px-6 rounded-lg text-black hover:bg-gray-200 cursor-pointer active:scale-95 transition-all" 
                    onClick={() => {
                        handleGptClick();
                    }}
                >
                    {visibility ? "Home" : "GPT Search"}
                </button>
                
                <div className="flex items-center ml-4">
                    <img className='w-10 h-10 rounded-md object-cover' src={PROFILE_LOGO} alt="user" />
                    <button 
                        className="ml-2 font-bold text-white hover:underline cursor-pointer" 
                        onClick={() => {
                            handleSignOut();
                        }}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        )}
    </div>
);
}

export default Header;