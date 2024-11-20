import RenderBooks from "./RenderBooks";
import AddBooks from "./AddBooks";
import { useState } from "react";


const BookPage=()=>{
    const [open, setOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState("");


const ChangeOpen=(val)=>{
    setOpen(val);
}




return(
    <div>
<AddBooks open={open} setOpen={ChangeOpen} selectedBookId={selectedBookId} setSelectedBookId={setSelectedBookId}   />
    <RenderBooks  setOpen={ChangeOpen} setSelectedBookId={setSelectedBookId}/>
    </div>
)



}


export default BookPage;