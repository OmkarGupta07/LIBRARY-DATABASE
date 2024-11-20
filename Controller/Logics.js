const {BooksModel,UserModel,LibraryCModel}=require('../Model/LibraryModel')
const jwt=require('jsonwebtoken');
const {Authors} = require('../Service/Users');


//BOOKS
const milliseconds_per_minute = 60 * 1000;
const minutes_per_hour = 60;

const createToken=async(user)=>{
    try {
    return await jwt.sign(user,'ConfigureTheUser',{expiresIn:2*minutes_per_hour*milliseconds_per_minute});
    } catch (error) {
        console.log(error);   
    }
    }

const FetchAuthors=async(req,res) =>{
try {
  const AuthorData=await Authors();

  AuthorData.length>0 ? 
  res.status(200).json({data:AuthorData})  
  : res.status(404).json({message:"AUTHORS NOT FOUND 🥲"})

} catch (error) {
  console.log(error);    
  res.status(400).json({message:error.message})

}
}

 


const Getlibraries=async (req,res)=>{
    try {
const Listofbooks=await LibraryCModel.find();
res.status(200).json({data:Listofbooks})
} catch (error) {
console.log(error);    
}  

}


const RegisterUser=async(req,res) => {
    try {
      
        const {name,email,password,role}=req.body;
        console.log(req.body);   
        const CreateNewUser=await UserModel.create({name,email,password,role});
        const Token=await createToken(CreateNewUser._id);
        res.cookie('jwt',Token,{httpOnly:true,maxAge:2*minutes_per_hour*milliseconds_per_minute});
        res.json({Message:'User Is Created',User:CreateNewUser.name,jwttoken:Token});
    } catch (error) {
        console.log(error);    
        res.status(400).json({message:error.message})
    }
}

const LoginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const AutheNewUser=await UserModel.LoginUser(email,password);
        console.log(AutheNewUser);
        const payload={
            id:AutheNewUser._id,
            name:AutheNewUser.name,
            role:AutheNewUser.role
        }
        const Token=await createToken(payload);
        res.cookie('jwt',Token,{httpOnly:true,maxAge:2*minutes_per_hour*milliseconds_per_minute});
        res.json({Message:'User Is Configured Successfully',id:AutheNewUser.id,jwttoken:Token});
    } catch (error) {
        console.log(error);    
        res.status(400).json({message:error.message})
    }
}


module.exports={
    RegisterUser,FetchAuthors
    ,LoginUser,Getlibraries
}