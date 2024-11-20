import {useEffect,useState} from 'react';
import {GET_BOOKS} from './EndPoints';

const useFetchBooks=()=>{

    const [BooksData,setBooksData] = useState([]);

    useEffect(()=>{
        Fetchdata();
    },[])


    const Fetchdata= async ()=>{

    const Data= await fetch(GET_BOOKS);
    const BooksJson=await Data.json();
    setBooksData(BooksJson.data);
    }
    return { BooksData, refreshBooks: Fetchdata };


}

export default useFetchBooks;