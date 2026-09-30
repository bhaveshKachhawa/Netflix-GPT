import Header from "./Header";
import Footer from "./Footer";
import { useState, useRef } from "react";
import { checkValidation } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "./../redux/userSlice";
import { BG } from "./../utils/constant";

const friendlyAuthError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Sign in instead.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/weak-password":
      return "Password is too weak. Try a stronger one.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    setErrorMsg("");
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async () => {
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value;

    if (isSignUp) {
      const message = checkValidation(emailValue, passwordValue);
      if (message !== null) {
        setErrorMsg(message);
        return;
      }
      if (!name.current.value.trim()) {
        setErrorMsg("Please enter your name.");
        return;
      }
    } else if (!emailValue || !passwordValue) {
      setErrorMsg("Enter your email and password to continue.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
        await updateProfile(auth.currentUser, {
          displayName: name.current.value.trim(),
        });
        const { uid, email: userEmail, displayName } = auth.currentUser;
        dispatch(addUser({ uid, email: userEmail, displayName }));
      } else {
        await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      }
    } catch (error) {
      setErrorMsg(friendlyAuthError(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <img
        src={BG}
        className="fixed inset-0 h-full w-full object-cover"
        alt=""
      />
      <div className="fixed inset-0 bg-black/60" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-16 pt-28">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex w-full max-w-md flex-col gap-4 rounded-md bg-black/80 p-8 text-white shadow-2xl md:p-12"
        >
          <h1 className="mb-2 text-3xl font-bold">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h1>
          <p className="mb-2 text-sm text-neutral-400">
            Portfolio project with AI movie search. Create a free account to
            explore the browse page.
          </p>

          {isSignUp && (
            <input
              ref={name}
              className="w-full rounded-md border border-neutral-600 bg-neutral-800/80 p-3 outline-none placeholder:text-neutral-400 focus:border-white"
              type="text"
              placeholder="Name"
              autoComplete="name"
            />
          )}

          <input
            ref={email}
            className="w-full rounded-md border border-neutral-600 bg-neutral-800/80 p-3 outline-none placeholder:text-neutral-400 focus:border-white"
            type="email"
            placeholder="Email"
            autoComplete="email"
          />

          <div className="relative w-full">
            <input
              ref={password}
              className="w-full rounded-md border border-neutral-600 bg-neutral-800/80 p-3 pr-12 outline-none placeholder:text-neutral-400 focus:border-white"
              type={passwordVisibility ? "text" : "password"}
              placeholder="Password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />
            <button
              type="button"
              aria-label={passwordVisibility ? "Hide password" : "Show password"}
              className="absolute right-3 top-3 cursor-pointer text-neutral-300 hover:text-white"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              {passwordVisibility ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-2.228-2.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12.008a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>

          {isSignUp && (
            <p className="text-xs text-neutral-500">
              Password must be 6–16 characters and include a letter, number, and
              special character.
            </p>
          )}

          {errorMsg && (
            <p className="text-sm font-medium text-red-500">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#E50914] p-3 font-bold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait…" : isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <p className="text-neutral-400">
            {isSignUp ? "Already registered? " : "New to NetflixGPT? "}
            <button
              type="button"
              className="font-medium text-white underline-offset-2 hover:underline"
              onClick={handleSignUp}
            >
              {isSignUp ? "Sign In Now." : "Sign Up Now."}
            </button>
          </p>
        </form>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
