import "./storage.css";
import Item from "./item";
import {ItemData} from "@types";
import {useEffect, useState} from "react";
import io from "socket.io-client";

const socket = io("https://mantis-up-lively.ngrok-free.app");

function Storage({items, userId}: {items: {[key: string]: ItemData}, userId: string}) {

    const [characterItems, setCharacterItems] = useState(items);

    useEffect(() => {
        socket.on(
            'update-character-items', ({items, id}: {items: {[key: string]: ItemData}, id: string}) => {
                if (id === userId) {
                    setCharacterItems(items);
                }
            }
        )
    }, []);

  return (
      <div className={"storage"}>
          <div className={"storage-row"}>
              <Item item={characterItems[1]}/>
              <Item item={characterItems[2]}/>
              <Item item={characterItems[3]}/>
          </div>
          <div className={"storage-row"}>
              <Item item={characterItems[4]}/>
              <Item item={characterItems[5]}/>
              <Item item={characterItems[6]}/>
          </div>
          <div className={"storage-row"}>
              <Item item={characterItems[7]}/>
              <Item item={characterItems[8]}/>
              <Item item={characterItems[9]}/>
          </div>
      </div>
  );
}

export default Storage;