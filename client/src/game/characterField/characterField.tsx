import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {CharacterData} from "@types";
import "./characterField.css";
import Weapon from "./weapon";
import Ability from "./ability";

function CharacterField({characterName}: {characterName: string}) {

    const [character, setCharacter] = useState<CharacterData | null>(null);
    const navigate = useNavigate();

    const getCharacter = async () => {
        const response = await fetch('/api/values', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value: "characters"})
        });

        if (response.status === 401) {
            console.error('Unauthorized');
            navigate('/Login');
        }

        const data = await response.json();
        setCharacter(data.find((character: CharacterData) => character.name === characterName));
    }

    useEffect(() => {
        getCharacter().then(r => console.log(r));
    }, []);

    return (
        <div className={"character-field"}>
            {character && <div>
                <h2>{character.name}</h2>
                <img src={`data:image/png;base64,${character.image}`} alt={character.name}/>
                <div className={"character-stats-container"}>
                    <div className={"stats-field"}>
                        <div className={"stat-single"}>
                            <b>HP: </b> <p>{character.role.stats.hp}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>AC: </b> <p>{character.role.stats.ac}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>DEX: </b> <p>{character.role.stats.dex}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>CON: </b> <p>{character.role.stats.con}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>WIS: </b> <p>{character.role.stats.wis}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>STR: </b> <p>{character.role.stats.str}</p>
                        </div>
                        <div className={"stat-single"}>
                            <b>INT: </b> <p>{character.role.stats.int}</p>
                        </div>
                    </div>
                    <div className={"character-description"}>
                        <p>{character.description}</p>
                    </div>
                </div>
                <div className={"role-field"}>
                    <h3>Role: {character.role.name}</h3>
                    <div className={"role-stats"}>
                        <div className={"weapons-container"}>
                            <h4 style={{marginBottom: "1em"}}>Weapons:</h4>
                            <ul>
                                {character.role.weapons.map((weapon, index) => <li key={index}><Weapon weapon={weapon} /></li>)}
                            </ul>
                        </div>
                        <div className={"abilities-container"}>
                            <h4 style={{marginBottom: "1em"}}>Abilities:</h4>
                            <ul>
                                {character.role.abilities.map((ability, index) => <li key={index}><Ability ability={ability} /></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default CharacterField;