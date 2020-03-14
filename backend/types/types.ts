
export interface User {
    email: string;
    passwordHash: string;
    profile: string;
}

export interface Driver extends User {
    profile: "DRIVER";
};
