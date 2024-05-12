import {createContext} from "react";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('notes');
        if (serializedState === null) {
            return {
                notes: "",
            };
        }
        console.log(JSON.parse(serializedState));
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            notes: "",
        };
    }
};

const NotesContext = createContext(loadState());

const NotesProvider = ({children}: any) => {
    return (
        <NotesContext.Provider value={loadState()}>{children}</NotesContext.Provider>
    );
}

export {NotesContext, NotesProvider};