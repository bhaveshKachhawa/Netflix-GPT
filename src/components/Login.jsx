import Header from "./Header";
import { useState, useRef } from 'react';
import { checkValidation } from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from './../utils/firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from './../redux/userSlice';
import { BG } from './../utils/constant';

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
        if (message !== null) return;
        if (isSignUp) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: name.current.value
                    }).then(() => {
                        const { uid, email, displayName } = auth.currentUser;
                        dispatch(addUser({ uid, email, displayName }));
                    }).catch((error) => {
                        setErrorMsg(error.errorCode + " - " + error.errorMessage);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + " - " + errorMessage);
                });
        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    navigate('/browse');
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
                <label className="font-bold text-3xl mb-4">{isSignUp ? "Sign Up" : "Sign In"}</label>
                
                {isSignUp && <input ref={name} className="border-gray-300 border bg-gray-500/50 p-3 w-60 md:w-80 rounded-lg" type="text" placeholder="Name" />}
                
                <input ref={email} className="border-gray-300 border bg-gray-500/50 p-3 w-60 md:w-80 rounded-lg" type="email" placeholder="Email" />
                
                {/* Password field with SVG Eye toggle */}
                <div className="relative w-60 md:w-80">
                    <input 
                        ref={password} 
                        className="border-gray-300 border bg-gray-500/50 p-3 w-full rounded-lg pr-12" 
                        type={passwordVisibility ? "text" : "password"} 
                        placeholder="Password" 
                    />
                    <div 
                        className="absolute right-3 top-3 cursor-pointer text-gray-300 hover:text-white transition-colors"
                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                    >
                        {passwordVisibility ? (
                            // Eye with slash (Hide)
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-2.228-2.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        ) : (
                            // Normal Eye (Show)
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12.008a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )}
                    </div>
                </div>

                <p className="text-red-700 font-bold">{errorMsg}</p>
                
                <button className="bg-red-700 w-60 md:w-80 p-2 font-bold cursor-pointer" onClick={handleSubmit}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </button>
                
                <span>
                    {isSignUp ? "Already registered? " : "New to netflix? "}
                    <button className="underline cursor-pointer" onClick={handleSignUp}>
                        {isSignUp ? " Sign In Now." : " Sign Up Now."}
                    </button>
                </span>
            </form>
            <img src={BG} className="md:h-screen md:w-screen object-cover h-screen " alt="background" />
        </div>
    )
}

export default Login;