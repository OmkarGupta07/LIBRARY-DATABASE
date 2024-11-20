const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const {GetBooks,EditBook,CreateNewBooks,DeleteBook,GetBooksByID} = require('../Service/Books');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
require('dotenv').config();

    const serviceAccount = require('../learning-firebase-c6a5d-firebase-adminsdk-qsgmw-5a59c590c5.json');
    const admin = firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        storageBucket:process.env.bucket
    });
    const bucket = admin.storage().bucket();

const RetriveBooks=async (req,res)=>{
    try {
const Listofbooks=await GetBooks();
if(Listofbooks?.length>0)
    return res.status(200).json({data:Listofbooks})
else
return res.status(404).json({message:'DATA NOT FOUND'})
} catch (error) {
    return res.status(500).json({message:'Some Thing Went Wrong'})

console.log(error);    
}  
}


const BooksByID=async (req,res)=>{
    try {
const Id=req.params.id; 
const GetById=await GetBooksByID(Id);
GetById ? res.status(201).json({data:GetById}) : res.status(404).json({message:`No Book With this Id`})

} catch (error) {
console.log(error);    
res.status(400).json({message:error.message})
}  
}

const UploadFile=async (file) =>{
    try {
        let publicUrl;
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        blobStream.on('error', (err) => {
            console.error(err);
            res.status(500).json({ message: 'Failed to upload file' });
        });
        blobStream.on('finish', async () => {
            await blob.makePublic();
             })
            blobStream.end(file.buffer);

            publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;        

             return publicUrl;
    } catch (error) {
        console.log(error);
        
    }
}

const NewBooks=async (req,res)=>{
    try {
        console.log(req.body)
        const file=req.file;
        const{title,AuthorID} = req.body;
        if(file===undefined || title==='' || AuthorID==='' )
           return res.status(400).json({ message: "File Title & Authors Can't be empty"});

        let publicUrl=await UploadFile(file);
        const coverImageUrl=await publicUrl;
        const CreateAck=await CreateNewBooks({title,AuthorID,coverImageUrl})
        CreateAck !=undefined ? res.status(201).json({data:CreateAck?._id,message:"Book is been created"}) :  res.status(400).json({message:"Something Went Wrong"})
    } catch (error) {
        console.log(error);    
        res.status(400).json({message:error.message})
    }
}


const UpdateBook=async (req,res)=>{
    try {
    const Id=req.params.id;     
    let publicUrl=await UploadFile(req.file);
    const coverImageUrl =await publicUrl;
    console.log(coverImageUrl);
    
    const{title,AuthorID} = req.body;
    const UpdatedAck=await EditBook(Id,{title,AuthorID,coverImageUrl});
    console.log(UpdatedAck);
    
    UpdatedAck.acknowledged ? res.status(201).json({Message:'Book Is Updated',data:UpdatedAck._id}) : res.status(400).json({Message:'Something Went Wrong'})

    } catch (error) {
        console.log(error);    
res.status(400).json({message:error.message})
    }
}

const RemoveBook=async (req,res)=>{
    try {
    const Id=req.params.id; 
    const DeleteAck=await DeleteBook(Id);
    res.status(200).json({Message:'Book Is Deleted',data:DeleteAck.acknowledged})
    } catch (error) {
        console.log(error);    
        res.status(400).json({message:error.message})
    }
}


module.exports={
    RetriveBooks,
    BooksByID,
    NewBooks,
    UpdateBook,
    RemoveBook
}