import "./game.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CharacterField from "./characterField/characterField";
import LocationField from "./locationMap/locationField";
import LogChat from "./logChat/logChat";
import GameField from "./gameField/gameField";
import Storage from "./storage/storage";
import TopBar from "./topBar/topBar";
import CharactersFriends from "./characterFriends/characterFriends";
import DmRightBorder from "./dmRightBorder/dmRightBorder";

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

    function getRightBorder() {
        if (userRole === "DM") {
            return (state && <DmRightBorder encounter={state.encounter} />);
        } else {
            return (state.characters && <CharacterField character={state.characters[userId]}/>);
        }
    }

    useEffect(() => {
        getRole().then(r => console.log(r));
        getUserId().then(r => console.log(r));
        getState().then(r => console.log(r));
    }, []);

    return (
        <div className={"game-main"}>
            <div className={"left-border"}>
                {state.encounter && <LocationField location={state.encounter.location}/>}
                {state.messages && <LogChat initialMessages={state.messages}/>}
            </div>
            <div className={"middle-border"}>
                {state.characters && state.characters[userId] && <TopBar character={state.characters[userId]}/>}
                {state.encounter && <GameField location={state.encounter.location}/>}
                <div className={"items-and-characters"}>
                    {state.characters && state.characters[userId] && <Storage items={state.characters[userId].items} userId={userId}/>}
                    {state.characters && <CharactersFriends characters={state.characters} userRole={userRole}/>}
                </div>
            </div>
            {getRightBorder()}
        </div>
    );
}

export default Game;