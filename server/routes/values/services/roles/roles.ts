import data from "../../../../data/roles.json";
import Role from "./role";

class Roles {
    private readonly roles: Role[];

    constructor() {
        this.roles = data.map((role: any) => {
            return new Role(role.id, role.name, role.stats, role.image, role.description, role.weapons, role.abilities);
        });
    }

    public getRoles(): Role[] {
        return this.roles;
    }
}

export default Roles;