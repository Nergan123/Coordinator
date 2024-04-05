import EnemyLib from "./enemyLib/enemyLib";
import "./dm.css";
import {useEffect, useState} from "react";
import {Menu, MenuItem, Sidebar, SubMenu} from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {LibraryAdd, Map, Person, SportsMartialArts} from "@mui/icons-material";
import LocationsLib from "./locationLib/locationsLib";
import EncounterTab from "./encounterTab";
import {useNavigate} from "react-router-dom";
import CharacterLib from "./characters/characterLib";

function Dm() {

    const [state, setState] = useState({} as any);
    const [collapsed, setCollapsed] = useState(true);
    const [enemyLibOpened, setEnemyLibOpened] = useState(false);
    const [locationsLibOpened, setLocationsLibOpened] = useState(false);
    const [usersOpened, setUsersOpened] = useState(false);

    const navigate = useNavigate();

    function toggleCollapsed() {
        setCollapsed(!collapsed);
    }

    function toggleEnemyLib() {
        setEnemyLibOpened(!enemyLibOpened);
    }

    function toggleLocationsLib() {
        setLocationsLibOpened(!locationsLibOpened);
    }

    function toggleUsers() {
        setUsersOpened(!usersOpened);
    }

    const getState = async () => {
        const response = await fetch("/api/game/state", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status === 401) {
            navigate("/login");
        }
        const data = await response.json();
        setState(data);
    }

    useEffect(() => {
        getState().then(r => console.log("State loaded"));
    }, []);

    return (
        <div className={"dm-page"}>
            <Sidebar collapsed={collapsed} className={"side-bar"} backgroundColor={"#CACFD6"}>
                <Menu>
                    <MenuItem icon={<MenuOutlinedIcon/>} onClick={toggleCollapsed}/>
                    <SubMenu icon={<LibraryAdd />} label={"Libraries"}>
                        <MenuItem icon={<SportsMartialArts />} onClick={toggleEnemyLib}>Enemy Library</MenuItem>
                        <MenuItem icon={<Map />} onClick={toggleLocationsLib}>Locations Library</MenuItem>
                    </SubMenu>
                    <MenuItem icon={<Person />} onClick={toggleUsers}>Users</MenuItem>
                </Menu>
            </Sidebar>
            <div className={"libs"}>
                {enemyLibOpened && <EnemyLib />}
                {locationsLibOpened && <LocationsLib />}
                {usersOpened && <CharacterLib characters={state.characters}/> }
            </div>
            <EncounterTab />
        </div>
    );
}

export default Dm;