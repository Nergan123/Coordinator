import React from 'react';
import "./notesWindow.css";
import {Close} from "@mui/icons-material";
import {NotesProvider} from "./notesContext";
import LiveMarkdown from "./liveMarkdown";

function NotesWindow({closeFunction}: {closeFunction: any}){

    function closeWindow(){
        closeFunction(false);
    }

    return (
        <div className={"notes-window-wrapper"}>
            <NotesProvider>
                <div className="notes-window">
                    <div className="notes-header">
                        <h1>Notes</h1>
                        <Close onClick={closeWindow} style={{cursor: "pointer"}}/>
                    </div>
                    <div className="notes-body">
                        <LiveMarkdown />
                    </div>
                </div>
            </NotesProvider>
        </div>
    );
}

export default NotesWindow;