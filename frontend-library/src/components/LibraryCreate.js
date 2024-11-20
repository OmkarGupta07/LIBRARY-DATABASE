import Button from "@mui/material/Button";
import { useState,useEffect } from "react";
import {LIBRARY} from '../utils/EndPoints'
import axios from 'axios'
import ModalPopUp from '../ReusableComponents/ModalPopUp';



const LibraryCreate = ({ open, setOpen ,libraryId }) => {
  const [libraryTitle, setLibraryTitle] = useState("");
  const [librarylocation, setLibraryLocation] = useState("");

  useEffect(()=>{
    if(libraryId){
      LibraryById(libraryId);
    
    }
  },[libraryId])

const ClearState=()=>{
    setLibraryTitle('');
    setLibraryLocation('');
}



const LibraryById=async (libraryId)=>{
  debugger
  if(libraryId){
  const url = `${LIBRARY}/${libraryId}`;
  const data = await axios.get(url);
  console.log(data)
  
   setLibraryTitle(data?.data?.data[0]?.name)
   setLibraryLocation(data?.data?.data[0]?.location)
  }
}




  async function SaveData() {
    const url = libraryId 
      ? `${LIBRARY}/${libraryId}` 
      : LIBRARY;
    const method = libraryId ? 'PUT' : 'POST';
    
    const data={
        name:libraryTitle,
        location:librarylocation
    }
  
    try {
        const response = method === 'PUT'
        ? await axios.put(url, data, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
          })
        : await axios.post(url, data, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
          });  

      
      if(response?.status===201)
        alert(response.data?.message)

        
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  }

  return (
    <div>
      <Button   onClick={()=> {setOpen(true); ClearState(); } }>Add Library</Button>

     <ModalPopUp  open={open} handleClose={() => setOpen(false)}   modalContent={
          <>
            <div className="flex flex-col space-y-6 p-4 w-full">
              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="LibraryName"
                >
                  Library Name
                </label>
                <input
                  type="text"
                  id=""
                  value={libraryTitle}
                  onChange={(e) => setLibraryTitle(e.target.value)}
                  placeholder="Enter Library Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="bookTitle"
                >
                  Location
                </label>
                <input
                  type="text"
                  id=""
                  value={librarylocation}
                  onChange={(e) => setLibraryLocation(e.target.value)}
                  placeholder="Enter Location Library"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div className="w-full">
              
                <div className="float-right">
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-red-600 hover:to-red-800 transition duration-300 mr-2"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                        SaveData()
                    }}
                    className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-cyan-400 hover:to-blue-400 transition duration-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        }>
        </ModalPopUp>
    </div>
  );
};





export default LibraryCreate;