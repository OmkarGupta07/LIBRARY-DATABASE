const {BooksModel}=require('../Model/LibraryModel')
const mongoose=require('mongoose')
async function borrowBook(bookId, userId) {
  try {
    const book = await BooksModel.findOne({_id:bookId});

    if (!book) throw new Error("Book does not exist");

    if (book.status === 'available') {
      book.status = 'borrowed';
      book.borrowerId = userId;
      await book.save();
      return { message: `${book.title} is borrowed successfully` };
    } else {
      return { message: `${book.title} is already borrowed, please come back later` };
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function returnBook(bookId) {
  try {
    const book =await  BooksModel.findOne({_id:bookId});

    if (!book) throw new Error("Book does not exist");

    if (book.status !== 'available') {
      book.status = 'available';
      book.borrowerId = undefined;
      await book.save();
      return { message: `${book.title} is returned successfully` };
    } else {
      return { message: `${book.title} has not been borrowed` };
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  borrowBook,
  returnBook
};
