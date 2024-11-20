import useFetchBooks from "../utils/useFetchBooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AlertDialog from "../ReusableComponents/AlertDialog";
import { CREATE_BOOKS, BORROW_BOOK, RETURN_BOOK } from "../utils/EndPoints";
import axios from "axios";
import { useEffect, useState } from "react";

const RenderBooks = ({ setOpen, setSelectedBookId }) => {

  const [btnLabel, setBtnLabel] = useState("");
  const [value, setValue] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteid,setDeleteId] = useState("");
  const { BooksData:books,refreshBooks } = useFetchBooks(); // Modified to get data and refresh function


    
  useEffect(() => {
    if (deleteid){ 
      DeleteBookById(deleteid);
      setDeleteId("")
    }


  }, [value]);
  const DeleteBookById = async (selectedBookId) => {
    debugger;
    if (selectedBookId && value) {
      const url = `${CREATE_BOOKS}/${selectedBookId}`;
      const responsedata = await axios.delete(url);
      console.log(responsedata);
      refreshBooks();
      setValue(false)
    }
  };

  const Modalstate = () => {
    setOpen(true);
  };

  const changeDialogstate = (value) => {
    setOpenDialog(value);
  };

  const BorrowBookFeature = async (id, isAvailable) => {
    try {
      debugger;
      const url = isAvailable ? BORROW_BOOK : `${RETURN_BOOK}/${id}`;
      const method = isAvailable ? "POST" : "PUT";
      const payload = { bookId: id };

      const response =
        method === "PUT"
          ? await axios.put(url, payload, {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            })
          : await axios.post(url, payload, {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            });

      alert(response?.data?.data?.message);
      setBtnLabel(isAvailable ? "RETURN" : "BORROW"); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {books.map((ele) => {
        const isAvailable = ele.status === "available";
        const currentLabel = isAvailable ? "BORROW" : "RETURN";

        return (
          <div
            key={ele?._id}
            className="grid h-screen bg-gray-800 lg:grid-cols-3 justify-center"
          >
            <div className="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-gray-700 shadow-md">
              <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <img
                  className="peer absolute top-0 right-0 h-full w-full object-cover"
                  src={ele?.coverImageUrl}
                  alt="product image"
                />
              </a>
              <div className="mt-4 px-5 pb-5">
                <a>
                  <h5 className="text-xl font-bold tracking-tight text-white">
                    {ele?.title}
                  </h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl text-white">
                      {ele?.authorName}
                    </span>
                  </p>
                </div>
                <div className="flex float-right">
                  <div className="hover:border-white/40 flex items-center justify-center rounded-full border border-transparent bg-blue-600 p-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 m-2">
                    <EditIcon
                      onClick={() => {
                        Modalstate();
                        setSelectedBookId(ele?._id);
                      }}
                    />
                  </div>
                  <div className="hover:border-white/40 flex items-center justify-center rounded-full border border-transparent bg-blue-600 p-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 m-2">
                    <DeleteOutlinedIcon
                      onClick={() => {
                        debugger;
                        changeDialogstate(true);
                        setDeleteId(ele._id);
                      }}
                    />
                    {/* //DeleteBookById(ele?._id) */}
                  </div>
                  {openDialog && (
                    <AlertDialog
                      open={openDialog}
                      setOpen={changeDialogstate}
                      content={"Are you sure you want to remove this book"}
                      setValue={setValue}
                    />
                  )}

                  <div className="hover:border-white/40 flex items-center justify-center rounded-full border border-transparent bg-blue-600 p-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 m-2">
                    <p onClick={() => BorrowBookFeature(ele?._id, isAvailable)}>
                      {currentLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderBooks;
