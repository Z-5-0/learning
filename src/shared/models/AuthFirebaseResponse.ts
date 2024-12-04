export interface AuthFirebaseResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    kind: string;
    registered?: boolean; // optional property, csak bejelentkezésnél kapjuk meg
}