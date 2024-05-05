import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import RoutesHome from "./routing/routes";
import {SocketProvider} from "./utils/socketContext";

function App() {
    return (
        <SocketProvider>
            <BrowserRouter>
                <RoutesHome />
            </BrowserRouter>
        </SocketProvider>
    );
}

export default App;
