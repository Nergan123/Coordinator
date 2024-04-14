import UserCharacter from "./character";

function CharacterLib({characters}: {characters: {[key: string]: any}}) {
    console.log(characters)
    return (
        <div className={"character-lib-container"}>
            {characters && Object.keys(characters).map((key) => {
                const character = characters[key];
                return (
                    <UserCharacter character={character} key={key} id={key}/>
                );
            })}
        </div>
    );
}

export default CharacterLib;