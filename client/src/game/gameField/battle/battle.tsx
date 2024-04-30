import CharacterBattle from "./characterBattle";
import EnemyBattle from "./enemyBattle";
import './battle.css';
import io from "socket.io-client";
import {useEffect, useState} from "react";

const socket = io("http://localhost:8000");

function Battle({battle, userRole}: {battle: {turn: number, queue: any[]}, userRole: string}) {

    const [turn, setTurn] = useState<number>(battle.turn);

    function getCharacterOrEnemy(item: any, selected: boolean, index: number) {
        if (item.role) {
            return <CharacterBattle character={item} selected={selected}/>;
        } else {
            return <EnemyBattle enemy={item} selected={selected} userRole={userRole} index={index}/>;
        }
    }

    useEffect(() => {
        socket.on("next-turn", (turn: number) => {
            setTurn(turn);
        });
    }, []);

    return (
        <div className={"battle-container"}>
            <ul>
                {
                    battle.queue.map((item, index) => {
                        return (
                            <li key={index}>
                                {getCharacterOrEnemy(item, index === turn, index)}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Battle;