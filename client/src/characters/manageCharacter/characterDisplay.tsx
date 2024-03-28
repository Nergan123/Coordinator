import {CharacterData} from "@types";

function CharacterDisplay({character}: {character: CharacterData}){

    function processCharacterData(character: CharacterData) {
        return {
            name: character.name,
            description: character.description,
            role: {
                name: character.role.name,
                stats: {
                    hp: character.role.stats.hp,
                    ac: character.role.stats.ac,
                    dex: character.role.stats.dex,
                    str: character.role.stats.str,
                    int: character.role.stats.int,
                    wis: character.role.stats.wis,
                    con: character.role.stats.con
                },
                description: character.role.description,
                weapons: character.role.weapons,
                abilities: character.role.abilities,
            }
        };
    }

    async function useGameCharacter() {
        const characterOutput = processCharacterData(character);
        console.log(characterOutput);
        const response = await fetch('/api/game/add-character', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({character: characterOutput}),
        });
        if (response.status === 200) {
            console.log('Character added successfully');
        } else {
            console.error('Failed to add character');
        }
    }

    async function deleteCharacter() {
        const response = await fetch("/api/character-delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({characterName: character.name})
        })
        if (response.status === 200) {
            console.log("Character deleted successfully");
        } else {
            console.error("Failed to delete character");
        }
        window.location.reload();
    }

    return (
        <div className={"character-display-div"}>
            <h1>{character.name}</h1>
            <div className={"stats"}>
                <div className={"description"}>
                    <p>{character.description}</p>
                </div>
                <div className={"image"}>
                    <img src={`data:image/png;base64,${character.image}`} alt={character.name}/>
                </div>
            </div>
            <div className={"role-character-display"}>
                <h2>Role: {character.role.name}</h2>
                <div className={"role-description"}>
                    <p>{character.role.description}</p>
                    <img src={`data:image/png;base64,${character.role.image}`} alt={character.role.name}/>
                </div>
                <div className={"role-stats"}>
                    <div className={"role-stat"}>
                        <h3>Stats:</h3>
                        <p>HP: {character.role.stats.hp}</p>
                        <p>AC: {character.role.stats.ac}</p>
                        <p>DEX: {character.role.stats.dex}</p>
                        <p>STR: {character.role.stats.str}</p>
                        <p>INT: {character.role.stats.int}</p>
                        <p>WIS: {character.role.stats.wis}</p>
                        <p>CON: {character.role.stats.con}</p>
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
                <div className={"abilities"}>
                    <h3>Abilities:</h3>
                    <div className={"ability-container"}>
                        {character.role.abilities.map((ability: any) => {
                            return (
                                <div className={"ability"} key={ability.name}>
                                    <h4>{ability.name}</h4>
                                    <p>{ability.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={"action-buttons"}>
                <button onClick={useGameCharacter}>Use</button>
                <button onClick={deleteCharacter}>Delete</button>
            </div>
        </div>
    );
}

export default CharacterDisplay;