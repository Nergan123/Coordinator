import {useEffect, useState} from "react";
import CharacterDisplay from "./characterDisplay";
import "./manageCharacters.css";

function ManageCharacters() {
    const [characters, setCharacters] = useState([]);

    const getCharacters = async () => {
        const response = await fetch("/api/values",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({value: "characters"})
            });
        const data = await response.json();
        setCharacters(data);
        console.log(data);
    }

    useEffect(() => {
        getCharacters().then();
    }, []);

    return (
        <div className={"character-management"}>
            {characters.map((character: any) => {
                return (<CharacterDisplay character={character} key={character.name}/>);
            })}
        </div>
    );
}

export default ManageCharacters;