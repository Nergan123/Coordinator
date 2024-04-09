import {useEffect, useState} from "react";
import {EnemyData} from "@types";
import Enemy from "./enemy";
import "./enemyLib.css";

function EnemyLib({encounter, setEncounter}: {encounter: any, setEncounter: any}) {

    const [enemiesList, setEnemyList] = useState<EnemyData[]>([]);

    const fetchEnemies = async () => {
        try {
            const response = await fetch(
                "/api/values",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {value: "enemies"}
                    ),
                }
            );
            const data = await response.json();
            setEnemyList(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchEnemies().then(r => r);
    }, []);

    return (
        <div className={"enemy-lib"}>
            <ul>
                {enemiesList.map((enemy, index) => (
                    <Enemy data={enemy} encounter={encounter} setEncounter={setEncounter} key={index}/>
                ))}
            </ul>
        </div>
    );
}

export default EnemyLib;