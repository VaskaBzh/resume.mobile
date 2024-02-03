export class RegistrationFormData {
    constructor(email = "", name = "", password = "", password_confirmation = "") {
        this.email = email;
        this.name = name;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
}
