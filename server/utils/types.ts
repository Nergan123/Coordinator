export type State = {
    state: String,
    image: String
};

export type Stats = {
    hp: Number;
    ac: Number;
    dex: Number;
    str: Number;
    int: Number;
    wis: Number;
    con: Number;
};

export type Weapon = {
    name: String;
    damage: Number;
    capacity: Number;
};

export type Ability = {
    name: String;
    description: String;
};

export type User = {
    id: string;
    name: string;
    role: string;
};

export type CharacterData = {
    name: string;
    description: string;
    role: string;
    imageName: string;
};

export type Item = {
    name: string;
    quantity: number;
}
