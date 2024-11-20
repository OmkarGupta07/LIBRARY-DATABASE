import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const AlertMessage =(data) =>{


return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
   {data.data}
  </Alert>
)

}

export default AlertMessage