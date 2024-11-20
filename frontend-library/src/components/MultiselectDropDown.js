import Select from "react-select";
import useFetchBooks from "../utils/useFetchBooks";
import ModalPopUp from "../ReusableComponents/ModalPopUp";
import Button from "@mui/material/Button";
import {LIBRARY} from "../utils/EndPoints"
import axios from "axios";
import { useState } from "react";



const MultiselectDropDown = ({ open, setOpen ,libraryId}) => {
    const [selectedBooks, setSelectedBooks] = useState([]);

    const getBooks = useFetchBooks();

    const AddBookstoInventory = async () => {
        try {

            const dataobj=selectedBooks;
          const url = `${LIBRARY}/${libraryId}/inventory`;
          const response = await axios.post(url,dataobj,{   
            withCredentials :true,
            headers: {
              "Content-Type": "application/json"
            }
          });
          console.log(response.data.data.message);
        } catch (error) {
          console.error(error);
        }
      };

      const handleChange = (selectedOptions) => {
        const selectedIds = selectedOptions.map((book) => book.value);
        setSelectedBooks(selectedIds);
      };

  
    const transformeddata = getBooks.map((ele) => ({
value: ele._id,  label: ele.title,   }));
  
      return (
      <ModalPopUp
        open={open}
        handleClose={() => setOpen(false)} 
        modalContent={
            <>
            <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="LibraryName"
          >
            Books 
          </label>
          <Select
            defaultValue={[]}
            isMulti
            name="Books"
            options={transformeddata}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange} 
          />
        <Button className="float-right mt-2" color="secondary" type="submit" onClick={()=> {AddBookstoInventory(libraryId); setOpen(false) } }>Submit</Button>

</>
        }
      ></ModalPopUp>
    );
  };
  

  export default MultiselectDropDown;