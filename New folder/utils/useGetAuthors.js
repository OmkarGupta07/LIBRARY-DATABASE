const { useEffect, useState } = require("react")
const {GET_Authors} =require('./EndPoints');

const useGetAuthors=()=>{
const[AuthorData,setAuthorData] =useState([]);


useEffect(()=>{
    GetAllAuthors();
},[])


const GetAllAuthors =async ()=>{
    

const data=await fetch(GET_Authors);
const Author=await data.json();
setAuthorData(Author)
}

return AuthorData;
}


export default useGetAuthors;