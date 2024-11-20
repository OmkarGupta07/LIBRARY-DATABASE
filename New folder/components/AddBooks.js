import DropDown from "./DropDown";
import useGetAuthors from "../utils/useGetAuthors";
import { useEffect, useState } from "react";
import { CREATE_BOOKS } from "../utils/EndPoints";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BasicModal from "../ReusableComponents/ModalPopUp";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Box from '@mui/material/Box';



const AddBooks = () => {
  const [open, setOpen] = useState(false);
  const AuthorData = useGetAuthors();
  const [BookTitle, setBookTitle] = useState("");
  const [file, setfile] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const location = useLocation();
  const id = location.state?.id;

  const Getdata = () => {
    const formData = new FormData();
    formData.set("title", BookTitle);
    formData.set("coverImageUrl", file);
    formData.set("AuthorID", selectedValue);

    return formData;
  };

  const Postdata = async () => {
    const formData = Getdata();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post(CREATE_BOOKS, formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Putdata = async () => {
    try {
      const formData = Getdata();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const jsondata = await axios.put(
        `${CREATE_BOOKS}/${id}`,
        formData,
        config
      );
      const result = await jsondata.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getBooklsDetails = async () => {
    setOpen(true);
    const url = `${CREATE_BOOKS}/${id}`;
    const data = await axios.get(url);
    console.log(data);
    if (data) {
      const { title, AuthorID } = data.data.data;
      setBookTitle(title);
      setSelectedValue(AuthorID);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Books</Button>
      <BasicModal
        open={open}
        handleClose={() => setOpen(false)}
        modalTitle="Books"
        modalContent={
          <>
            <div class="row col-lg-12">
              <div class="col-lg-6">
                <TextField
                  label="Title"
                  value={BookTitle}
                  onChange={(e) => {
                    setBookTitle(e.target.value);
                  }}
                  color="secondary"
                  focused
                />
              </div>

              <div class=" col-lg-6">
  <label for="fileInput" class="form-label fw-bold">Upload File</label>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="No file chosen"
      id="fileNameDisplay"
      readonly
    />
    <label class="input-group-text btn btn-primary" for="fileInput">
      Choose File
    </label>
    <input
      type="file"
      class="d-none"
      id="fileInput"
      onchange="displayFileName(this)"
    />
  </div>
</div>

    </div>

          </>
        }
      ></BasicModal>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ClearSharpIcon
            onClick={(e) => {
              setBookTitle("");
              setSelectedValue("");
              handleClose(false);
              setfile();
            }}
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              id ? Putdata() : Postdata();
            }}
          >
            <TextField
              label="Title"
              value={BookTitle}
              onChange={(e) => {
                setBookTitle(e.target.value);
              }}
              color="secondary"
              focused
            />

            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => {
                  setfile(e.target.files[0]);
                }}
              />
            </Button>

            {AuthorData?.data?.length > 0 ? (
              <DropDown
                data={AuthorData?.data}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
            ) : (
              ""
            )}
            <Button color="secondary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal> */}
    </div>
  );
};

export default AddBooks;
