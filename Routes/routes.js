const express=require('express')
const router=express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {  RetriveBooks,BooksByID,NewBooks,UpdateBook,RemoveBook} =require('../Controller/BooksController');

const {getAllLibraries, getLibraryById,createLibrary,updateLibrary,deleteLibrary,} =require('../Controller/LibraryController')

const {getLibraryWithBooks,addBooksToLibrary,deleteBooksFromLibrary} = require('../Controller/LibraryInventory')

const {borrowBook,returnBook,HandlePayments} =require('../Controller/BorrowController')

const {RegisterUser,FetchAuthors,LoginUser} = require('../Controller/Logics')
router.use(express.json());

router.post('/users/login',LoginUser)
router.post('/users/register',RegisterUser)
router.get('/users/Authors',FetchAuthors)

router.get('/books',RetriveBooks)
router.get('/books/:id',BooksByID)
router.put('/books/:id',upload.single('coverImageUrl'),UpdateBook)
router.post('/books',upload.single('coverImageUrl'),NewBooks)
router.delete('/books/:id',RemoveBook)

//router.get(' /books',GetBooks)


router.get('/libraries',getAllLibraries)
router.get('/libraries/:id',getLibraryById)
router.put('/libraries/:id',updateLibrary)
router.post('/libraries',createLibrary)
router.delete('/libraries/:id',deleteLibrary)

//Inventory
 router.get('/libraries/:id/inventory',getLibraryWithBooks);
 router.post('/libraries/:id/inventory',addBooksToLibrary);
 router.delete('/libraries/:id/inventory/:bookId',deleteBooksFromLibrary);

//borrow
router.post('/borrow',borrowBook);
router.put('/return/:id',returnBook);
router.post('/upgrade',HandlePayments);




module.exports=router;



