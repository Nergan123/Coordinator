import {EnemyData} from "@types";
import './enemyPopup.css';

function EnemyPopUp({enemy, setOpen, coordinates, userRole, index}: {
    enemy: EnemyData,
    setOpen: any,
    coordinates: { x: number, y: number },
    userRole: string,
    index: number
}) {
    const source = `data:image/png;base64,${enemy.image}`;

    function processCoordinates() {
        return {x: coordinates.x, y: coordinates.y};
    }

    async function removeFromBattle() {
        const response = await fetch("/api/game/battle-remove-from-queue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                index: index
            })
        });

        if (response.status === 401) {
            console.log("Unauthorized");
        }

        setOpen(false);
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
            {userRole === "DM" && <button onClick={removeFromBattle}>Remove from battle</button>}
        </div>
    );
}

export default EnemyPopUp;