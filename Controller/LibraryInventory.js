const libraryService = require('../Service/LibraryInventory');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
  
const getLibraryWithBooks = async (req, res) => {
  try {
    const libraryId = req.params.id;
    const libraryWithBooks = await libraryService.getLibraryWithBooks(libraryId);
    res.status(200).json({ LibraryData: libraryWithBooks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to add books to a library
const addBooksToLibrary = async (req, res) => {
  try {
    const libraryId = req.params.id;
    const bookId = req.body;
    const updatedLibrary = await libraryService.addBooksToLibrary(libraryId, bookId);
    res.status(201).json({ data: updatedLibrary });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to delete books from a library
const deleteBooksFromLibrary = async (req, res) => {
  try {
    const libraryId = req.params.id;
    const bookId = req.params.bookId;
    const updatedLibrary = await libraryService.deleteBooksFromLibrary(libraryId, bookId);
    updatedLibrary.message.includes('Books Is Deleted from the Inventory') ?  res.status(200).json({ data: updatedLibrary }) :res.status(400).json({data:updatedLibrary  })

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getLibraryWithBooks,
  addBooksToLibrary,
  deleteBooksFromLibrary
};
