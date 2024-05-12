import {useNavigate} from "react-router-dom";
import AudioStream from "../audio/audioStream";
import "./dmRightBorder.css";
import {useCallback, useContext, useEffect, useState} from "react";
import {SocketContext} from "../../utils/socketContext";
import Notes from "../topBar/notes/notes";

function DmRightBorder({encounterInput}: {encounterInput: any}) {

    const navigate = useNavigate();
    const [enemies, setEnemies] = useState<any>([...encounterInput.enemies]);
    const socket = useContext(SocketContext);

    async function startBattle() {
        const setBattle = await getBattle();
        console.log("SetBattle: ", setBattle);
        const response = await fetch("/api/game/battle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({status: setBattle}),
        });

        if (response.status === 200) {
            console.log("Battle started");
        } else {
            console.error("Failed to start battle");
        }
        const data = await response.json();
        console.log(data);
    }

    const getBattle = async () => {
        const response = await fetch("/api/game/battle", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status === 401) {
            navigate("/login");
        }

        const data = await response.json();
        return !data.battle;
    }

    async function makeTurn() {
        const response = await fetch("/api/game/next-turn", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            console.log("Turn made");
        } else {
            console.error("Failed to make turn");
        }
        const data = await response.json();
        console.log(data);
    }

    async function addToBattle(id: string) {
        const response = await fetch("/api/game/battle-add-to-queue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id}),
        });

        if (response.status === 200) {
            console.log("Added to battle");
        } else {
            console.error("Failed to add to battle");
        }
    }

    async function showCharacter(character: any) {
        console.log("Calling api show")
        console.log(character);
        socket.emit("show-character", character);
    }

    async function hideCharacter(id: string) {
        console.log("Calling api hide")
        socket.emit("hide-character", id);
    }

    const handleEncounter = useCallback((encounter: any) => {
        setEnemies(encounter.enemies);
    },[]);

    useEffect(() => {
        socket.on("update-encounter", (encounter: {location: any, enemies: any}) => {
            handleEncounter(encounter);
        });

        return () => {
            socket.off("update-encounter");
        }
    }, []);

    return (
        <div className={"dm-right-border"}>
            <div className={"dm-right-border-navigation"}>
                <button onClick={() => navigate("/")}>Main Menu</button>
                <button onClick={() => navigate("/DM")}>DM Panel</button>
                <button onClick={startBattle}>Start Battle</button>
                <button onClick={makeTurn}>Next Turn</button>
                <AudioStream />
                <Notes />
            </div>
            <div className={"dm-right-border-content"}>
                <div className={"dm-right-border-content-encounter-info"}>
                    <h2>Encounter Information</h2>
                    <ul>
                        {
                            enemies && enemies.map((enemy: any, index: number) => {
                                return (
                                    <li key={index}>
                                        <div className={"enemy-info-dm-border"}>
                                            <h3>{enemy.name}</h3>
                                            <p>HP: {enemy.hp}</p>
                                            <p>AC: {enemy.armor}</p>
                                        </div>
                                        <button onClick={async () => await addToBattle(enemy.id)}>Add to battle</button>
                                        <button onClick={async () => await showCharacter(enemy)}>Show</button>
                                        <button onClick={async () => await hideCharacter(enemy.id.toString())}>Hide</button>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DmRightBorder;