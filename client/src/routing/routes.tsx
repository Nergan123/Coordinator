import {Route, Routes} from "react-router-dom";
import RouteGuard from "./routeGuard";
import React from "react";
import Home from "../home/home";
import Game from "../game/game";
import Dm from "../dm/dm";
import Login from "../login/login";
import Register from "../register/register";
import CreateCharacter from "../characters/createCharacter/createCharacter";
import ManageCharacters from "../characters/manageCharacter/manageCharacters";

function RoutesHome() {
    return (
        <Routes>
            <Route path="/" element={<RouteGuard />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="/Game" element={<RouteGuard />}>
                <Route path="/Game" element={<Game />} />
            </Route>
            <Route path="/DM" element={<RouteGuard />}>
                <Route path="/DM" element={<Dm />} />
            </Route>
            <Route path="/CreateCharacter" element={<RouteGuard />}>
                <Route path="/CreateCharacter" element={<CreateCharacter />} />
            </Route>
            <Route path="/ManageCharacters" element={<RouteGuard />}>
                <Route path="/ManageCharacters" element={<ManageCharacters />} />
            </Route>
            <Route path="Login" element={<Login />} />
            <Route path={"Register"} element={<Register />} />
        </Routes>
    );
}

export default RoutesHome;