import React, {useContext, useState} from "react";
import {Visibility} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import "./liveMarkdown.css";
import {NotesContext} from "./notesContext";
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight'

function LiveMarkdown() {
    const notes = useContext(NotesContext).notes;
    const [markdownInput, setMarkdownInput] = useState(notes);

    function saveNotes() {
        const newNotes = {notes: markdownInput};
        window.localStorage.setItem("notes", JSON.stringify(newNotes));
    }

    return (
        <div className="live-markdown">
            <div className="wrapper-live-markdown-preview">
                <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    remarkPlugins={[remarkGfm]}
                    className="markdown"
                >
                    {markdownInput}
                </ReactMarkdown>
            </div>
            <div className="wrapper-live-markdown-editor">
                <div className="head-live-markdown">
                    <Visibility/>
                    MARKDOWN
                </div>
                <textarea
                    autoFocus
                    className="textarea"
                    value={markdownInput}
                    onChange={(e) => setMarkdownInput(e.target.value)}
                ></textarea>
            </div>
            <button className="save-button" onClick={saveNotes}>Save</button>
        </div>
    )
}

export default LiveMarkdown;