import {CharacterData} from "@types";
import "./popUp.css";
import React from "react";

function FriendPopup({friend, onClose, coordinates }: { friend: CharacterData, onClose: any, coordinates: { x: number, y: number }}) {

    const source = `data:image/png;base64,${friend.image}`;

    function handleClick() {
        onClose(false);
    }

    return (
        <div className={"character-friend-popup"} onClick={handleClick} style={{top: `${coordinates.y}%`, left: `${coordinates.x}%`}}>
            <div className={"character-friend-popup-image"}>
                <img src={source} alt={friend.role.name}/>
            </div>
            <div className={"character-friend-popup-description"}>
                <div className={"character-friend-popup-name"}>
                    <div className={"character-friend-popup-name-role"}>
                        <h3>{friend.name}:</h3>
                        <p>{friend.role.name}</p>
                    </div>
                    <p>HP: {friend.hp} / {friend.role.stats.hp}</p>
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