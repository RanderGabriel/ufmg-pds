export default class User {

    public id?: string;
    public name?: string;
    public email: string;
    public password: string;
    public passwordConfirmation?: string;
    public passwordResetToken?: string;
    public phoneNumber?: string | undefined;
    public token?: string;
    public profile: "MECHANIC" | "DRIVER";

    constructor(entity: User) {
        this.id = entity.id;
        this.name = entity.name;
        this.email = entity.email;
        this.password = entity.password;
        this.passwordConfirmation = entity.passwordConfirmation;
        this.passwordResetToken = entity.passwordResetToken;
        this.phoneNumber = entity.phoneNumber;
        this.token = entity.token;
        this.profile = entity.profile;
    }
}
