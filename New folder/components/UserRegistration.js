import { useState } from "react";
import axios from "axios";
import { CREATE_USER } from "../utils/EndPoints";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DropDown from "./DropDown";

import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("Author");
  const data = [
    { _id: "Author", name: "Author" },
    {
      _id: "Borrower",
      name: "Borrower",
    },
  ];
  const CreateUser = async () => {
    const dataobj = { name, email, password, role: selectedValue };
    console.log(dataobj);

    const SendData = await axios.post(CREATE_USER, dataobj, {
      "Content-Type": "application/json",
    });

    if (SendData?.status == 200) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      <AlertMessage data={SendData?.data?.message} />;
    } else {
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
        {SendData.data.Message}
      </Alert>;
    }
  };
  return (
    <div>
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
    </div>
  );
};

export default UserRegistration;
