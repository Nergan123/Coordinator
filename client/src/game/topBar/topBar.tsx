import {useNavigate} from "react-router-dom";
import {useState} from "react";
import DiceRoller from "./diceRoller";
import "./topBar.css";

function TopBar({userName}: {userName: string}) {

    const [diceRollerVisible, setDiceRollerVisible] = useState(false);
    const navigate = useNavigate();

    function rollDice() {
        setDiceRollerVisible(!diceRollerVisible);
    }

    return (
        <div className="top-bar">
            {diceRollerVisible && <DiceRoller setState={setDiceRollerVisible} userName={userName}/>}
            <div className="top-bar-nav">
                <button onClick={() => navigate("/")}>Main menu</button>
            </div>
            <div className="top-bar-right">
                <button onClick={rollDice}>Roll Dice</button>
            </div>
        </div>
    )
}

export default TopBar;