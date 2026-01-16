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