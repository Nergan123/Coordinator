import {useNavigate} from "react-router-dom";
import {useState} from "react";
import DiceRoller from "./diceRoller";
import "./topBar.css";
import {CharacterData} from "@types";

function TopBar({character}: {character: CharacterData}) {

    const [diceRollerVisible, setDiceRollerVisible] = useState(false);
    const navigate = useNavigate();

    function rollDice() {
        setDiceRollerVisible(!diceRollerVisible);
    }

    return (
        <div className="top-bar">
            {diceRollerVisible && <DiceRoller setState={setDiceRollerVisible} userName={character.name}/>}
            <div className="top-bar-left">
                <div className="top-bar-nav">
                    <button onClick={() => navigate("/")}>Main menu</button>
                </div>
            </div>
            <div className="top-bar-center">
                <h1>{character.name}</h1>
                <div className={"character-stats-container-top-bar"} style={{marginLeft: "1em"}}>
                    <h4>HP: {character.role.stats.hp} / {character.role.stats.hp}</h4>
                </div>
            </div>
            <div className="top-bar-right">
                <button onClick={rollDice}>Roll Dice</button>
            </div>
        </div>
    )
}

export default TopBar;