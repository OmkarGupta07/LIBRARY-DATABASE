const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserCollection = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Enter name of the user"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "Enter name of the user"],
    validate: [validator.isEmail, "Enter Valid Email Id"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  role: {
    type: String,
    required: [true, "Enter Role of the User"],
    enum: ["Author", "Borrower"],
  },
  preferredLanguage: {
    type: String,
    enum: ["English", "Hindi"],
    default: "English",
  },
  premium: {
    type: Boolean,
    require: false,
    default: false,
  },
});

UserCollection.pre("save", async function (next) {
  try {
    const hashSalt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, hashSalt);
    next();
  } catch (error) {
    console.log(error);
  }
});

UserCollection.statics.LoginUser = async function (email, password) {
  const SearchUser = await this.findOne({ email });
  if (SearchUser) {
    const ComparePassword = await bcrypt.compare(password, SearchUser.password);
    if (ComparePassword) return SearchUser;
    throw new Error("Please Enter Correct Password");
  }
  throw new Error("Please Enter Correct Email Id");
};

const UserModel = mongoose.model("Users", UserCollection);

const BooksCollection = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Enter title of the Book"],
    unique: true,
  },
  AuthorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: [true, "Book should have 1 Author"],
  },
  borrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: false,
    //default:
  },
  coverImageUrl: {
    type: String,
    require: false,
  },
  status: {
    type: String,
    enum: ["available", "borrowed"],
    default: "available",
  },
});

const BooksModel = mongoose.model("Books", BooksCollection);

const LibraryCollection = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Library Should Have Name"],
    unique: true,
  },
  location: {
    type: String,
    require: [true, "Library Should Have location"],
  },
  booksOwned: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Book", require: true ,default: [] },
  ],
});

const LibraryCModel = mongoose.model("Libraries", LibraryCollection);

const BorrowCollection = new mongoose.Schema({
  BorrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  BorrowedCount: {
    type: Number,
    required: true,
  },
});

const BorrowModel = mongoose.model("Borrow", BorrowCollection);

module.exports = {
  BooksModel,
  UserModel,
  LibraryCModel,
  BorrowModel,
};
