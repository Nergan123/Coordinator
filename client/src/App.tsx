import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import RoutesHome from "./routing/routes";

function App() {
    return (
        <BrowserRouter>
            <RoutesHome />
        </BrowserRouter>
    );
}

export default App;
