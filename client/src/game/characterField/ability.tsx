import {AbilityData} from "@types";
import "./ability.css";

function Ability({ability}: {ability: AbilityData}) {
    return (
        <div className={"ability-single-container"}>
            <h4>{ability.name}</h4>
            <p>{ability.description}</p>
        </div>
    );
}

export default Ability;