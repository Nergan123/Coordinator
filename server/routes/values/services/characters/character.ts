import Role from "../roles/role";

class Character {
    name: string;
    private description: string;
    public role: Role;
    private image: string;

    constructor(name: string, description: string, role: Role, image: string) {
        this.name = name;
        this.description = description;
        this.role = role;
        this.image = image;
    }
}

export default Character;