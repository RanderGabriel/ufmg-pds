export default class User {

    public email: string;
    public password: string;
    public passwordConfirmation?: string;
    public id?: string;
    public token?: string;
    public profile: "MECHANIC" | "DRIVER";

    constructor(entity: User) {
        this.email = entity.email;
        this.password = entity.password;
        this.passwordConfirmation = entity.passwordConfirmation;
        this.profile = entity.profile;
        this.id = entity.id;
        this.token = entity.token;
    }
}