import {useNavigate} from "react-router-dom";
import {Cookies} from "react-cookie";

function Home() {

    const navigate = useNavigate();
    const cookies = new Cookies();

    function logOut() {
        cookies.remove("token");
        navigate("/Login");
    }

    return (
        <div className={"home"}>
            <div className={"button-container"}>
                <button onClick={() => navigate("/Game")}>To campaign</button>
                <button onClick={() => navigate("/CreateCharacter")}>Create character</button>
                <button onClick={() => navigate("/ManageCharacters")}>Manage characters</button>
            </div>
            <button className={"logout"} onClick={logOut}>Log out</button>
        </div>
    );
}

export default Home;