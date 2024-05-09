import {ItemData} from "@types";
import Item from "../../dm/characters/item";
import "./storage.css";
import {useContext, useEffect, useState} from "react";
import Health from "./health";
import {SocketContext} from "../../utils/socketContext";

function FriendStorage({itemsInput, userId, healthMax, healthCur}: {itemsInput: {[key: string]: ItemData}, userId: string, healthMax: number, healthCur: number}) {

    const [characterItems, setCharacterItems] = useState(itemsInput);
    const socket = useContext(SocketContext);

    const getItems = async () => {
        const response = await fetch("/api/game/get-character-items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userId: userId})
        });

        if (response.status === 401) {
            return;
        }

        const data = await response.json();
        setCharacterItems(data.items);
    }

    useEffect(() => {
        getItems().then();
    }, []);

    return (
        <div className={"friend-storage-and-health"}>
            <Health healthMax={healthMax} healthCur={healthCur} userId={userId}/>
            <div className={"user-character-items"}>
                {Object.keys(characterItems).map((key) => (
                    <Item item={characterItems[key]} cell={key} userId={userId} key={key}/>
                ))}
            </div>
        </div>
    );
}

export default FriendStorage;