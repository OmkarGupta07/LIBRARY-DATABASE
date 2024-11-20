import DropDown from "../ReusableComponents/DropDown";
import useGetAuthors from "../utils/useGetAuthors";
import { useEffect, useState } from "react";
import { CREATE_BOOKS } from "../utils/EndPoints";
import axios from "axios";
import BasicModal from "../ReusableComponents/ModalPopUp";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import AlertContent from '../ReusableComponents/AlertContent';


const AddBooks = ({open, setOpen, selectedBookId ,setSelectedBookId}) => {
  const AuthorData = useGetAuthors();
  const [BookTitle, setBookTitle] = useState("");
  const [file, setfile] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [success, setSuccess] = useState(false); // TO SHOW ALERT
  const [failure, setFailure] = useState(false); // TO SHOW SUCCESS MESSAGE OR FAILURE
  const [content, setContent] = useState("");

  useEffect(()=>{
    if(selectedBookId){
      BooKById(selectedBookId);
    
    }
  },[selectedBookId])


  const ClearState=()=>{
    setSuccess(false);
    setFailure(false);
    setContent("");
    setBookTitle("")
    setfile()
    setSelectedValue("")
    setOpen(true)
  }

  const CheckErrorFields=()=>{
    if( !BookTitle.trim() || !selectedValue.trim()  || !file)
        return false;
      return true;
  }


  const BooKById=async (selectedBookId)=>{
    if(selectedBookId){
    const url = `${CREATE_BOOKS}/${selectedBookId}`;
    const data = await axios.get(url);
    console.log(data)
    const{title,AuthorID}=data.data.data
    setBookTitle(title)
    setfile()
    setSelectedValue(AuthorID)
    
    }
  }

  const Getdata = () => {
    const formData = new FormData();
    formData.set("title", BookTitle);
    formData.set("coverImageUrl", file);
    formData.set("AuthorID", selectedValue);

    return formData;
  };



  async function SaveData() {
    if (!CheckErrorFields()) {
      return; 
    }
  
    const url = selectedBookId 
      ? `${CREATE_BOOKS}/${selectedBookId}` 
      : CREATE_BOOKS;
    const method = selectedBookId ? 'PUT' : 'POST';
    const data=Getdata()
  
    try {
      const response = await fetch(url,{method:method,body: data} );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      console.log("Operation successful:", result);
      if(response.status===201){
        debugger
        setSelectedBookId("")
        setOpen(false)
        setSuccess(true)
        //setFailure(true)
        setContent(result?.Message)
        }
    

setTimeout(() => {
    setSuccess(false);
    setFailure(false);
    },3000);

    } catch (error) {
      console.error("Error in operation:", error);
    }
  }



  return (
    <div>
      <Button onClick={() => ClearState()}>Add Books</Button>
      <BasicModal
        open={open}
        handleClose={() => setOpen(false)}
        modalTitle="Books"
        modalContent={
          <>
            <div className="flex flex-col space-y-6 p-4 w-full">
              <div className="w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="bookTitle"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="bookTitle"
                  value={BookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Enter book title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="fileInput"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Upload File
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-white-700 dark:border-indigo-600 dark:placeholder-white-400"
                    type="file"
                    onChange={(e) => setfile(e.target.files[0])}
                  />
                </div>
                <div className="w-full mt-4">
                  {AuthorData?.data?.length > 0 ? (
                    <DropDown
                      data={AuthorData?.data}
                      selectedValue={selectedValue}
                      setSelectedValue={setSelectedValue}
                      label="Authors"
                    />
                  ) : (
                    ""
                  )}

                </div>

                <div className="float-right">
                <button onClick={()=> setOpen(false)} className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-red-600 hover:to-red-800 transition duration-300 mr-2">Cancel</button>

                <button  onClick={()=> {
                  <CircularProgress/> 
                  CheckErrorFields() && SaveData()
              }  
                
                }
                className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:from-cyan-400 hover:to-blue-400 transition duration-300">Submit</button>
                </div>
              </div>
            </div>
          </>
        }
      >

      </BasicModal>
      { success && <AlertContent success={failure}   message={content} /> }
    </div>
  );
};





export default AddBooks;
