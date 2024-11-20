import Button from '@mui/material/Button';
import {UPGRADE} from '../utils/EndPoints'
import axios from 'axios';
import { Receipt } from '@mui/icons-material';
const Upgrade=()=>{

const Pay=async ()=>{
    const dataobj={
        amount:5000,
        currency:'INR',
        receipt:'ORDD1231'
    }
   
        try {
          // Fetch order details from backend
          const response =await axios.post(UPGRADE,dataobj,
            {   
              withCredentials :true,
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
              
          if (response && response.data) {
            const order = response.data;
      
            // Configure Razorpay options
            const options = {
              key: 'rzp_test_e5fp0u24TBDUOr', // frontend Razorpay key
              amount: order.amount,
              currency: order.currency,
              name: "READORA",
              description: "Upgrading To Premium",
              order_id: order.id,
              handler: function (response) {
                alert("Payment Successful!");
                console.log(response);
              },
              theme: {
                color: "#3399cc"
              }
            };
      
            const rzp = new window.Razorpay(options);
            rzp.open();
          }
        } catch (error) {
          console.error("Error initiating payment:", error);
        }
      };
return(
    <Button onClick={() => Pay()}>UPGRADE</Button>

)

}



export default Upgrade