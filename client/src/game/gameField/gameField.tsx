import {BattleData, LocationData} from "@types";
import './gameField.css';
import io from "socket.io-client";
import {useEffect, useState} from "react";
import Battle from "./battle/battle";
import {useNavigate} from "react-router-dom";

const socket = io("http://localhost:8000");

function GameField({state, userRole}: {state: any, userRole: string}) {

    const [locationState, setLocationState] = useState<LocationData>(state.encounter.location);
    const [battle, setBattle] = useState<BattleData | null>(state.battle);
    const sourceImage = `data:image/jpeg;base64,${locationState.image}`;
    const navigate = useNavigate();

    const getBattle = async () => {
        const response = await fetch("/api/game/battle", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status === 401) {
            navigate("/login");
        }

        const data = await response.json();
        handleBattle(data.battle);
    }

    function handleBattle(battle: BattleData) {
        if (battle == null) {
            setBattle(battle);
            return;
        }
        console.log(state.characters);
        console.log(battle);
        const queue = battle.queue.map((item) => {
            if (item.player) {
                return state.characters[item.id];
            } else {
                return state.encounter.enemies.find((enemy: any) => enemy.id.toString() === item.id);
            }
        });
        const newBattle = {
            ...battle,
            queue: queue,
        }

        setBattle(newBattle);
    }

    useEffect(() => {
        socket.on("update-encounter", (location: LocationData) => {
            setLocationState(location);
        });
        socket.on("battle", (battle: BattleData) => {
            console.log("Received: ", battle);
            handleBattle(battle);
        });
    }, []);
    useEffect(() => {
        getBattle().then(r => console.log(r));
    }, []);

    return (
        <div className="game-field">
            <img src={sourceImage} alt={state.encounter.location.name} className="gameImage"/>
            {battle != null && <Battle battle={battle} userRole={userRole}/>}
        </div>
    );
}

export default GameField;