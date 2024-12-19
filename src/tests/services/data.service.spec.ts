import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // ellenőrizzük, hogy minden HTTP kérés kezelve lett
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // ellenőrzi, hogy létrejött-e a DataService-ből példány
  });

  it('should get all users', (done) => {
    const mockUsers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
      { id: 3, name: 'Harry Potter' }
    ];

    service.getAllUsers().subscribe((users: any) => {
      const thirdUser = users.find((user: any) => user.id === 3);

      expect(users).toBeTruthy();  // ellenőrizzük, hogy az adatokat valóban megkapjuk
      expect(users.length).toBe(3);  // ellenőrizzük, hogy 3 felhasználót kaptunk-e
      expect(thirdUser.name).toBe('Harry Potter'); // ellenőrizzük, hogy a 3-mas ID-val rendelkező user neve Harry Potter-e

      done(); // az aszinkron teszt befejezéséhez szükséges
    });

    const mockRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users'); // szimuláljuk a HTTP GET kérést és annak válaszát
    expect(mockRequest.request.method).toBe('GET'); // ellenőrizzük a HTTP request metódust
    mockRequest.flush(mockUsers); // szimulált adatok visszaküldése a service számára
  });

  it('should get one user by ID', (done) => {
    const mockUser = { id: 3, name: 'Harry Potter' };

    service.getUserByID(3).subscribe((user: any) => {
      expect(user).toBeTruthy();
      expect(user.name).toEqual('Harry Potter');
      done();
    });

    const mockRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users/3');
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(mockUser);
  });

  it('should update one user by ID', (done) => {
    const mockUser = { id: 3, name: 'Tom Denem' };
    const mockUserChange = { name: 'Tom Denem' };

    service.updateUser(3, mockUserChange).subscribe((user: any) => {
      expect(user.id).toBe(3);
      done();
    });

    const mockRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users/3');
    expect(mockRequest.request.method).toBe('PUT');
    expect(mockRequest.request.body).toBe(mockUserChange);
    expect(mockRequest.request.body).toEqual({ name: 'Tom Denem' });
    mockRequest.flush(mockUser);
  });
});
