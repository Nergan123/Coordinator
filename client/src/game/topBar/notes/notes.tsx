import {EditNote} from "@mui/icons-material";
import React from "react";
import "./notes.css";
import NotesWindow from "./notesWindow";

function Notes() {

    const [notesVisible, setNotesVisible] = React.useState(false);

    function toggleNotes() {
        setNotesVisible(!notesVisible);
    }

    const style = {
        color: "white",
        fontSize: "2rem",
        cursor: "pointer"
    }

    return (
        <>
            {notesVisible && <NotesWindow closeFunction={toggleNotes}/> }
            <div className={"notes-div"} onClick={toggleNotes}>
                <EditNote style={style}/>
            </div>
        </>
    );
}

export default Notes;