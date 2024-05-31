import {EnemyData} from "@types";
import Ability from "./ability";

function Enemy({data, encounter, setEncounter}: {data: EnemyData, encounter: any, setEncounter: any}) {

    const imageSource = data.image;

    function addToEncounter() {
        const newEncounter = {
            ...encounter,
            enemies: [...encounter.enemies, data],
        }
        setEncounter(newEncounter);
    }

    return (
        <div className={"enemy"}>
            <div className={"wrapper"}>
                <div className={"enemy-header"}>
                    <h2>{data.name}</h2>
                    <p>HP: {data.hp}</p>
                    <p>Armor: {data.armor}</p>
                    <ul>
                        {data.abilities.map((ability, index) => (
                            <li key={index}><Ability ability={ability} key={index}/></li>
                        ))}
                    </ul>
                </div>
                <img src={imageSource} alt={data.name}/>
            </div>
            <div className={"actions"}>
                <button onClick={addToEncounter}>Add to encounter</button>
            </div>
        </div>
    );
}

export default Enemy;