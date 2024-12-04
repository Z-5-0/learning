export class AuthUser {

    id: number = 0;
    name: string = '';
    gender: string = '';
    username: string = '';
    password: string = '';
    status: string = '';

    constructor(id: number, name: string, gender: string, username: string, password: string, status: string) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.username = username;
        this.password = password;
        this.status = status;
    }
}