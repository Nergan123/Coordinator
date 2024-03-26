import EnemyLib from "./enemyLib/enemyLib";
import "./dm.css";
import {useState} from "react";
import {Menu, MenuItem, Sidebar, SubMenu} from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {LibraryAdd, Map, SportsMartialArts} from "@mui/icons-material";
import LocationsLib from "./locationLib/locationsLib";
import EncounterTab from "./encounterTab";

function Dm() {

    const [collapsed, setCollapsed] = useState(true);
    const [enemyLibOpened, setEnemyLibOpened] = useState(false);
    const [locationsLibOpened, setLocationsLibOpened] = useState(false);

    function toggleCollapsed() {
        setCollapsed(!collapsed);
    }

    function toggleEnemyLib() {
        setEnemyLibOpened(!enemyLibOpened);
    }

    function toggleLocationsLib() {
        setLocationsLibOpened(!locationsLibOpened);
    }

    return (
        <div className={"dm-page"}>
            <Sidebar collapsed={collapsed} className={"side-bar"} backgroundColor={"#CACFD6"}>
                <Menu>
                    <MenuItem icon={<MenuOutlinedIcon/>} onClick={toggleCollapsed}/>
                    <SubMenu icon={<LibraryAdd />} label={"Libraries"}>
                        <MenuItem icon={<SportsMartialArts />} onClick={toggleEnemyLib}>Enemy Library</MenuItem>
                        <MenuItem icon={<Map />} onClick={toggleLocationsLib}>Locations Library</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
            <div className={"libs"}>
                {enemyLibOpened && <EnemyLib />}
                {locationsLibOpened && <LocationsLib />}
            </div>
            <EncounterTab />
        </div>
    );
}

export default Dm;