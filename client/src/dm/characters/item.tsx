import {ItemData} from "@types";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./item.css";

function Item({item, cell}: {item: ItemData, cell: string}) {

    const [quantity, setQuantity] = useState(item.quantity);
    const [name, setName] = useState(item.name);
    const [clicked, setClicked] = useState(false);

    const navigate = useNavigate();

    function openControls() {
        return (
            <div className={"item-controls"}>
                <input type={"number"} value={quantity} onChange={handleQuantityChange}/>
                <input type={"text"} value={name} onChange={handleNameChange}/>
                <div className={"item-buttons"}>
                    <button onClick={handleApply}>Apply</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        );
    }

    async function handleApply() {
        const data = {
            cell: cell,
            item: {
                name: name,
                quantity: quantity
            }
        }
        const response = await fetch("/api/game/update-character-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            navigate("/login");
        }
        handleSetClicked();
    }

    async function handleDelete() {
        const data = {
            cell: cell,
            item: {}
        }
        const response = await fetch("/api/game/update-character-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            navigate("/login");
        }
        handleSetClicked();
    }

    function handleSetClicked() {
        setClicked(!clicked);
    }

    function handleQuantityChange(e: any) {
        setQuantity(e.target.value);
    }

    function handleNameChange(e: any) {
        setName(e.target.value);
    }

    return (
        <div>
            {clicked && openControls()}
            <div className={"item-container-dm-page"} onClick={handleSetClicked}>
                <h1>{name}</h1>
                <p>{quantity}</p>
            </div>
        </div>
    )
}

export default Item;