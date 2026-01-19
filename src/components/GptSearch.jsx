import {BG} from './../utils/constant';
import GPTSearchBar from './GPTSearchBar';
import GPTSearchSugesstions from './GPTSearchSugesstions';

const GptSearch = () => {

    return (
        <>
        <GPTSearchBar />
        <GPTSearchSugesstions />
        <img src={BG} className="fixed object-cover h-screen w-screen"/>
        </>
    );
}

export default GptSearch;