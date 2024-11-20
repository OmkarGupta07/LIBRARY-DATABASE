import React, { Children } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import Error from "./components/Error";
import BasicModal from "./components/Modal";
import UserLogin from "./components/UserLogin";
import LibraryPage from "./components/LibraryPage";
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom"
import AboutUs from "./components/AboutUs";
import Upgrade from "./components/Upgrade";
import './index.css'
import BookPage from "./components/BookPage"


const Applayout=()=>{
return (
    <div>
    <Header/>
    <Outlet/>
    </div>
)
}

const approuter=createBrowserRouter([
    {path:"/",
    element:<Applayout/>,
    children:[
        {
            path:"/Singup",
            element:<BasicModal/>
        },
        {
            path:"/Login",
            element:<UserLogin/>
        },
        {
            path:"/Books",
            element:<BookPage/>
        },
        {
            path:"/Library",
            element:<LibraryPage/>
        },
        {
            path:"/Upgrade",
            element:<Upgrade/>
        },
        {
            path:"/AboutDeveloper",
            element:<AboutUs/>
        }
    ],
    errorElement:<Error/>
    },
])



const root=createRoot(document.getElementById("root"))
root.render(<RouterProvider router={approuter} />)