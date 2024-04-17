import {RoleData} from "@types";
import React, {useEffect, useState} from "react";
import RoleElement from "./roles/role";
import "./createCharacter.css";
import {useNavigate} from "react-router-dom";

function CreateCharacter() {
    const [roles, setRoles] = useState<RoleData[]>([]);
    const [chosenRole, setChosenRole] = useState<RoleData | null>(null);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [characterImage, setCharacterImage] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const navigate = useNavigate()

    function handleSetName(e: React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value);
    }

    function handleSetDescription(e: React.ChangeEvent<HTMLTextAreaElement>){
        setDescription(e.target.value);
    }

    function handleSetCharacterImage(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        setImageFile(file);

        if(file){
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                if(result && typeof result === "string"){
                    setCharacterImage(result);
                    console.log(result)
                }
            }
            reader.readAsDataURL(file);
        }
    }

    function compileCharacterData(){
        if(!name || !description || !chosenRole || !characterImage){
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile as Blob);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('role', chosenRole.name);
        formData.append('hp', chosenRole.stats.hp.toString());

        return formData
    }

    async function saveCharacter() {
        const data = compileCharacterData();
        if (!data) {
            return;
        }

        const response = await fetch("api/character-create",
            {
                method: "POST",
                body: data
            });
        if (response.status === 200) {
            navigate("/");
        } else if (response.status === 401) {
            navigate("/Login");
        } else {
            console.error("Failed to create character");
        }
    }
    const fetchRoles = async () => {
        const response = await fetch("api/values",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({value: "roles"})
            });
        if (response.status != 200) {
            navigate("/Login");
        }
        const data = await response.json();
        setRoles(data);
    }

    useEffect(() => {
        fetchRoles().then();
    }, []);

    return (
        <div className={"character-creation"}>
            <div className={"settings"}>
                <h1>Character Creation</h1>
                <span>Character Name :</span>
                <input type={"text"} id={"character-name"} onChange={handleSetName}/>
                <span>Character Description :</span>
                <textarea className={"text-field"} placeholder={"Character Description.."}
                          onChange={handleSetDescription}/>
                <span>Character Image</span>
                <input type={"file"} accept={"image/*"} onChange={handleSetCharacterImage} placeholder={"select image"}/>
                <div className="overlay-layer">Upload photo</div>
                <div className={"role-selection"}>
                    <h2>Role Selection</h2>
                    <select onChange={(e) => {
                        const role = roles.find(role => role.name === e.target.value);
                        setChosenRole(role || null);
                    }}>
                        <option value={""}>Select a role</option>
                        {roles.map((role, index) => (
                            <option value={role.name} key={index}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <button className={"save-button"} onClick={saveCharacter}>Save Character</button>
            </div>

            <button onClick={() => navigate("/")} className={"back-button"}>Back</button>

            <div className={"character-build"}>
                <div className={"character-description"}>
                    <h1>{name}</h1>
                    <p>{description}</p>
                    <img src={characterImage} alt={name} style={{width: "100%"}}/>
                </div>
                {chosenRole && <RoleElement data={chosenRole}/>}
            </div>
        </div>
    );
}

export default CreateCharacter;