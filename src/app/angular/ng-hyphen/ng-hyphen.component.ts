import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { ChildComponent } from "../child/child.component";

@Component({
  selector: 'app-ng-hyphen',
  templateUrl: './ng-hyphen.component.html',
  styleUrls: ['./ng-hyphen.component.scss']
})
export class NgHyphenComponent {
  @Input() ngType: 'template' |
    'template2' |
    'container' |
    'content' |
    'content2' |
    'content3' |
    'contentchild' |
    'contentchild2' |
    'contentchildren' |
    'contentchildren2' = 'template';
  @Input() isAvailable: boolean = false;

  @ContentChild('sometext') someTextElement!: ElementRef;
  someTextInnerText: string = '';

  @ContentChild('projectedChildComponent') projectedChildComponentRef!: ChildComponent;
  childComponentProjectedName: string = '';

  @ContentChildren('contentChildrenProjection') projectedChildrenRef!: QueryList<ElementRef>
  childrenContentProjection: any[] = [];

  /* @Input()
  set clearChildrenContentProjection(value: any) {
    if (value) {
      // this.childrenContentProjection = [];
    }
  } */

  @Input() set ChildrenContentProjection(value: any) {
    this.getProjectedMultiContentReference();
  }

  @ContentChildren(ChildComponent) projectedChildrenColorRef!: QueryList<ChildComponent>
  childrenComponentProjection: any[] = [];
  @Output() colorElemsComponentList: EventEmitter<ChildComponent[]> = new EventEmitter<ChildComponent[]>();

  getProjectedContentReference() {
    this.someTextInnerText = this.someTextElement.nativeElement.innerText;
  }

  getProjectedComponentReference() {
    this.childComponentProjectedName = this.projectedChildComponentRef.nameOfProjection;
  }

  getProjectedMultiContentReference() {
    this.childrenContentProjection = [];
    setTimeout(() => {
      this.projectedChildrenRef.forEach(child => {
        this.childrenContentProjection.push(child);
      });
    }, 0)
  }

  getProjectedMultiComponentReference() {
    this.projectedChildrenColorRef.forEach(color => {
      this.childrenComponentProjection.push(color);
    });

    this.colorElemsComponentList.emit(this.childrenComponentProjection);
  }
}