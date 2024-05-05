import CharacterBattle from "./characterBattle";
import EnemyBattle from "./enemyBattle";
import './battle.css';
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../../utils/socketContext";

function Battle({battle, userRole}: {battle: {turn: number, queue: any[]}, userRole: string}) {

    const [turn, setTurn] = useState<number>(battle.turn);
    const socket = useContext(SocketContext);

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

        return () => {
            socket.off("next-turn");
        };
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