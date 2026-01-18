import Header from './Header';
import Login from './Login';
import {Provider} from 'react-redux';
import {appStore} from './../redux/appStore';

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