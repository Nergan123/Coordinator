import {BattleData, EnemyData, LocationData} from "@types";
import './gameField.css';
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import Battle from "./battle/battle";
import {useNavigate} from "react-router-dom";
import CharacterToShow from "./characterToShow";
import {SocketContext} from "../../utils/socketContext";

function GameField({state, userRole}: {state: any, userRole: string}) {

    const [locationState, setLocationState] = useState<LocationData>(state.encounter.location);
    const [battle, setBattle] = useState<BattleData | null>(state.battle);
    const [characterToShow, setCharacterToShow] = useState<EnemyData>();
    const encounterStateRef = useRef(state.encounter);
    encounterStateRef.current = state.encounter;
    const sourceImage = locationState.image;
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

    const fetchEnemies = async () => {
        try {
            const response = await fetch(
                "/api/values",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {value: "enemies"}
                    ),
                }
            );
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    function handleBattle(battle: BattleData) {
        if (battle == null) {
            setBattle(battle);
            return;
        }

        fetchEnemies().then((enemies) => {
            const newBattle = {
                ...battle,
                queue: battle.queue.map((item) => {
                    if (item.player) {
                        return state.characters[item.id];
                    } else {
                        return enemies.find((enemy: any) => {
                            return enemy.id.toString() === item.id
                        });
                    }
                }),
            }
            setBattle(newBattle);
        });
    }

    const handleLocation = useCallback((encounter: any) => {
        setLocationState(encounter.location);
    }, []);

    useEffect(() => {
        getBattle().then();
        socket.on("update-encounter", (encounter: {location: any, enemies: any}) => {
            handleLocation(encounter);
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
            <img src={sourceImage} alt={encounterStateRef.current.location.name} className="gameImage"/>
            {battle != null && <Battle battle={battle} userRole={userRole}/>}
            {characterToShow && !battle && <CharacterToShow enemy={characterToShow} />}
        </div>
    );
}

export default GameField;