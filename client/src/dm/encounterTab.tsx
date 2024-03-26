import "./encounterTab.css";

function EncounterTab() {
    return (
        <div className={"encounter-tab"}>
            <div className={"upper"}>
                <div className={"image-container"}>
                    <img src={"https://via.placeholder.com/150"} alt={"enemy"}/>
                </div>
                <div className={"info"}>
                    <h2>Location Name</h2>
                    <p>Description</p>
                </div>
            </div>
            <div className={"lower"}>
                <div className={"list-of-players"}>
                    <ul>
                        <li>Player 1</li>
                        <li>Player 2</li>
                        <li>Player 3</li>
                    </ul>
                </div>
                <div className={"list-of-enemies"}>
                    <ul>
                        <li>Enemy 1</li>
                        <li>Enemy 2</li>
                        <li>Enemy 3</li>
                    </ul>
                </div>
            </div>

            <button className={"start-encounter-button"}>Start Encounter</button>
        </div>
    );
}

export default EncounterTab;