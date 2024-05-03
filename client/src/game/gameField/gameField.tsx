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
    const [encounterState, setEncounterState] = useState<any>(state.encounter);
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
                return encounterState.enemies.find((enemy: any) => {
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
        getBattle().then(r => console.log(r));
        socket.on("update-encounter", (encounter: {location: any, enemies: any}) => {
            console.log("Encounter received: ", encounter);
            console.log("EncounterState old: ", encounterState);
            setEncounterState(encounter);
            setLocationState(encounter.location);
            console.log("EncounterState new: ", encounterState);
        });
        socket.on("battle", (battle: BattleData) => {
            handleBattle(battle);
        });
        socket.on("show-character", (character: any) => {
            setCharacterToShow(character);
        });
        socket.on("hide-character", (id: number) => {
            setCharacterToShow(undefined);
        });

        return () => {
            socket.off("update-encounter");
            socket.off("battle");
            socket.off("show-character");
            socket.off("hide-character");
        }
    }, []);

    return (
        <div className="game-field">
            <img src={sourceImage} alt={encounterState.location.name} className="gameImage"/>
            {battle != null && <Battle battle={battle} userRole={userRole}/>}
            {characterToShow && !battle && <CharacterToShow enemy={characterToShow} />}
        </div>
    );
}

export default GameField;