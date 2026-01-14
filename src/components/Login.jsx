import Header from "./Header";
import {useState, useRef} from 'react';
import { checkValidation } from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './../utils/firebase';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const email = useRef(null);
    const password = useRef(null);

    const handleSignUp = () => {
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
                const user = userCredential.user;
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
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMsg("Invalid-credential");
            });
        }
    }

    return (
        <div>
            <Header />
            <form onSubmit={(e) => e.preventDefault()} className="absolute mx-[36%] z-10 my-30 text-amber-100 p-14 w-auto flex flex-col bg-black/80 gap-4">
                <label className="font-bold text-3xl mb-4">{isSignUp?"Sign Up":"Sign In"}</label>
                {isSignUp && <input className="border-gray-300 border bg-gray-500/50 p-3 w-80 rounded-lg" type="text" placeholder="Name"/>}
                <input ref={email} className="border-gray-300 border bg-gray-500/50 p-3 w-80 rounded-lg" type="email" placeholder="Email"/>
                <input className="absolute top-52 right-20 bg-red-500" type="checkbox"/>
                <input ref={password} className="border-gray-300 border bg-gray-500/50 p-3 w-80 rounded-lg" type="password" placeholder="Password"/>
                <p className="text-red-700 font-bold">{errorMsg}</p>
                <button className="bg-red-700 w-80 p-2 font-bold cursor-pointer" onClick={handleSubmit}>{isSignUp?"Sign Up":"Sign In"}</button>
                <span>{isSignUp?"Already registered? ":"New to netflix? "}<button className="underline cursor-pointer" onClick={handleSignUp}>{isSignUp?" Sign In Now.":" Sign Up Now."}</button></span>
            </form>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/ce462eb6-4d7f-4c9a-9f61-93cb535a64fd/web/IN-en-20260105-TRIFECTA-perspective_5ec818ea-11f4-4bff-a409-8f36e9f9a1e2_small.jpg'/>
        </div>
    )
}

export default Login;