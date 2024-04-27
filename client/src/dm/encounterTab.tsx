import "./encounterTab.css";
import {useNavigate} from "react-router-dom";

function EncounterTab({encounter, setEncounter}: {encounter: any, setEncounter: any}) {

    const navigate = useNavigate();

    function removeEnemyFromEncounter(index: number) {
        const newEncounter = {
            ...encounter,
            enemies: encounter.enemies.filter((enemy: any, i: number) => i !== index),
        }
        setEncounter(newEncounter);
    }

    const locationImageSource = "data:image/png;base64," + encounter.location.image;

    async function setStateEncounter() {

        const encounterToSend = {
            enemies: encounter.enemies.map((enemy: any) => {
                return enemy.id
            }),
            location: encounter.location.name,
        }

        console.log(encounterToSend);

        const response = await fetch("/api/game/update-encounter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({encounter: encounterToSend}),
        });

        if (response.status === 401) {
            navigate("/login");
        }
    }

    return (
        <div className={"encounter-tab"}>
            <div className={"upper"}>
                <div className={"image-container"}>
                    <img src={locationImageSource} alt={"enemy"}/>
                </div>
                <div className={"info"}>
                    <h2>{encounter.location.name}</h2>
                    <p>{encounter.location.description}</p>
                </div>
            </div>
            <div className={"lower"}>
                <div className={"list-of-enemies"}>
                    <ul>
                        {encounter.enemies.map((enemy: any, index: number) => (
                            <li key={index} onClick={() => removeEnemyFromEncounter(index)}>{enemy.name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <button className={"game-nav-button"} onClick={() => {
                navigate("/Game")
            }}>To Campaign</button>
            <button className={"start-encounter-button"} onClick={setStateEncounter}>Start Encounter</button>
            <button className={"main-menu-button-encounter"} onClick={() => {
                navigate("/")
            }}>To Menu
            </button>
        </div>
    );
}

export default EncounterTab;