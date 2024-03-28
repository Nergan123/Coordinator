import {useEffect, useState} from "react";
import CharacterDisplay from "./characterDisplay";
import "./manageCharacters.css";
import {useNavigate} from "react-router-dom";

function ManageCharacters() {
    const [characters, setCharacters] = useState([]);

    const navigate = useNavigate();

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
            <button onClick={() => navigate("/")} className={"to-main-menu-button"}>Main Menu</button>
        </div>
    );
}

export default ManageCharacters;