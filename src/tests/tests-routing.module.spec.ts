import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "./tests.module"
import { HometestComponent } from "./components/hometest/hometest.component";
import { InfotestComponent } from "./components/infotest/infotest.component";
import { Router } from "@angular/router";
import { Location } from '@angular/common'; // Ezt kézzel kellett beimportálni, különben nem volt path()
import { GradePipe } from "./pipes/grade.pipe";
import { GradeDirective } from "./directives/grade.directive";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('TestsRouting', () => {
    let router: Router;
    let location: Location;
    let fixture: ComponentFixture<HometestComponent>;
    let fixtureInfo: ComponentFixture<InfotestComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HometestComponent, InfotestComponent, GradePipe, GradeDirective],
            imports: [RouterTestingModule.withRoutes(routes)]
        })
            .compileComponents();
    });

    beforeEach(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(HometestComponent);
        fixtureInfo = TestBed.createComponent(InfotestComponent);
        debugElement = fixture.debugElement;
        router.initialNavigation();
    });

    it('should navigate to default path - home', async () => {
        fixture.detectChanges();
        await router.navigate(['']); // kézzel navigálunk az üres útvonalra, ami redirect-el a /hometest-re
        await fixture.whenStable(); // Promise
        expect(location.path()).toBe('/hometest');
    });

    it('should navigate to info by clicking /info routerLink"', async () => {
        fixture.detectChanges();
        let links = debugElement.queryAll(By.css('a'));
        // links[0].triggerEventHandler('click', null); // hibára fut - Cannot read properties of null (reading 'button')
        links[0].nativeElement.click();
        await fixture.whenStable(); // then blokk is használható, de nem szükséges, mert folytatódik a futás, miután megvártuk a Promise-t
        expect(location.path()).toBe('/infotest');
    });

    it('should navigate back to home by clicking /home routerLink"', waitForAsync(() => { // régebbi szintaktika
        fixtureInfo.detectChanges();
        let buttons = debugElement.queryAll(By.css('button'));
        buttons[0].triggerEventHandler('click', null); // gombon már működik a triggerEventHandler
        fixtureInfo.whenStable().then(() => { // így biztosítható, hogy a Promise
            expect(location.path()).toBe('/hometest'); // a promise itt már sikeresen befejeződött
        });
    }));
})