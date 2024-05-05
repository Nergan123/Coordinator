import React, {useContext, useState} from "react";
import "./diceRoller.css";
import {useNavigate} from "react-router-dom";
import {SocketContext} from "../../utils/socketContext";

function DiceRoller({setState, userName}: {setState: any, userName: string}) {
  const [diceSides, setDiceSides] = useState<number>(20);
  const [diceNumber, setDiceNumber] = useState<number>(1);
  const socket = useContext(SocketContext);

  const navigate = useNavigate();

  function handleDiceSidesChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) < 1) {
      setDiceSides(1);
      return;
    }
    if (parseInt(e.target.value) > 1000) {
      setDiceSides(1000);
      return;
    }
    setDiceSides(parseInt(e.target.value));
  }

    function handleDiceNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (parseInt(e.target.value) < 1) {
            setDiceNumber(1);
            return;
        }
        if (parseInt(e.target.value) > 100) {
            setDiceNumber(100);
            return;
        }
        setDiceNumber(parseInt(e.target.value));
    }

    function createMessage(rolls: number[], userName: string) {
      if (diceNumber <= 1) {
          console.log("1 dice");
        return `${userName} rolled a d${diceSides}: ${rolls[0]}`;
      } else if (1 < diceNumber && diceNumber <= 10) {
          console.log("less than 10 dice");
        return `${userName} rolled ${diceNumber}d${diceSides}: ${rolls.join(", ")} = ${rolls.reduce((a, b) => a + b)}`;
      } else {
          console.log("more than 10 dice");
        return `${userName} rolled ${diceNumber}d${diceSides}: ${rolls.reduce((a, b) => a + b)}`;
      }
    }

  function rollDice(){
    const result = [];
    for (let i = 0; i < diceNumber; i++) {
        const roll = Math.floor(Math.random() * diceSides + 1);
        if (roll === 0) {
            result.push(1);
            continue;
        }
        result.push(roll);
    }
    const message = createMessage(result, userName);
    socket.emit("add-message", message);
    setState(false);
  }

  return (
    <div className={"dice-roller-input-frame"}>
        <div className={"dice-roller-input"}>
            <input type="number" placeholder="Number of dice" value={diceNumber.toString()} onChange={handleDiceNumberChange} />
            <h3>d</h3>
            <input type="number" placeholder="Number of sides" value={diceSides.toString()} onChange={handleDiceSidesChange} />
        </div>
        <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
}

export default DiceRoller;