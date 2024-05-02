import {CharacterData} from "@types";
import './characterBattle.css';
import React, {useEffect, useState} from "react";
import FriendPopup from "../../characterFriends/friendPopup";
import io from "socket.io-client";

function CharacterBattle({character, selected}: {character: CharacterData, selected: boolean}) {

    const [popupOpened , setPopupOpened] = useState(false);
    const [popupCoordinates, setPopupCoordinates] = useState({x: 0, y: 0});
    const [hp, setHp] = useState(character.hp);

    function handleOnClick(event: React.MouseEvent) {
        const xPercentage = (event.clientX / window.innerWidth) * 100;
        const yPercentage = (event.clientY / window.innerHeight) * 100;

        setPopupOpened(true);
        setPopupCoordinates({x: xPercentage, y: yPercentage});
    }

    function roleColor() {
        if (character.role.name === "Soldier") {
            return "rgba(255,28,28,0.5)";
        } else if (character.role.name === "Medic") {
            return "rgba(61,225,255,0.5)";
        } else if (character.role.name === "Engineer") {
            return "rgba(0,72,255,0.5)";
        } else if (character.role.name === "Sniper") {
            return "rgba(213,106,255,0.5)";
        } else if (character.role.name === "Scout") {
            return "rgba(255,255,50,0.5)";
        } else if (character.role.name === "Marauder") {
            return "rgba(110,94,255,0.5)";
        }
    }

    function getSelectedStyle() {

        if (selected) {
            return {
                backgroundImage: `url(${character.image})`,
                boxShadow: "0 0 10px 5px rgba(255,255,255,0.8)",
            };
        } else {
            return {
                backgroundImage: `url(${character.image})`,
            };
        }
    }

    const styleBackground = {
        background: `linear-gradient(to left, ${roleColor()}, transparent)`,
    }

    useEffect(() => {
        const socket = io("http://localhost:8000");
        socket.on("update-character-health", (data: {name: string, health: number}) => {
            if (data.name === character.name) {
                setHp(data.health);
            }
        });

        return () => {
            socket.emit('manual-disconnect');
            socket.off("update-character-health");
            socket.close();
        }
    }, []);

    return(
        <>
            {popupOpened &&
                <FriendPopup friend={character} onClose={() => setPopupOpened(false)} coordinates={popupCoordinates} invert={true}/>}
            <div className={"character-battle"} style={getSelectedStyle()} onClick={handleOnClick}>
                <div className={"character-battle-name"} style={styleBackground}>
                    <h3>{character.name}</h3>
                    <p>{character.role.name}</p>
                    <p>HP: {hp}/{character.role.stats.hp}</p>
                </div>
            </div>
        </>
    )
}

export default CharacterBattle;