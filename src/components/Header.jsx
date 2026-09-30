import { signOut } from "firebase/auth";
import { auth } from "./../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../redux/userSlice";
import {
  updateVisibility,
  emptyUserSearchData,
  updateShimmerVisibility,
} from "../redux/gptSlice";
import { PROFILE_LOGO, LOGO } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const visibility = useSelector((store) => store.gpt.visibility);
  const [scrolled, setScrolled] = useState(false);

  const handleGptClick = () => {
    dispatch(updateVisibility());
    dispatch(updateShimmerVisibility(false));
    if (visibility) dispatch(emptyUserSearchData());
  };

  const handleSignOut = () => {
    signOut(auth).catch(() => {});
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unSubscribe();
  }, [dispatch, navigate]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-3 transition-colors duration-300 md:px-12 ${
        userData || scrolled
          ? "bg-black/90 backdrop-blur-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <img src={LOGO} className="w-28 md:w-40" alt="NetflixGPT" />

      {userData && (
        <div className="flex items-center gap-3 md:gap-5">
          <button
            type="button"
            className={`h-9 rounded-md px-3 text-sm font-semibold transition-all md:h-10 md:px-5 ${
              visibility
                ? "bg-white text-black hover:bg-neutral-200"
                : "bg-[#E50914] text-white hover:bg-red-700"
            }`}
            onClick={handleGptClick}
          >
            {visibility ? "Home" : "GPT Search"}
          </button>

          <div className="flex items-center gap-2">
            <img
              className="h-8 w-8 rounded object-cover md:h-9 md:w-9"
              src={PROFILE_LOGO}
              alt=""
            />
            <div className="hidden sm:block">
              <p className="max-w-28 truncate text-xs font-medium text-white md:max-w-40 md:text-sm">
                {userData.displayName || "Member"}
              </p>
              <button
                type="button"
                className="text-xs text-neutral-300 hover:underline"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
            <button
              type="button"
              className="text-xs font-semibold text-white hover:underline sm:hidden"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
