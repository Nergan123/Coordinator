export type State = {
    state: string,
    image: string
}

export type AbilityData = {
    name: String;
    damage: Number;
};

export type EnemyData = {
    name: string;
    id: number;
    hp: number;
    armor: number;
    image: string;
    abilities: AbilityData[];
};

export type MusicData = {
    calm: string[];
    battle: string[];
};

export type LocationData = {
    name: string;
    image: string;
    music: MusicData;
}

export type WeaponData = {
    name: string;
    damage: number;
    capacity: number;
};

export type RoleData = {
    id: number;
    name: string;
    hp: number;
    ac: number;
    image: string;
    description: string;
    weapons: WeaponData[];
};

export type CharacterData = {
    id: number;
    name: string;
    description: string;
    role: RoleData;
    image: string;
};