const {LibraryCModel}=require('../Model/LibraryModel')
const mongoose =require('mongoose')


async function getAllLibraries() {
    try {
      return await LibraryCModel.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "booksOwned",
            foreignField: "_id",
            as: "booksData"
          }
        },
        {
          $unwind: "$booksData"
        },
        {
          $lookup: {
            from: "users",
            localField: "booksData.borrowerId",
            foreignField: "_id",
            as: "borrowerDetails"
          }
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            location: { $first: "$location" },
            books: {
              $push: {
                _id: "$booksData._id",
                title: "$booksData.title",
                status: "$booksData.status",
                borrowerDetails: "$borrowerDetails.name"
              }
            }
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            location: 1,
            books: 1
          }
        }
      ]);

    } catch (error) {
      return error
    }
  }

  // Create a new library
async function createLibrary(data) {
    try {
      const result= await LibraryCModel.create(data);
      return result;
    } catch (error) {
      return error;
    }
  }
  
  async function updateLibrary(id, updatedData) {
    try {
      return await LibraryCModel.updateOne({ _id: id }, updatedData);
    } catch (error) {
      return error    }
  }
  
  async function deleteLibrary(id) {
    try {
      return await LibraryCModel.deleteOne({ _id: id });
    } catch (error) {
      return error    }
  }


  async function getLibraryById(id){
    try {
      const GetById = await LibraryCModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) }
        },
        {
          $lookup: {
            from: "books", 
            localField: "booksOwned",  
            foreignField: "_id",  
            as: "booksData" 
          }
        },
        {
          
          $unwind: {
            path: "$booksData",
            preserveNullAndEmptyArrays: true 
          }
        },
        {
          // Step 4: Lookup to fetch borrower details for each book
          $lookup: {
            from: "users", // Collection to join (users)
            localField: "borrowerId",  // Reference field in books collection
            foreignField: "_id",  // Reference field in users collection
            as: "borrowerDetails" // Output array field
          }
        },
        {
          // Step 5: Unwind the borrowerDetails array to get a single borrower object
          $unwind: {
            path: "$borrowerDetails",
            preserveNullAndEmptyArrays: true // Allows for books with no borrower to still appear
          }
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            location: { $first: "$location" },
            books: {
              $push: {
                _id: "$booksData._id",
                title: "$booksData.title",
                status: "$booksData.status",
                borrower: {
                  _id: "$borrowerDetails._id",
                  name: "$borrowerDetails.name",
                  email: "$borrowerDetails.email"
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            location: 1,
            books: 1       }
        }
      ]);
      
      return GetById;
    } catch (error) {
      console.log(error)
    }


}
  
  module.exports = {
    getAllLibraries,
    getLibraryById,
    createLibrary,
    updateLibrary,
    deleteLibrary
  };