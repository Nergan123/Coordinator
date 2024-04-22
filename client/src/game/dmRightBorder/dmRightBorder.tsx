import {useNavigate} from "react-router-dom";

function DmRightBorder({encounter}: {encounter: any}) {

    const navigate = useNavigate();

    return (
        <div className={"dm-right-border"}>
            <div className={"dm-right-border-navigation"}>
                <button onClick={() => navigate("/")}>Main Menu</button>
                <button onClick={() => navigate("/DM")}>DM Panel</button>
                <button>Start Battle</button>
            </div>
            <div className={"dm-right-border-content"}>
                <div className={"dm-right-border-content-encounter-info"}>
                    <h2>Encounter Information</h2>
                    <ul>
                        {
                            encounter && encounter.enemies.map((enemy: any, index: number) => {
                                return (
                                    <li key={index}>
                                        <h3>{enemy.name}</h3>
                                        <p>HP: {enemy.hp}</p>
                                        <p>AC: {enemy.armor}</p>
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