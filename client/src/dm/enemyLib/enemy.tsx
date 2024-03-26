import {EnemyData} from "@types";
import Ability from "./ability";

function Enemy({data}: {data: EnemyData}) {

    const imageSource = "data:image/png;base64," + data.image;

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
                <button>Add to encounter</button>
            </div>
        </div>
    );
}

export default Enemy;