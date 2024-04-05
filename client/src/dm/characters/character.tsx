import Item from "./item";
import "./character.css";

function UserCharacter({character}: {character: any}) {

    const imageSource = "data:image/png;base64," + character.image;

    return (
        <div className={"user-character-container"}>
            <h1>{character.name}</h1>
            <img src={imageSource} alt={character.name} />
            <div className={"user-character-items"}>
                <div className={"user-character-item-row-dm"}>
                    <Item item={character.items[1]} cell={"1"} />
                    <Item item={character.items[2]} cell={"2"} />
                    <Item item={character.items[3]} cell={"3"} />
                </div>
                <div className={"user-character-item-row-dm"}>
                    <Item item={character.items[4]} cell={"4"} />
                    <Item item={character.items[5]} cell={"5"} />
                    <Item item={character.items[6]} cell={"6"} />
                </div>
                <div className={"user-character-item-row-dm"}>
                    <Item item={character.items[7]} cell={"7"} />
                    <Item item={character.items[8]} cell={"8"} />
                    <Item item={character.items[9]} cell={"9"} />
                </div>
            </div>
        </div>
    );
}

export default UserCharacter;