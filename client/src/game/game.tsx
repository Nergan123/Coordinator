import "./game.css";
import {useEffect, useState} from "react";
import GameField from "./gameField/gameField";

function Game() {

    const [gameState, setGameState] = useState({} as any);

    const getState = async () => {
        const response = await fetch('/api/game/state');
        const json = await response.json();
        setGameState(json);
    }

    useEffect(() => {
        getState().then(r => console.log(r));
    }, []);

    return (
        <div className={"game-main"}>
            <div className={"game-menu"}>
                <GameField gameState={gameState} />
            </div>
        </div>
    );
}

export default Game;