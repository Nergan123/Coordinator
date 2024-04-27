export type State = {
    state: string,
    image: string
}

export type AbilityData = {
    name: String;
    description: String;
};

export type EnemyData = {
    name: string;
    id: number;
    hp: number;
    armor: number;
    image: string;
    abilities: AbilityData[];
    description: string;
};

export type LocationData = {
    name: string;
    description: string;
    image: string;
    map: string;
    musicCalm: string[];
    musicBattle: string[];
};

export type WeaponData = {
    name: string;
    damage: number;
    capacity: number;
};

export type RoleData = {
    id: number;
    name: string;
    stats: StatsData;
    image: string;
    description: string;
    weapons: WeaponData[];
    abilities: AbilityData[];
};

export type StatsData = {
    hp: number;
    ac: number;
    dex: number;
    str: number;
    int: number;
    wis: number;
    con: number;
};

export type CharacterData = {
    id: number;
    name: string;
    hp: number;
    description: string;
    role: RoleData;
    image: string;
};

export type ItemData = {
    name: string;
    quantity: number;
}

export type BattleData = {
    turn: number;
    queue: {id: string, player: boolean}[];
}