import {useEffect,useState} from 'react';
import {LIBRARY} from './EndPoints';
import axios from 'axios';

const useFetchLibraries=()=>{

    const [LibrariesData,setLibrariesData] = useState([]);

    useEffect(()=>{
        Fetchdata();
    },[])


    const Fetchdata= async ()=>{
    const Data= await axios.get(LIBRARY);
    setLibrariesData(Data.data);
    }
    return LibrariesData;

}

export default useFetchLibraries;