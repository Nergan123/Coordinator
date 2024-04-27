import {EnemyData} from "@types";
import './enemyPopup.css';

function EnemyPopUp({enemy, setOpen, coordinates}: {
    enemy: EnemyData,
    setOpen: any,
    coordinates: { x: number, y: number }
}) {
    const source = `data:image/png;base64,${enemy.image}`;

    function processCoordinates() {
        return {x: coordinates.x, y: coordinates.y};
    }

    return (
        <div className={"enemy-popup"} onClick={() => setOpen(false)}
             style={{top: `${processCoordinates().y}%`, left: `${processCoordinates().x}%`}}>
            <div className={"enemy-popup-image"}>
                <img src={source} alt={enemy.name}/>
            </div>
            <div className={"enemy-popup-description"}>
                <h3>{enemy.name}</h3>
                <p>{enemy.description}</p>
            </div>
        </div>
    );
}

export default EnemyPopUp;