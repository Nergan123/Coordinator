import {RoleData} from "@types";
import React from "react";
import Weapon from "./weapon";
import Ability from "./ability";

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
                <div className={"stats-character-build"}>
                    <div>
                        <h3>Stats</h3>
                        <div className={"stats-container"}>
                            <p>HP: {data.stats.hp}</p>
                            <p>AC: {data.stats.ac}</p>
                            <p>DEX: {data.stats.dex}</p>
                            <p>STR: {data.stats.str}</p>
                            <p>INT: {data.stats.int}</p>
                            <p>WIS: {data.stats.wis}</p>
                            <p>CON: {data.stats.con}</p>
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
                <div className={"abilities"}>
                    <h3>Abilities:</h3>
                    <div className={"ability-data"}>
                        {data.abilities.map((ability, index) => (
                            <Ability ability={ability} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default RoleElement;