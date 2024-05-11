import React, {useContext, useEffect, useState} from "react";
import FriendStorage from "./storage";
import FriendPopup from "./friendPopup";
import {SocketContext} from "../../utils/socketContext";
import {ItemData} from "@types";

function CharacterFriend({ friend, userRole, userId }: { friend: any, userRole: string, userId: string }) {

    const [storageOpened, setStorageOpened] = useState(false);
    const [hp, setHp] = useState(friend.hp);
    const [characterItems, setCharacterItems] = useState(friend.items);
    const [popupOpened , setPopupOpened] = useState(false);
    const [popupCoordinates, setPopupCoordinates] = useState({x: 0, y: 0});
    const socket = useContext(SocketContext);

    function handleOnClick(event: React.MouseEvent) {
        const xPercentage = (event.clientX / window.innerWidth) * 100;
        const yPercentage = (event.clientY / window.innerHeight) * 100;

        if (userRole==="DM") {
            setStorageOpened(!storageOpened);
        } else {
            setPopupOpened(true);
            setPopupCoordinates({x: xPercentage, y: yPercentage});
        }
    }

    function roleColor() {
        if (friend.role.name === "Soldier") {
            return "rgba(255,28,28,0.5)";
        } else if (friend.role.name === "Medic") {
            return "rgba(61,225,255,0.5)";
        } else if (friend.role.name === "Engineer") {
            return "rgba(0,72,255,0.5)";
        } else if (friend.role.name === "Sniper") {
            return "rgba(213,106,255,0.5)";
        } else if (friend.role.name === "Scout") {
            return "rgba(255,255,50,0.5)";
        } else if (friend.role.name === "Marauder") {
            return "rgba(110,94,255,0.5)";
        }
    }

    const style = {
        backgroundImage: `url(${friend.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    const styleInner = {
        background: `linear-gradient(to top, ${roleColor()}, transparent)`,
    }

    useEffect(() => {
        socket.on("update-character-health", (data: {name: string, health: number}) => {
            if (data.name === friend.name) {
                setHp(data.health);
            }
        });
        socket.on(
            'update-character-items', ({items, id}: {items: {[key: string]: ItemData}, id: string}) => {
                console.log("update-character-items");
                if (userId === id) {
                    setCharacterItems(items);
                }
            }
        );

        return () => {
            socket.off("update-character-health");
            socket.off('update-character-items');
        }
    }, []);

    return (
        <>
            {storageOpened && <FriendStorage itemsInput={characterItems} userId={userId} healthMax={friend.role.stats.hp}
                                             healthCur={friend.hp}/>}
            {popupOpened &&
                <FriendPopup friend={friend} onClose={() => setPopupOpened(false)} coordinates={popupCoordinates} invert={false}/>}
            <div className={"character-friend-container-game"} style={style} key={friend.name} onClick={handleOnClick}>
                <div className={"character-friend-name-and-image"}>
                    <div className={"character-friend-stats-and-name"} style={styleInner}>
                        <h3>{friend.name}</h3>
                        <div className={"character-friend-stats"}>
                            <p>HP: {hp} / {friend.role.stats.hp}</p>
                            <p>{friend.role.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CharacterFriend;