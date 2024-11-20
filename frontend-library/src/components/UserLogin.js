import { useState } from "react";
import axios from "axios";
import { LOGIN_USER } from "../utils/EndPoints";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserLogin=()=>
  {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const[email,setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate=useNavigate();

    const LoginUser=async ()=>{
      const dataobj={
        email,
        password,
        }
            const SendData =await axios.post(LOGIN_USER,dataobj,
            {   
              withCredentials :true,
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
            if(SendData?.status==200){
              setTimeout(() => {
                navigate("/GetBooks");
              }, 2000);
              // <AlertMessage data="hi brooo" />

            }
            else{
              alert('error')
            }
          }

return (

  <div>
  <Button onClick={handleOpen}>Login</Button>
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <Box sx={style}>

  <form  onSubmit={e=>{
            e.preventDefault();
            LoginUser();
          }}>

   <Box
    component="form"
    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
    noValidate
    autoComplete="off"
>
    <TextField label="Email" value={email}   onChange={(e) => {
        setEmail(e.target.value) 
    }} color="secondary" focused />
    <TextField label="Password" type="password"  color="secondary" value={password}   onChange={(e) => {
        setPassword(e.target.value)}} focused/>   
      </Box>

      <Stack direction="row" spacing={2}>
      <Button color="secondary" type="submit">LOG IN</Button>
    </Stack>

    </form>
    </Box>
    </Modal>
</div>
 
);}

export default UserLogin;