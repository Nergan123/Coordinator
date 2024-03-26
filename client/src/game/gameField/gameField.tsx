import { State } from "@types";
import Enemy from "./enemy";

type Props = {
    gameState: State
}

function GameField({gameState}: Props) {

    function getEnemies() {
        return (
            <Enemy image={gameState.image} />
        )
    }

    return (
        <div className="gameField">
            {getEnemies()}
        </div>
    );
}

export default GameField;