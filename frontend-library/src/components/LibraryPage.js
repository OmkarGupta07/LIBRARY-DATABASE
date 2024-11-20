import { useState } from "react"
import LibraryCreate from "./LibraryCreate"
import RenderLibraries from "./RenderLibraries";


const LibraryPage=()=>{
const [open,setOpen]=useState(false);
const [libraryId,setlibraryId]=useState("");

const ChangeOpen=(val)=>{
    setOpen(val);
}





return (
    <>
        <RenderLibraries setOpen={ChangeOpen} setlibraryId={setlibraryId}/>
    <LibraryCreate open={open} setOpen={ChangeOpen} libraryId={libraryId}/>
    </>
)


}

export default LibraryPage