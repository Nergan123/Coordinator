import {LocationData} from "@types";
import './gameField.css';
import io from "socket.io-client";
import {useEffect, useState} from "react";

const socket = io("https://mantis-up-lively.ngrok-free.app");

function GameField({location}: {location: LocationData}) {

    const [locationState, setLocationState] = useState<LocationData>(location);
    const sourceImage = `data:image/jpeg;base64,${locationState.image}`;

    useEffect(() => {
        socket.on("update-encounter", (location: LocationData) => {
            setLocationState(location);
        });
    }, []);

    return (
        <div className="game-field">
            <img src={sourceImage} alt={location.name} className="gameImage"/>
        </div>
    );
}

export default GameField;