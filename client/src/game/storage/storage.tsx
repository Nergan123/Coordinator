import "./storage.css";
import Item from "./item";
import {ItemData} from "@types";
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../utils/socketContext";

function Storage({items, userId}: {items: {[key: string]: ItemData}, userId: string}) {

    const [characterItems, setCharacterItems] = useState(items);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on(
            'update-character-items', ({items, id}: {items: {[key: string]: ItemData}, id: string}) => {
                if (userId === id) {
                    setCharacterItems(items);
                }
            }
        );

        return () => {
            socket.off('update-character-items');
        };
    }, []);

    return (
        <div className={"storage"}>
            <Item item={characterItems[1]}/>
            <Item item={characterItems[2]}/>
            <Item item={characterItems[3]}/>
            <Item item={characterItems[4]}/>
            <Item item={characterItems[5]}/>
            <Item item={characterItems[6]}/>
            <Item item={characterItems[7]}/>
            <Item item={characterItems[8]}/>
            <Item item={characterItems[9]}/>
        </div>
    );
}

export default Storage;