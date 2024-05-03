import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import DiceRoller from "./diceRoller";
import "./topBar.css";
import {CharacterData} from "@types";
import AudioStream from "../audio/audioStream";
import {SocketContext} from "../../utils/socketContext";

function TopBar({character}: {character: CharacterData}) {

    const [diceRollerVisible, setDiceRollerVisible] = useState(false);
    const [hp, setHp] = useState(character.hp);
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    function rollDice() {
        setDiceRollerVisible(!diceRollerVisible);
    }

    useEffect(() => {
        socket.on("update-character-health", (data: {name: string, health: number}) => {
            if (data.name === character.name) {
                setHp(data.health);
            }
        });

        return () => {
            socket.off("update-character-health");
        };
    }, []);

    return (
        <div className="top-bar">
            {diceRollerVisible && <DiceRoller setState={setDiceRollerVisible} userName={character.name}/>}
            <div className="top-bar-left">
                <div className="top-bar-nav">
                    <button onClick={() => navigate("/")}>Main menu</button>
                </div>
                <AudioStream />
            </div>
            <div className="top-bar-center">
                <h1>{character.name}</h1>
                <div className={"character-stats-container-top-bar"} style={{marginLeft: "1em"}}>
                    <h4>HP: {hp} / {character.role.stats.hp}</h4>
                </div>
            </div>
            <div className="top-bar-right">
                <button onClick={rollDice}>Roll Dice</button>
            </div>
        </div>
    )
}

export default TopBar;