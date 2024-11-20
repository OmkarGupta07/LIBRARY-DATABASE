import React, { Children } from "react";
import { createRoot } from "react-dom/client";
import RenderBooks from "../src/components/RenderBooks";
import Header from "./components/Header";
import Error from "./components/Error";
import AddBooks from "./components/AddBooks";
import UserRegistration from "./components/UserRegistration";
import BasicModal from "./components/Modal";
import UserLogin from "./components/UserLogin";
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom"
import '../index.css'


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
            path:"/GetBooks",
            element:<RenderBooks/>
        },
        {
            path:"/CreateBooks",
            element:<AddBooks/>
        },
    ],
    errorElement:<Error/>
    },
])



const root=createRoot(document.getElementById("root"))
root.render(<RouterProvider router={approuter} />)