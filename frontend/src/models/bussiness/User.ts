export default class User {

    public email: string;
    public password: string;
    public passwordConfirmation?: string;
    public passwordResetToken?: string;
    public phoneNumber?: number;
    public name?: string;
    public id?: string;
    public token?: string;
    public profile: "MECHANIC" | "DRIVER";

    constructor(entity: User) {
        this.email = entity.email;
        this.password = entity.password;
        this.passwordConfirmation = entity.passwordConfirmation;
        this.passwordResetToken = entity.passwordResetToken;
        this.profile = entity.profile;
        this.id = entity.id;
        this.token = entity.token;
        this.phoneNumber = entity.phoneNumber;
        this.name = entity.name;
    }
}