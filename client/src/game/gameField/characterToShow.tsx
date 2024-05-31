import {EnemyData} from "@types";
import './characterToShow.css';

function CharacterToShow({enemy}: {enemy: EnemyData}) {

    const sourceImage = enemy.image;

    const style = {
        backgroundImage: `url(${sourceImage})`,
        backgroundSize: "auto 110%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }

    return(
        <div className={"character-to-show"} style={style}>
            <div className={"character-to-show-info"}>
                <h3>{enemy.name}</h3>
            </div>
        </div>
    );
}

export default CharacterToShow;