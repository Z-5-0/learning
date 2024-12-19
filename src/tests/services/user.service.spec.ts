import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service"
import { UtilsService } from "./utils.service";
import { UserServiceRxJS } from "./userrxjs.service";
import { take } from "rxjs";

interface UserInterface {
    userID: number;
    name: string;
}

describe('UserService', () => {
    let userService: UserService; // később referenciája lesz a UserService-nek
    let userServiceRxJS: UserServiceRxJS;
    let utilsService: UtilsService;

    /* const utilsServiceMock = {
        pluck: jest.fn() // csak a pluck-ot helyeztük el az objektumban
    } */

    beforeEach(() => { // minden it specifikáció előtt lefut
        TestBed.configureTestingModule({ // úgy lehet rá tekinteni, mint az NgModule-re
            providers: [ // providers-el regisztráljuk a szervizt
                UserService,
                UserServiceRxJS,
                //{ provide: UtilsService, useValue: utilsServiceMock } // annyit jelent, hogy a UtilsService helyett az általunk létrehozott mock-ot használja
                UtilsService
            ]
        });

        userService = TestBed.inject(UserService); // minden tesztben elérhető lesz, mert a root describe-ban deklaráltuk
        userServiceRxJS = TestBed.inject(UserServiceRxJS); // minden tesztben elérhető lesz, mert a root describe-ban deklaráltuk
        utilsService = TestBed.inject(UtilsService);
    });

    it('creates a service', () => {
        expect(userService).toBeTruthy(); // azt várjuk, hogy létrejött a userService
    });

    describe('addUser', () => {
        it('should add a user', () => {
            const user: UserInterface = {
                userID: 3,
                name: 'foo'
            }

            userService.addUser(user);

            expect(userService.users.length).toBeTruthy();
            expect(userService.users).toEqual([{ userID: 3, name: 'foo' }]);
        });
    });

    describe('removeUser', () => {
        it('should remove a user', () => {
            userService.users = [
                { userID: 1, name: 'boo' }
            ];

            const userID = 1;

            userService.removeUser(userID);

            expect(userService.users.length).toBeFalsy();
            expect(userService.users).toEqual([]);
        });
    });

    describe('getUserNames', () => {
        it('should get user names', () => {
            // utilsServiceMock.pluck.mockReturnValue(['foo']); // a mock szerviz pluck kulcsa alatt található függvény ezt az értéket adja vissza
            jest.spyOn(utilsService, 'pluck').mockReturnValue(['boo']); // ez itt egy valós példánya a UtilsService-nek
            // userService.users = [{ userID: 1, name: 'boo' }]
            const allUserNames = userService.getUserNames();
            expect(utilsService.pluck).toHaveBeenCalledWith( // lecsekkoljuk, milyen paraméterekkel lett meghívva a függvény
                userService.users,
                'name'
            );
            expect(allUserNames).toEqual(['boo']);
        });
    });

    describe('addUser RxJS - sync', () => {
        it('should add a user', () => {
            const user: UserInterface = {
                userID: 3,
                name: 'foo'
            }

            userServiceRxJS.addUser(user);

            expect(userServiceRxJS.users$.getValue().length).toBeTruthy();
            expect(userServiceRxJS.users$.getValue()).toEqual([{ userID: 3, name: 'foo' }]);
        });
    });

    describe('addUser RxJS - async', () => {
        it('should add a user', (done) => {
            const user: UserInterface = {
                userID: 3,
                name: 'foo'
            }

            userServiceRxJS.addUser(user);

            userServiceRxJS.users$
                .pipe(take(1)) // biztosítja, hogy csak 1 értéket vizsgáljunk
                .subscribe({
                    next: () => {
                        expect(userServiceRxJS.users$.getValue().length).toBeTruthy();
                        expect(userServiceRxJS.users$.getValue()).toEqual([{ userID: 3, name: 'foo' }]);
                        done();
                    }
                });
        });
    });

    describe('removeUser RxJS - sync', () => {
        it('should remove a user', () => {
            userServiceRxJS.users$.next(
                [{ userID: 1, name: 'boo' }]
            );

            const userID = 1;

            userServiceRxJS.removeUser(userID);

            expect(userServiceRxJS.users$.getValue().length).toBeFalsy();
            expect(userServiceRxJS.users$.getValue()).toEqual([]);
        });
    });

    describe('removeUser RxJS - async', () => {
        it('should remove a user', (done) => {
            userServiceRxJS.users$.next(
                [{ userID: 1, name: 'boo' }]
            );

            const userID = 1;

            userServiceRxJS.removeUser(userID);

            userServiceRxJS.users$
                .pipe(take(1)) // biztosítja, hogy csak 1 értéket vizsgáljunk
                .subscribe({
                    next: () => {
                        expect(userServiceRxJS.users$.getValue().length).toBeFalsy();
                        expect(userServiceRxJS.users$.getValue()).toEqual([]);
                        done();
                    }
                });
        });
    });
})