import {BattleData, EnemyData, LocationData} from "@types";
import './gameField.css';
import React, {useContext, useEffect, useState} from "react";
import Battle from "./battle/battle";
import {useNavigate} from "react-router-dom";
import CharacterToShow from "./characterToShow";
import {SocketContext} from "../../utils/socketContext";

function GameField({state, userRole}: {state: any, userRole: string}) {

    const [locationState, setLocationState] = useState<LocationData>(state.encounter.location);
    const [battle, setBattle] = useState<BattleData | null>(state.battle);
    const [characterToShow, setCharacterToShow] = useState<EnemyData>();
    const [encounter, setEncounter] = useState<any>(state.encounter);
    const sourceImage = `data:image/jpeg;base64,${locationState.image}`;
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

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
        const queue = battle.queue.map((item) => {
            if (item.player) {
                return state.characters[item.id];
            } else {
                console.log("Item: ", item);
                console.log("State: ", state);
                return state.encounter.enemies.find((enemy: any) => {
                    console.log("Enemy: ", enemy);
                    console.log("ID: ", enemy.id.toString());
                    return enemy.id.toString() === item.id
                });
            }
        });
        const newBattle = {
            ...battle,
            queue: queue,
        }
        setCharacterToShow(undefined);
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
        socket.on("show-character", (id: number) => {
            const enemyToShow = state.encounter.enemies.find((enemy: any) => enemy.id == id);
            setCharacterToShow(enemyToShow);
        });
        socket.on("hide-character", (id: number) => {
            setCharacterToShow(undefined);
        });
        socket.on("update-enemies", (enemies: any) => {
            const newEncounter = {
                ...encounter,
                enemies: enemies,
            }
            setEncounter(newEncounter);
        });

        return () => {
            socket.off("update-encounter");
            socket.off("battle");
            socket.off("show-character");
            socket.off("hide-character");
        }
    }, []);
    useEffect(() => {
        getBattle().then(r => console.log(r));
    }, []);

    return (
        <div className="game-field">
            <img src={sourceImage} alt={state.encounter.location.name} className="gameImage"/>
            {battle != null && <Battle battle={battle} userRole={userRole}/>}
            {characterToShow && !battle && <CharacterToShow enemy={characterToShow} />}
        </div>
    );
}

export default GameField;