import Header from './Header';
import Login from './Login';
import {Provider} from 'react-redux';
import {appStore} from './../redux/appStore';
import {useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from './../utils/firebase';
import {useDispatch} from 'react-redux';
import { addUser, removeUser } from '../redux/userSlice';
import {useNavigate} from 'react-router-dom';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid, email, displayName} = user;
            dispatch(addUser({uid,email, displayName}));
            navigate('/browse');
            // ...
        } else {
            dispatch(removeUser());
            navigate('/');
            // User is signed out
            // ...
        }
    });
    }, []);

    return (
        <Provider store={appStore}>
            <div>
                <Header />
                <Login />
            </div>
        </Provider>
    );
};

export default Body;