import { Injectable } from "@angular/core";
import { AuthUser } from "../models/AuthUser";

@Injectable({
    providedIn: 'root'
})

export class AuthUserService {
    users: AuthUser[] = [
        new AuthUser(31927, 'Carl Smith', 'male', 'cath123', '123', 'active'),
        new AuthUser(87078, 'Johanna Bree', 'female', 'breeJ', 'bree', 'inactive'),
        new AuthUser(54394, 'Max King', 'male', 'maxi05', 'max', 'active'),
        new AuthUser(23740, 'Claire Whitmore', 'female', 'more-claire', 'moremore', 'active'),
        new AuthUser(17669, 'Julia Yellowstone', 'female', 'LiaYeNe', 'lia', 'inactive'),
        new AuthUser(47590, 'Adam Black', 'male', 'blackadam', 'blad', 'active'), // negyedévente
    ];
}