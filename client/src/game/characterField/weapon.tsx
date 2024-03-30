import {WeaponData} from "@types";
import "./weapon.css";

function Weapon({weapon}: {weapon: WeaponData}) {
    return (
        <div className={"weapon-single-container"}>
            <h4>{weapon.name}</h4>
            <p>Damage: {weapon.damage}</p>
            <p>Capacity: {weapon.capacity}</p>
        </div>
    );
}

export default Weapon;