import "./game.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CharacterField from "./characterField/characterField";
import LocationField from "./locationMap/locationField";
import LogChat from "./logChat/logChat";
import GameField from "./gameField/gameField";
import Storage from "./storage/storage";
import TopBar from "./topBar/topBar";

function Game() {

    const [userRole, setUserRole] = useState("");
    const [userId, setUserId] = useState("");
    const [state, setState] = useState({} as any);

    const navigate = useNavigate();

    const getRole = async () => {
        const response = await fetch('/api/user/role');

        if (response.status === 401) {
            console.error('Unauthorized');
            navigate('/Login');
        }

        const data = await response.json();

        setUserRole(data.role);
    }

    const getUserId = async () => {
        const response = await fetch('/api/user/id');

        if (response.status === 401) {
            console.error('Unauthorized');
            navigate('/Login');
        }

        const data = await response.json();

        setUserId(data.id);
    }

    const getState = async () => {
        const response = await fetch("/api/game/state", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status === 401) {
            navigate("/login");
        }
        const data = await response.json();
        setState(data);
    }

    useEffect(() => {
        getRole().then(r => console.log(r));
        getUserId().then(r => console.log(r));
        getState().then(r => console.log(r));
    }, []);

    return (
        <div className={"game-main"}>
            <div className={"left-border"}>
                {state.location && <LocationField location={state.location}/>}
                {state.messages && <LogChat initialMessages={state.messages}/>}
            </div>
            <div className={"middle-border"}>
                {state.characters && <TopBar userName={state.characters[userId].name}/>}
                {state.location && <GameField location={state.location}/>}
                {state.characters && <Storage items={state.characters[userId].items}/>}
            </div>
            {state.characters && <CharacterField character={state.characters[userId]}/>}
        </div>
    );
}

export default Game;