import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./health.css";

function Health({healthMax, healthCur, userId}: {healthMax: number, healthCur: number, userId: string}) {

    const [health, setHealth] = useState(healthCur);
    const navigate = useNavigate();

    function handleHealthChange(e: any) {
        setHealth(e.target.value);
    }

    async function handleAccept() {
        const data = {
            userId: userId,
            health: health
        }
        const response = await fetch("/api/game/update-character-health", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (response.status === 401) {
            navigate("/login");
        }
    }

    return (
        <div className={"health-container"}>
            <div className={"health-bar"}>
                <p>HP: {healthMax} / </p>
                <input type={"number"} value={health} onChange={handleHealthChange}/>
            </div>
            <button onClick={handleAccept}>Accept</button>
        </div>
    )
}

export default Health;