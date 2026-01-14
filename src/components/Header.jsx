import { signOut } from "firebase/auth";
import {auth} from './../utils/firebase';
import { useDispatch } from "react-redux";
import {removeUser} from './../redux/userSlice';
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser());
            navigate('/');
        }).catch((error) => {
        });
    }

    return (
        <div className="absolute mx-40 my-2 z-10 flex justify-between h-20 w-[88%]">
            <img src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' />
            <div className="fixed inset-0 bg-black/10 bg-linear-to-b from-black/80 via-transparent to-black/80"></div>
            <img className="ml-auto scale-75" src='https://occ-0-5264-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229' />
            <button className="font-bold cursor-pointer z-10 hover:text-gray-900" onClick={handleSignOut}>Sign out</button>
        </div>
    )
}

export default Header;