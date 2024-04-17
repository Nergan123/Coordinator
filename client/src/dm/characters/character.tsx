import Item from "./item";
import "./character.css";

function UserCharacter({character, id}: {character: any, id: string}) {

    const imageSource = "data:image/png;base64," + character.image;

    return (
        <div className={"user-character-container"}>
            <h1>{character.name}</h1>
            <img src={imageSource} alt={character.name} />
            <div className={"user-character-items-lib"}>
                <div className={"user-character-item-row-dm"}>
                    <Item item={character.items[1]} cell={"1"} userId={id}/>
                    <Item item={character.items[2]} cell={"2"} userId={id}/>
                    <Item item={character.items[3]} cell={"3"} userId={id}/>
                </div>
                <div className={"user-character-item-row-dm"}>
                    <Item item={character.items[4]} cell={"4"} userId={id}/>
                    <Item item={character.items[5]} cell={"5"} userId={id}/>
                    <Item item={character.items[6]} cell={"6"} userId={id}/>
                </div>
                <div className={"user-character-item-row-dm"}>
                    <Item item={character.items[7]} cell={"7"} userId={id}/>
                    <Item item={character.items[8]} cell={"8"} userId={id}/>
                    <Item item={character.items[9]} cell={"9"} userId={id}/>
                </div>
            </div>
        </div>
    );
}

export default UserCharacter;