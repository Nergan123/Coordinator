import {ItemData} from "@types";
import Item from "../../dm/characters/item";
import "./storage.css";

function friendStorage({items, id}: {items: {[key: string]: ItemData}, id: string}) {
    return (
        <div className={"user-character-items"}>
            <div className={"user-character-item-row-dm"}>
                <Item item={items[1]} cell={"1"} userId={id}/>
                <Item item={items[2]} cell={"2"} userId={id}/>
                <Item item={items[3]} cell={"3"} userId={id}/>
            </div>
            <div className={"user-character-item-row-dm"}>
                <Item item={items[4]} cell={"4"} userId={id}/>
                <Item item={items[5]} cell={"5"} userId={id}/>
                <Item item={items[6]} cell={"6"} userId={id}/>
            </div>
            <div className={"user-character-item-row-dm"}>
                <Item item={items[7]} cell={"7"} userId={id}/>
                <Item item={items[8]} cell={"8"} userId={id}/>
                <Item item={items[9]} cell={"9"} userId={id}/>
            </div>
        </div>
    );
}

export default friendStorage;