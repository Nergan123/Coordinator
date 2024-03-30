import "./game.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CharacterField from "./characterField/characterField";
import {LocationData} from "@types";
import LocationField from "./locationMap/locationField";
import LogChat from "./logChat/logChat";
import GameField from "./gameField/gameField";
import Storage from "./storage/storage";

function Game() {

    const [userRole, setUserRole] = useState("");
    const [location, setLocation] = useState<LocationData>({
        name: "",
        description: "",
        image: "",
        map: "",
        musicCalm: [],
        musicBattle: []
    });

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

    const getLocation = async () => {
        const response = await fetch('/api/game/location');

        if (response.status === 401) {
            console.error('Unauthorized');
            navigate('/Login');
        }

        const data = await response.json();

        setLocation(data.location);
    }

    useEffect(() => {
        getRole().then(r => console.log(r));
        getLocation().then(r => console.log(r));
    }, []);

    return (
        <div className={"game-main"}>
            <div className={"left-border"}>
                {location !== undefined && <LocationField location={location} />}
                <LogChat />
            </div>
            <div className={"middle-border"}>
                <GameField location={location} />
                <Storage />
            </div>
            <CharacterField characterName={"Nergan"} />
        </div>
    );
}

export default Game;