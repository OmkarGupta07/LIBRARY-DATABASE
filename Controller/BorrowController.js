const BorrowBooksService = require('../Service/BorrowBooks');
const jwt=require('jsonwebtoken');
const {UserModel,BorrowModel} =require('../Model/LibraryModel')
const Razorpay =require('razorpay')
require('dotenv').config()

const razorpayInstance = new Razorpay({
  key_id: process.env.razorpay_key_id,       
  key_secret: process.env.razorpay_key_secret,    
});


const HandlePayments =async (req,res)=>{
  try {
    const options = {
      amount: 50000,                // Amount in paise (50000 paise = 500 INR)
      currency: "INR",
      receipt: "receipt#1",
   };

   const order = await razorpayInstance.orders.create(options);
   res.status(200).json({message:`Congrats !!! You're Now Premium user of READORA`,data:order});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

const borrowBook = async (req, res) => {
  try {
    const { bookId} = req.body;
    let userId;
    const jwtcook=req.cookies.jwt;
    
    jwt.verify(jwtcook,'ConfigureTheUser',async (err,decodetkn)=>{
            if (err) {
                console.log(err);
            }
            else{
                 userId=decodetkn;
            }
        })

  const BorrwerData = await BorrowModel.find({ BorrowerId: borrowerId });
  
  if(BorrwerData.BorrowedCount>=3)
      return res.status(200).json({message:`You Have Reached Your Limit Of Borrowing Books Please Upgrade to Premium Version`,})

    const result = await BorrowBooksService.borrowBook(bookId, userId.id);
    result.message.includes('borrowed') ? res.status(200).json({message:`${userId.name} Sorry You cant boorow this book as it is already borrowed`,data:result})
     : res.status(200).json({message:`${userId.name} Book Borrowed Successfully`,data:result});



  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





const returnBook = async (req, res) => {
  try { 
    const { id } = req.params;
    const result = await BorrowBooksService.returnBook(id);
    result.message.includes('borrowed') ? res.status(200).json({message:'No One Borrowed',data:result}) :  res.status(200).json({message:'Book is Return Successfully',data:result})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  borrowBook,
  returnBook,HandlePayments
};
