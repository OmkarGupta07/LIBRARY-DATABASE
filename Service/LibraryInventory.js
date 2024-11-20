const {LibraryCModel,BooksModel} = require('../Model/LibraryModel');

async function getLibraryWithBooks(libraryId) {
  try {
    return await LibraryCModel.aggregate([
      {
        $match: { _id: libraryId }
      },
      {
        $lookup: {
          from: "books",
          localField: "booksOwned",
          foreignField: "_id",
          as: "bookDetails"
        }
      },
      {
        $addFields: {
          bookDetails: {
            $filter: {
              input: "$bookDetails",
              as: "book",
              cond: { $eq: ["$$book.status", "available"] }
            }
          }
        }
      },
      {
        $match: { bookDetails: { $ne: [] } }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          location: 1,
          "bookDetails.title": 1,
          "bookDetails.status": 1
        }
      }
    ]);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addBooksToLibrary(libraryId, bookId) {
  try {
    const libraryExists = await LibraryCModel.findById(libraryId);
    if (!libraryExists) throw new Error("Library does not exist");

    const bookExists = await BooksModel.findById(bookId);
    if (!bookExists) throw new Error("Book does not exist");

    const AddBooks= await LibraryCModel.findByIdAndUpdate(
      libraryId,
      { $addToSet: { booksOwned: bookId } },
      { new: true }
    );

    const booksarray= Array.from(AddBooks.booksOwned)
    const updatedBooksOwned = booksarray.some((id) => id.toString() === bookId.toString());



    if (updatedBooksOwned){      
      return {message:'Books are Added to the Inventory'};
    } else {
      throw new Error("Failed to add book to the library's inventory.");
    }

  } catch (error) {
    return error.message;
  }
}

async function deleteBooksFromLibrary(libraryId, bookId) {
  try {
    const updatedLibrary = await LibraryCModel.findByIdAndUpdate(
      libraryId,
      { $pull: { booksOwned: bookId } },
      { new: true }
    );

    const booksarray= Array.from(updatedLibrary.booksOwned)
    const updatedBooksOwned = booksarray.some((id) => id.toString() === bookId.toString());



    if (updatedBooksOwned===false) 
      return {message:'Books Is Deleted from the Inventory'};
    else
    return {message:'Books Is Not Deleted Try After Some Time '};

  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  getLibraryWithBooks,
  addBooksToLibrary,
  deleteBooksFromLibrary
};
