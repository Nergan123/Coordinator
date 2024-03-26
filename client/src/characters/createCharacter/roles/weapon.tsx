import {WeaponData} from "@types";

function Weapon({data}: {data: WeaponData}) {
    return(
        <div className={"weapon"}>
            <h4>{data.name}</h4>
            <p>Damage: {data.damage}</p>
            <p>Capacity: {data.capacity}</p>
        </div>
    )
}

export default Weapon;