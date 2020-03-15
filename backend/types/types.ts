
export interface User {
    email: string;
    passwordHash: string;
    profile: string;
}

export interface Mechanic extends User {
    profile: "MECHANIC";
};

export interface MechanicModel {
    userEmail: string;
};
