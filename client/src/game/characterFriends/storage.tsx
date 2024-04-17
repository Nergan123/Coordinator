import {ItemData} from "@types";
import Item from "../../dm/characters/item";
import "./storage.css";
import {useEffect, useState} from "react";
import io from "socket.io-client";
import Health from "./health";

const socket = io("http://localhost:8001");

function FriendStorage({items, id, healthMax, healthCur}: {items: {[key: string]: ItemData}, id: string, healthMax: number, healthCur: number}) {

    const [characterItems, setCharacterItems] = useState(items);

    useEffect(() => {
        socket.on(
            'update-character-items', ({items, userId}: {items: {[key: string]: ItemData}, userId: string}) => {
                if (userId === id) {
                    setCharacterItems(items);
                }
            }
        )
    }, []);

    return (
        <div className={"friend-storage-and-health"}>
            <Health healthMax={healthMax} healthCur={healthCur} userId={id}/>
            <div className={"user-character-items"}>
                <div className={"user-character-item-row-dm"}>
                    <Item item={characterItems[1]} cell={"1"} userId={id}/>
                    <Item item={characterItems[2]} cell={"2"} userId={id}/>
                    <Item item={characterItems[3]} cell={"3"} userId={id}/>
                </div>
                <div className={"user-character-item-row-dm"}>
                    <Item item={characterItems[4]} cell={"4"} userId={id}/>
                    <Item item={characterItems[5]} cell={"5"} userId={id}/>
                    <Item item={characterItems[6]} cell={"6"} userId={id}/>
                </div>
                <div className={"user-character-item-row-dm"}>
                    <Item item={characterItems[7]} cell={"7"} userId={id}/>
                    <Item item={characterItems[8]} cell={"8"} userId={id}/>
                    <Item item={characterItems[9]} cell={"9"} userId={id}/>
                </div>
            </div>
        </div>
    );
}

export default FriendStorage;