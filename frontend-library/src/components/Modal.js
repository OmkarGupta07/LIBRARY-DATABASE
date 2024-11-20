import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DropDown from "../ReusableComponents/DropDown";
import { useState } from "react";
import axios from "axios";
import { CREATE_USER } from "../utils/EndPoints";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("Author");
  const navigate = useNavigate();

  const data = [
    { _id: "Author", name: "Author" },
    {
      _id: "Borrower",
      name: "Borrower",
    },
  ];

  const CreateUser = async () => {
    debugger;
    const dataobj = { name, email, password, role: selectedValue };

    const SendData = await axios.post(CREATE_USER, dataobj, {
      withCredentials :true,
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (SendData?.status === 200) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Sing Up</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sing Up
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              CreateUser();
            }}
          >
            <TextField
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              color="secondary"
              focused
            />

            <TextField
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              color="secondary"
              focused
            />

            <TextField
              label="Password"
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              color="secondary"
              focused
            />
            <DropDown
              data={data}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
            <Stack direction="row" spacing={2}>
              <Button color="secondary" type="submit">
                SING UP
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
