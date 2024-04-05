import {useNavigate} from "react-router-dom";
import {Cookies} from "react-cookie";
import {useEffect, useState} from "react";

function Home() {

    const [userRole, setUserRole] = useState("");

    const navigate = useNavigate();
    const cookies = new Cookies();

    function logOut() {
        cookies.remove("token");
        navigate("/Login");
    }

    const getRole = async () => {
        const response = await fetch('/api/user/role');

        if (response.status === 401) {
            console.error('Unauthorized');
            navigate('/Login');
        }

        const data = await response.json();

        setUserRole(data.role);
    }

    useEffect(() => {
        getRole().then(r => console.log(r));
    }, []);

    return (
        <div className={"home"}>
            <div className={"button-container"}>
                <button onClick={() => navigate("/Game")}>To campaign</button>
                <button onClick={() => navigate("/CreateCharacter")}>Create character</button>
                <button onClick={() => navigate("/ManageCharacters")}>Manage characters</button>
                {userRole === "DM" && <button onClick={() => navigate("/Dm")}>DM panel</button>}
            </div>
            <button className={"logout"} onClick={logOut}>Log out</button>
        </div>
    );
}

export default Home;