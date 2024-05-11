import {CharacterData} from "@types";
import CharacterFriend from "./characterFriend";
import "./characterFriend.css";
import React from "react";

function CharactersFriends({characters, userRole}: {characters: {[key: string]: CharacterData}, userRole: string}){

    function charactersToList(){
        const charactersList = [];
        for (const key in characters){
            charactersList.push(
                CharacterFriend({friend: characters[key], userRole: userRole, userId: key})
            );
        }
        return charactersList;
    }

    return (
        <div className={"character-characterFriends"}>
            {charactersToList().map((character, index) => React.cloneElement(character, { key: index }))}
        </div>
    );
}

export default CharactersFriends;