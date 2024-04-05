import "./item.css"
import {ItemData} from "@types";

function Item({item}: {item: ItemData}) {
    return (
        <div className={"item"}>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
        </div>
    );
}

export default Item;