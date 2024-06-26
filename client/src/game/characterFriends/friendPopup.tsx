import {CharacterData} from "@types";
import "./popUp.css";
import React, {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../utils/socketContext";

function FriendPopup({friend, onClose, coordinates, invert}: {
    friend: CharacterData,
    onClose: any,
    coordinates: { x: number, y: number },
    invert: boolean
}) {

    const [hp, setHp] = useState(friend.hp);
    const socket = useContext(SocketContext);

    function handleClick() {
        onClose(false);
    }

    function processCoordinates() {
        if (invert) {
            return {x: coordinates.x, y: coordinates.y + 100};
        } else {
            return {x: coordinates.x, y: coordinates.y};
        }
    }

    useEffect(() => {
        socket.on("update-character-health", (data: {name: string, health: number}) => {
            if (data.name === friend.name) {
                setHp(data.health);
            }
        });

        return () => {
            socket.off("update-character-health");
        }
    }, []);

    return (
        <div className={"character-friend-popup"} onClick={handleClick}
             style={{top: `${processCoordinates().y}%`, left: `${processCoordinates().x}%`}}>
            <div className={"character-friend-popup-image"}>
                <img src={friend.image} alt={friend.role.name}/>
            </div>
            <div className={"character-friend-popup-description"}>
                <div className={"character-friend-popup-name"}>
                    <div className={"character-friend-popup-name-role"}>
                        <h3>{friend.name}:</h3>
                        <p>{friend.role.name}</p>
                    </div>
                    <p>HP: {hp} / {friend.role.stats.hp}</p>
                </div>
                <div className={"character-friend-popup-description-bottom"}>
                    <div className={"character-friend-popup-left"}>
                        <div className={"stat-single"}>
                            <b>HP: </b> <p>{friend.role.stats.hp}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>AC: </b> <p>{friend.role.stats.ac}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>DEX: </b> <p>{friend.role.stats.dex}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>CON: </b> <p>{friend.role.stats.con}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>WIS: </b> <p>{friend.role.stats.wis}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>STR: </b> <p>{friend.role.stats.str}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>INT: </b> <p>{friend.role.stats.int}</p>
                        </div>
                    </div>
                    <div className={"character-friend-popup-right"}>
                        <p>{friend.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendPopup;