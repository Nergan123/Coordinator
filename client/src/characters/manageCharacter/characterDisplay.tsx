import {CharacterData} from "@types";

function CharacterDisplay({character}: {character: CharacterData}){

    return (
        <div className={"character"}>
            <h1>{character.name}</h1>
            <div className={"stats"}>
                <div className={"description"}>
                    <p>{character.description}</p>
                </div>
                <div className={"image"}>
                    <img src={`data:image/png;base64,${character.image}`} alt={character.name}/>
                </div>
            </div>
            <div className={"role"}>
                <h2>Role: {character.role.name}</h2>
                <div className={"role-description"}>
                    <p>{character.role.description}</p>
                    <img src={`data:image/png;base64,${character.role.image}`} alt={character.role.name}/>
                </div>
                <div className={"role-stats"}>
                    <div className={"role-stat"}>
                        <h3>Stats:</h3>
                        <p>HP: {character.role.hp}</p>
                        <p>AC: {character.role.ac}</p>
                    </div>
                    <div className={"weapons"}>
                        <h3>Weapons:</h3>
                        <div className={"weapon-container"}>
                            {character.role.weapons.map((weapon: any) => {
                                return (
                                    <div className={"weapon"} key={weapon.name}>
                                        <h4>{weapon.name}</h4>
                                        <p>Damage: {weapon.damage}</p>
                                        <p>Capacity: {weapon.capacity}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharacterDisplay;