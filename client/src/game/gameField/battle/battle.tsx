import CharacterBattle from "./characterBattle";
import EnemyBattle from "./enemyBattle";
import './battle.css';
import io from "socket.io-client";
import {useEffect, useState} from "react";

const socket = io("http://localhost:8000");

function Battle({battle}: {battle: {turn: number, queue: any[]}}) {

    const [turn, setTurn] = useState<number>(battle.turn);

    function getCharacterOrEnemy(item: any, selected: boolean) {
        if (item.role) {
            return <CharacterBattle character={item} selected={selected}/>;
        } else {
            return <EnemyBattle enemy={item} selected={selected} />;
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
                                {getCharacterOrEnemy(item, index === turn)}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Battle;