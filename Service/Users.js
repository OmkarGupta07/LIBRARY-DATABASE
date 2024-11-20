const {UserModel} =require('../Model/LibraryModel')


const Authors=async ()=>{
try {
    const AuthorData=await UserModel.find({ role: "Author" })    
    return AuthorData;
} catch (error) {
    console.error(error.message)
}
}


module.exports={Authors }