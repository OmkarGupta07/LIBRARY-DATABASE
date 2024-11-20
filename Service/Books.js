const {BooksModel, UserModel}=require('../Model/LibraryModel')

const GetBooks=async()=>{
    try {
const Listofbooks=await BooksModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "AuthorID",
        foreignField: "_id",
        as: "BooksData"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "borrowerId",
        foreignField: "_id",
        as: "BorrowerData"
      }
    },
    {
      $addFields: {
        authorName: {
          $arrayElemAt: [
            {
              $map: {
                input: "$BooksData",
                as: "book",
                in: "$$book.name"
              }
            },
            0
          ]
        },
        borrowerName: {
          $arrayElemAt: [
            {
              $map: {
                input: "$BorrowerData",
                as: "borrower",
                in: "$$borrower.name"
              }
            },
            0
          ]
        }
      }
    },
    {
      $project: {
        title: 1,
        status: 1,
        coverImageUrl: 1,
        authorName: 1,
        borrowerName: 1
      }
    }
  ])
  
  

    return Listofbooks;
} catch (error) {
console.log(error);    
}  
}


const GetBooksByID=async (Id)=>{
    try {
const GetById=await BooksModel.findOne({_id:Id});

return GetById;
} catch (error) {
console.log(error);    
}  
}


const CreateNewBooks=async (body)=>{
    try {    
    const CreateAck=await BooksModel.create(body);
    return CreateAck;
    } catch (error) {
        console.log(error);  
        return { error: error.message }
        
    }
}

const EditBook=async (Id,body)=>{
    try {
    const UpdatedAck=await BooksModel.updateOne({_id:Id},body);
    return UpdatedAck;
    } catch (error) {
        console.log(error);    
    }
}

const DeleteBook=async (Id)=>{
    try {
    const DeleteAck=await BooksModel.deleteOne({_id:Id});
    return DeleteAck;
    } catch (error) {
        console.log(error);    
    }
}

module.exports={GetBooks,EditBook,CreateNewBooks,DeleteBook,GetBooksByID}