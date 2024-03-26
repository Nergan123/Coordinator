export type State = {
    state: String,
    image: String
};

export type Ability = {
    name: String;
    damage: Number;
};

export type Music = {
    calm: string[];
    battle: string[];
};

export type Weapon = {
    name: String;
    damage: Number;
    capacity: Number;
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
