import {RoleData} from "@types";
import React from "react";
import Weapon from "./weapon";

function RoleElement({data}: {data: RoleData}){

    const imgSource = `data:image/png;base64,${data.image}`;

    return (
        <div className={"role"}>
            <h1>Role</h1>
            <h2>{data.name}</h2>
            <div className={"role-image"}>
                <img src={imgSource} alt={data.name}/>
            </div>
            <div className={"description"}>
                <div className={"stats"}>
                    <div>
                        <h3>Stats</h3>
                        <div className={"stats-container"}>
                            <p>HP: {data.hp}</p>
                            <p>AC: {data.ac}</p>
                        </div>
                    </div>
                    <div className={"weapons"}>
                        <h3>Weapons:</h3>
                        <div className={"weapon-data"}>
                            {data.weapons.map((weapon, index) => (
                                <Weapon data={weapon} key={index}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default RoleElement;