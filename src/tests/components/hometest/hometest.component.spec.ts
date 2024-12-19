import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { HometestComponent } from './hometest.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { delay, of } from 'rxjs';
import { GradeDirective } from 'src/tests/directives/grade.directive';
import { GradePipe } from 'src/tests/pipes/grade.pipe';

describe('HometestComponent', () => {
  let component: HometestComponent;
  let fixture: ComponentFixture<HometestComponent>;
  let debugElement: DebugElement;

  /* beforeEach(waitForAsync(
    () => {
      TestBed.configureTestingModule({
        declarations: [HometestComponent]
      }).compileComponents().then(
        () => {
          fixture = TestBed.createComponent(HometestComponent);
          fixture.detectChanges();
          component = fixture.componentInstance;
          debugElement = fixture.debugElement;
        }
      );
    })); */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HometestComponent, GradePipe, GradeDirective],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HometestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should have a paragraph in the template', () => {
    let paragraphs = debugElement.queryAll(By.css('p')); // array-jal tér vissza
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  xit('should have fixed text first paragraph', () => {
    let paragraphs = debugElement.queryAll(By.css('p'));
    expect(paragraphs[0].nativeElement.textContent).toBe('This is a test home component');
  });

  xit('should have first button disabled attribute', () => {
    let buttonElements = debugElement.queryAll(By.css('.btn'));
    expect(buttonElements[0].nativeElement.disabled).toBeTrue(); // megnézzük, hogy van-e disabled attribútuma a gombnak
  });

  xit('should have fixed source first image', () => {
    let imageElements = debugElement.queryAll(By.css('img'));
    expect(imageElements[0].nativeElement.src).toBe('https://placehold.co/300x200'); // megnézzük, hogy megfelelő-e a source-a az első képnek
  });

  xit('should have fixed string interpolation of title', () => {
    component.title = 'Hi';
    fixture.detectChanges();
    let titleElements = debugElement.queryAll(By.css('.title'));
    expect(titleElements[0].nativeElement.textContent).toBe('Hi');
  });

  xit('should have button with the text Subscribe', () => {
    let buttonElements = debugElement.queryAll(By.css('.subscribe'));
    component.isSubscribed = false;
    component.subscribeText = 'Subscribe'; // a determinálhatóság érdekében gyakran explicit módon állítjuk be a property-ket, hogy garantáltan a tesztkörnyezet kívánt állapotát teszteljük
    fixture.detectChanges();
    expect(buttonElements[0].nativeElement.textContent).toBe('Subscribe');
    expect(buttonElements[0].nativeElement.disabled).toBeFalse();
    // expect(component.isSubscribed).toBeFalse();
  });

  xit('should have button with the text Subscribed and a disabled attribute (WRONG)', () => { // DOM interakciót nem tesztelünk, így nem ez a megfelelő mód
    let buttonElements = debugElement.queryAll(By.css('.subscribe'));
    component.isSubscribed = true;
    component.subscribeText = 'Subscribed';
    fixture.detectChanges();
    expect(buttonElements[0].nativeElement.textContent).toBe('Subscribed');
    expect(buttonElements[0].nativeElement.disabled).toBeTrue();
  });

  xit('should have button with the text Subscribed and a disabled attribute (RIGHT)', () => { // DOM interakció teszt
    let buttonElements = debugElement.queryAll(By.css('.subscribe'));
    component.subscribeText = 'Subscribe';
    component.isSubscribed = false;
    buttonElements[0].nativeElement.click(); // az eventeknek a change detection előtt kell szerepelniük
    fixture.detectChanges();
    expect(buttonElements[0].nativeElement.textContent).toBe('Subscribed');
    expect(buttonElements[0].nativeElement.disabled).toBeTrue;
  });

  xit('should have a conditional button when not subscribed', () => {
    component.isSubscribed = false; // Kezdeti állapot
    fixture.detectChanges(); // DOM frissítése

    let buttonElements = debugElement.queryAll(By.css('.conditional-sub')); // *ngIf="!isSubscribed"
    expect(buttonElements.length).toBe(1); // csak egy gomb jelenhet meg
    expect(buttonElements[0].nativeElement.textContent).toBe('Subscribe'); // a gomb szövegének itt még Subcribe-nak kell lennie
    expect(buttonElements[0].nativeElement.disabled).toBeFalse(); // ellenőrizzük, hogy a gomb nem tiltott

    buttonElements[0].triggerEventHandler('click', null); // meghívja a (click)="subscribe()" metódust -> isSubscribed = true
    // buttonElements[0].nativeElement.click(); // ez is működik
    fixture.detectChanges(); // újrarenderelés / lefutnak a lifecycle hookok

    buttonElements = debugElement.queryAll(By.css('.conditional-sub')); // *ngIf="isSubscribed" / nem frissül automatikusan, az újrarenderelés után újra le kell kérdezni
    expect(buttonElements.length).toBe(1); // csak egy gomb jelenhet meg
    expect(buttonElements[0].nativeElement.textContent).toBe('Subscribed'); // a gomb szövege immáron Subcribe
    expect(buttonElements[0].nativeElement.disabled).toBeTrue(); // a gomb legyen disabled
  });

  xit('should have a conditional button when subscribed', () => {
    component.isSubscribed = true; // Kezdeti állapot
    fixture.detectChanges(); // DOM frissítése

    let buttonElements = debugElement.queryAll(By.css('.conditional-sub')); // a length 1, hiszen true az érték, így csak a *ngIf="isSubscribed" fog megjelenni
    expect(buttonElements.length).toBe(1); // csak egy gomb jelenhet meg
    expect(buttonElements[0].nativeElement.textContent).toBe('Subscribed');
    expect(buttonElements[0].nativeElement.disabled).toBeTrue(); // a gomb legyen disabled
  });

  xit('should have a conditional button when not subscribed (simulating API / 3s delay)', (done: DoneFn) => {
    component.isApiSubscribed = false; // Kezdeti állapot
    fixture.detectChanges(); // DOM frissítése

    let buttonElements = debugElement.queryAll(By.css('.conditional-sub-api')); // *ngIf="!isApiSubscribed"
    expect(buttonElements.length).toBe(1); // csak egy gomb jelenhet meg
    expect(buttonElements[0].nativeElement.textContent).toBe('Subscribe'); // a gomb szövegének itt még Subcribe-nak kell lennie
    expect(buttonElements[0].nativeElement.disabled).toBeFalse(); // ellenőrizzük, hogy a gomb nem tiltott

    buttonElements[0].triggerEventHandler('click', null); // meghívja a (click)="apiSubscribe()" metódust -> isApiSubscribed = true
    // buttonElements[0].nativeElement.click(); // ez is működik

    setTimeout(() => {
      fixture.detectChanges(); // újrarenderelés / lefutnak a lifecycle hookok
      buttonElements = debugElement.queryAll(By.css('.conditional-sub-api')); // *ngIf="isApiSubscribed" / nem frissül automatikusan, az újrarenderelés után újra le kell kérdezni
      expect(buttonElements.length).toBe(1); // csak egy gomb jelenhet meg
      expect(buttonElements[0].nativeElement.textContent).toBe('Subscribed'); // a gomb szövege immáron Subcribe
      expect(buttonElements[0].nativeElement.disabled).toBeTrue(); // a gomb legyen disabled
      done();
    }, 3000);
  });

  xit('should have a conditional button when not subscribed (simulating API / 3s delay)', fakeAsync(() => {
    component.isApiSubscribed = false; // Kezdeti állapot
    fixture.detectChanges(); // DOM frissítése

    let buttonElements = debugElement.queryAll(By.css('.conditional-sub-api')); // *ngIf="!isApiSubscribed"
    expect(buttonElements.length).toBe(1); // csak egy gomb jelenhet meg
    expect(buttonElements[0].nativeElement.textContent).toBe('Subscribe'); // a gomb szövegének itt még Subcribe-nak kell lennie
    expect(buttonElements[0].nativeElement.disabled).toBeFalse(); // ellenőrizzük, hogy a gomb nem tiltott

    buttonElements[0].triggerEventHandler('click', null); // meghívja a (click)="apiSubscribe()" metódust -> isApiSubscribed = true
    // buttonElements[0].nativeElement.click(); // ez is működik
    flush();

    fixture.detectChanges(); // az összes async művelet végrehajtása után újrarenderelés

    buttonElements = debugElement.queryAll(By.css('.conditional-sub-api')); // *ngIf="isApiSubscribed" / nem frissül automatikusan, az újrarenderelés után újra le kell kérdezni
    expect(buttonElements.length).toBe(1); // csak egy gomb jelenhet meg
    expect(buttonElements[0].nativeElement.textContent).toBe('Subscribed'); // a gomb szövege immáron Subcribe
    expect(buttonElements[0].nativeElement.disabled).toBeTrue(); // a gomb legyen disabled
  }));

  xit('should test a promise', fakeAsync(() => {
    let counter = 0;

    setTimeout(() => {
      counter = counter + 3
    }, 2000)

    Promise.resolve().then(() => {
      counter++;
    });

    flush();

    expect(counter).toBe(4);
  }));

  xit('should test another promise', async () => { // ez a megoldás is helyes
    let counter = 0;

    await Promise.resolve().then(() => {
      counter++;
    });

    expect(counter).toBe(1);
  });

  xit('should test a promise using done callback', (done) => { // szintén success
    let counter = 0;
    Promise.resolve().then(() => {
      counter++;
      expect(counter).toBe(1); // a counter értéke helyesen frissült
      done(); // jelezzük a Jasmine-nak, hogy az aszinkron teszt befejeződött
    });
  });

  xit('should test an observable', () => {
    let isSubscribed = false;

    let myObservable = of(isSubscribed); // szinkron observable
    myObservable.subscribe({
      next: () => isSubscribed = true
    });

    expect(isSubscribed).toBeTrue;
  });

  xit('should test an async observable', fakeAsync(() => {
    let isSubscribed = false;

    let myObservable = of(isSubscribed).pipe(delay(1000)); // ez így már aszinkron Observable
    myObservable.subscribe({
      next: () => isSubscribed = true
    });

    tick(1000); // a delay miatt szükséges egy egy másodperces előre ugrás

    expect(isSubscribed).toBeTrue();
  }));
});
