import { TestBed } from '@angular/core/testing';

import { CalcService } from './calc.service';
import { SharedService } from './shared.service';

describe('CalcService', () => {
  let calcService: CalcService;
  let sharedService: SharedService;

  const mockSharedService = {
    sharedFunction: (a: number, b: number) => '42' // mock-olt logika
  };

  beforeEach(() => {
    // let shared = jasmine.createSpyObj('SharedService', ['SharedFunction']);
    TestBed.configureTestingModule({
      // providers: [] // Ellenőrzi hogy a CalcService megfelelően legyen regisztrálva
      providers: [
        { provide: SharedService, useValue: mockSharedService }
      ]
      /* providers: [
        {
          provider: SharedService, useValue: {
            sharedFunction: (a: number, b: number) => 42
          }
        }
      ] */
    });
    calcService = TestBed.inject(CalcService);
    sharedService = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(calcService).toBeTruthy();
  });

  it('should multiply', () => {
    const result = calcService.multiply(3, 5);
    expect(result).toBe(15);
  });

  it('should call sharedFunction', () => {
    spyOn(sharedService, 'sharedFunction');
    const result = calcService.multiply(3, 5); // a sharedService.sharedFunction()-t is meg lehetne hívni, de a calcService multiply függvénye meghívja
    // expect(sharedService.sharedFunction).toHaveBeenCalled();
    // expect(sharedService.sharedFunction).toHaveBeenCalledTimes(1);
    expect(sharedService.sharedFunction).toHaveBeenCalledWith(3, 5); // más értékekkel: "Expected spy sharedFunction to have been called with: [ 2, 3 ] but actual calls were: [ 3, 5 ]."
  });

  it('should mock return value', () => {
    spyOn(sharedService, 'sharedFunction').and.returnValue('mocked value'); // Mockoljuk a sharedFunction viselkedését
    const result = calcService.multiply(3, 5); // meghívódik a multiply függvényben a SharedService-ben lévő sharedFunction
    expect(sharedService.sharedFunction()).toBe('mocked value'); // ellenőrizzük, hogy a sharedFunction visszatérési értéke 'mocked value'-e
  });

  it('should add', () => {
    let result = calcService.add(1, 4);
    expect(result).toBe(5);
  });

  it('should throw error', () => {
    expect(() => calcService.multiplyError(-1, 5)).toThrowError('Negative numbers are not allowed');
  });

  it('should use mockSharedService', () => { // ellenőrzi, hogy a sharedService változó a mockSharedService objektumra hivatkozik
    expect(sharedService).toBe(mockSharedService);
  });

  it('should still return original value - 42', () => {
    expect(sharedService.sharedFunction()).toBe('42'); // OK, mert a spyOn csak egy előző it-ben volt érvényes
  });
});
