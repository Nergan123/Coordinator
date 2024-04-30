import {EnemyData} from "@types";
import './enemyBattle.css';
import React, {useState} from "react";
import EnemyPopUp from "./enemyPopUp";

function EnemyBattle({enemy, selected, userRole, index}: {
    enemy: EnemyData,
    selected: boolean,
    userRole: string,
    index: number
}) {

    const imgSource = `data:image/png;base64,${enemy.image}`
    const [popupOpened, setPopupOpened] = useState(false);
    const [popupCoordinates, setPopupCoordinates] = useState({x: 0, y: 0});

    function handleOnClick(event: React.MouseEvent) {
        const xPercentage = (event.clientX / window.innerWidth) * 100;
        const yPercentage = (event.clientY / window.innerHeight) * 100;

        setPopupOpened(true);
        setPopupCoordinates({x: xPercentage, y: yPercentage});
    }

    function getSelectedStyle() {

        if (selected) {
            return {
                backgroundImage: `url(${imgSource})`,
                boxShadow: "0 0 10px 5px rgba(255,55,55,0.8)",
            };
        } else {
            return {
                backgroundImage: `url(${imgSource})`,
            };
        }
    }

    return (
        <>
            {popupOpened &&
                <EnemyPopUp enemy={enemy} setOpen={setPopupOpened} coordinates={popupCoordinates} index={index}
                            userRole={userRole}/>}
            <div className={"enemy-battle"} style={getSelectedStyle()} onClick={handleOnClick}>
                <div className={"enemy-battle-name"}>
                    <h3>{enemy.name}</h3>
                </div>
            </div>
        </>
    )
}

export default EnemyBattle;