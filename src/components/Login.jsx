import Header from "./Header";
import {useState, useRef} from 'react';
import { checkValidation } from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from './../utils/firebase';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {addUser} from './../redux/userSlice';
import {BG} from './../utils/constant';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = () => {
      setErrorMsg("");
      setIsSignUp(!isSignUp);
    }
    const handleSubmit = () => {
        const message = checkValidation(email.current.value, password.current.value);
        setErrorMsg(message);
        if(message !== null) return;
        if(isSignUp) 
        {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: name.current.value
                    }).then(() => {
                        const {uid, email, displayName} = auth.currentUser;
                        dispatch(addUser({uid,email,displayName}));                  
                    }).catch((error) => {
                    setErrorMsg(error.errorCode + " - " +error.errorMessage);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg(errorCode + " - " +errorMessage);
            });
        }
        else {
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                // Signed in 
                navigate('/browse');     
                // ...
            })
            .catch(() => {
            setErrorMsg("Invalid-credential");
            });
        }
    }

    return (
        <div>
            <Header />
            <form onSubmit={(e) => e.preventDefault()} className="absolute mx-11 md:mx-[36%] z-50 mt-55 md:my-30 text-amber-100 p-9 md:p-14 flex flex-col bg-black/80 gap-4">
                <label className="font-bold text-3xl mb-4">{isSignUp?"Sign Up":"Sign In"}</label>
                {isSignUp && <input ref={name} className="border-gray-300 border bg-gray-500/50 p-3 w-60 md:w-80 rounded-lg" type="text" placeholder="Name"/>}
                <input ref={email} className="border-gray-300 border bg-gray-500/50 p-3 w-60 md:w-80 rounded-lg" type="email" placeholder="Email"/>
                <input ref={password} className="border-gray-300 border bg-gray-500/50 p-3 w-60 md:w-80 rounded-lg" 
                    type={passwordVisibility?"text":"password"} placeholder="Password"/>
                <input className={isSignUp?"absolute top-64 left-58 md:top-69 md:left-85":"absolute top-48 left-60 md:top-52 md:left-85"} type="checkbox" onChange={(e) => setPasswordVisibility(e.target.checked)}/>                    
                <p className="text-red-700 font-bold">{errorMsg}</p>
                <button className="bg-red-700 w-60 md:w-80 p-2 font-bold cursor-pointer" onClick={handleSubmit}>{isSignUp?"Sign Up":"Sign In"}</button>
                <span>{isSignUp?"Already registered? ":"New to netflix? "}<button className="underline cursor-pointer" onClick={handleSignUp}>{isSignUp?" Sign In Now.":" Sign Up Now."}</button></span>
            </form>
            <img src={BG} className="md:h-screen md:w-screen object-cover h-screen "/>
        </div>
    )
}

export default Login;