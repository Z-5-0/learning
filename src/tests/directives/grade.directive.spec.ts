import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GradeDirective } from "./grade.directive";
import { HometestComponent } from "../components/hometest/hometest.component";
import { DebugElement } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { GradePipe } from "../pipes/grade.pipe";
import { By } from "@angular/platform-browser";

describe('GradeDirective', () => {
    let component: HometestComponent;
    let fixture: ComponentFixture<HometestComponent>;
    let debugElement: DebugElement;

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

    it('should be created', () => {
        let mockElRef = {
            nativeElement: document.createElement('div')
        };

        const directive = new GradeDirective(mockElRef);
        expect(GradeDirective).toBeTruthy();
    });

    it('should change color on mouse over', () => {
        let divs = debugElement.queryAll(By.css('div'));
        divs[0].triggerEventHandler('mouseenter', null);
        divs[1].triggerEventHandler('mouseenter', null);
        divs[2].triggerEventHandler('mouseenter', null);
        divs[3].triggerEventHandler('mouseenter', null);
        divs[4].triggerEventHandler('mouseenter', null);
        fixture.detectChanges();
        expect(divs[0].nativeElement.style.color).toBe('yellow');
        expect(divs[1].nativeElement.style.color).toBe('red');
        expect(divs[2].nativeElement.style.color).toBe('yellow');
        expect(divs[3].nativeElement.style.color).toBe('yellow');
        expect(divs[4].nativeElement.style.color).toBe('red');
    });
});