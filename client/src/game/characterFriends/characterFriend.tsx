import {useState} from "react";
import Storage from "./storage";

function CharacterFriend({ friend, userRole, id }: { friend: any, userRole: string, id: string }) {

    const imgSource = `data:image/png;base64,${friend.image}`
    const [storageOppened, setStorageOppened] = useState(false);

    function handleOnClick() {
        if (userRole==="DM") {
            setStorageOppened(!storageOppened);
        }
    }

    function roleColor() {
        if (friend.role.name === "Soldier") {
            return "rgba(255,28,28,0.5)";
        } else if (friend.role.name === "Medic") {
            return "rgba(61,225,255,0.5)";
        } else if (friend.role.name === "Engineer") {
            return "rgba(0,72,255,0.5)";
        } else if (friend.role.name === "Sniper") {
            return "rgba(213,106,255,0.5)";
        } else if (friend.role.name === "Scout") {
            return "rgba(255,255,50,0.5)";
        } else if (friend.role.name === "Marauder") {
            return "rgba(110,94,255,0.5)";
        }
    }

    const style = {
        backgroundImage: `url(${imgSource})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    const styleInner = {
        background: `linear-gradient(to top, ${roleColor()}, transparent)`,
    }

    return (
        <div className={"character-friend-container"} style={style} key={friend.name}>
            {storageOppened && <Storage items={friend.items} id={id}/>}
            <div className={"character-friend-name-and-image"} onClick={handleOnClick}>
                <div className={"character-friend-stats-and-name"} style={styleInner}>
                    <h3>{friend.name}</h3>
                    <div className={"character-friend-stats"}>
                        <p>HP: {friend.role.stats.hp} / {friend.role.stats.hp}</p>
                        <p>{friend.role.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterFriend;