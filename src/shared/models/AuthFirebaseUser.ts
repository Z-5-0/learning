export class AuthFirebaseUser {
    constructor(
        public id: string,
        public email: string,
        private _token: string, // nem tesszük elérhetővé osztályon kívül
        private _expiresIn: Date // nem tesszük elérhetővé osztályon kívül
    ) { }

    get token() {
        if (!this._expiresIn || this._expiresIn < new Date()) {
            return null;
        }
        return this._token;
    }

    /* set token(value: string) { // nem kívánunk ilyen opciót, ezért van kikommentezve
        if (!value) {
        }
        this._token = value;
    } */
}