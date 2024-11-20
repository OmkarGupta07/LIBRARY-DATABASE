import useFetchLibraries from "../utils/useFetchLibraries";
import EditIcon from "@mui/icons-material/Edit";
import { LIBRARY } from "../utils/EndPoints";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";
import React from "react";
import MultiselectDropDown from './MultiselectDropDown'
import { useState } from "react";

const RenderLibraries = ({ setOpen, setlibraryId }) => {
  
  console.log('re render again')

  const [openBook,setOpenBook]=useState(false);


  function changebook(val){
    setOpenBook(val);
  }

const data=useFetchLibraries();



  const DeleteBooksFromInventoryById = async (libraryid, Bookid) => {
    try {
      const url = `${LIBRARY}/${libraryid}/inventory/${Bookid}`;
      const deleteresponse = await axios.delete(url);
      alert(deleteresponse.data.messaage);
    } catch (error) {
      console.error(error);
    }
  };

  const DeletelibrariesById = async (libraryid) => {
    if (libraryid) {
      const url = `${LIBRARY}/${libraryid}`;
      const data = await axios.delete(url);
      console.log(data);
    }
  };

  return (
    <div>
      {data.map((ele) => {
        return (
          <div
            key={ele._id}
            className="grid h-screen bg-gray-800 lg:grid-cols-3 justify-center"
          >
            <div></div>
            <div className="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-gray-700 shadow-md">
              <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl font-bold tracking-tight text-white">
                  {ele.name}
                </h5>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl text-white">{ele.location}</span>
                  </p>
                  <div className="hover:border-white/40 flex items-center justify-center rounded-full border border-transparent bg-blue-600 p-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-black-300 m-2">
                    <svg
                      className="h-6 w-6 text-black-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={() => changebook(true)}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <line x1="12" y1="5" x2="12" y2="19" />{" "}
                      <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    { openBook && <MultiselectDropDown open={openBook} setOpen={changebook} libraryId={ele._id} /> }
                      {" "}
                      
                  </div>
                </div>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    {ele.books[0].title != undefined &&
                      ele.books.length > 0 &&
                      ele.books.map((val, index) => (
                        <React.Fragment key={index}>
                          <span className="text-xl text-white">
                            {val?.title}
                          </span>
                          <span className="text-xl text-white">
                            {val?.status}
                          </span>
                          <span className="hover:border-white/40 float-right flex items-center justify-center rounded-full border border-transparent bg-blue-600 p-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 m-2">
                            <DeleteOutlinedIcon
                              onClick={() =>
                                DeleteBooksFromInventoryById(ele._id, val._id)
                              }
                            />
                          </span>
                          {val?.borrower && val.borrower.length > 0 ? (
                            val.borrower.map((item, idx) => (
                              <span key={idx} className="text-3xl text-white">
                                {item?.name}
                              </span>
                            ))
                          ) : (
                            <p>No borrower data available</p>
                          )}
                        </React.Fragment>
                      ))}
                  </p>
                </div>
                <div className="flex float-right">
                  <div className="hover:border-white/40 flex items-center justify-center rounded-full border border-transparent bg-blue-600 p-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 m-2">
                    <EditIcon
                      onClick={() => {
                        setOpen(true);
                        setlibraryId(ele._id);
                      }}
                    />
                  </div>
                  <div className="hover:border-white/40 flex items-center justify-center rounded-full border border-transparent bg-blue-600 p-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 m-2">
                    <DeleteOutlinedIcon
                      onClick={() => DeletelibrariesById(ele._id)}
                    />
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


export default RenderLibraries;
