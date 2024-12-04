import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component, ContentChild,
  DoCheck,
  ElementRef, EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
  styleUrls: ['./lifecycle.component.scss']
})
export class LifecycleComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() cycleSelector: 'onchanges' | 'oninit' | 'oninit2' | 'docheck' | 'aftercontentinit' | 'aftercontentchecked' | 'afterviewinit' | 'afterviewchecked' | 'ondestroy' = 'onchanges';

  @Input() onChangesMessage: string = '';
  simpleChangeCounter: number = 0;
  simpleChangeFirstChange: boolean = false;

  @ViewChild('oninitparagraph') onInitParagraph!: ElementRef;
  @Input() onInitMessages: string[] = [];
  simpleChangeCounter2: number = 0;

  @Input() onInitObject: any = {};
  simpleChangeCounter3: number = 0;

  @Input() onInitObject2: any = {};
  changeCounter: number = 0;
  doCheckCounter: number = 0;

  @ContentChild('aftercontentinitprojection') afterContentInitProjection!: ElementRef;
  projectionDuringOnInit: any;
  projectionDuringAfterContentInit: any;

  afterContentCheckedInputChangeCounter: number = 0;

  @Output() destroysEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['onChangesMessage']) {
      this.simpleChangeCounter++;
      this.simpleChangeFirstChange = changes['onChangesMessage']?.firstChange;
    }
    if (changes['onInitMessages']) {
      this.simpleChangeCounter2++;
    }
    if (changes['onInitObject']) {
      this.simpleChangeCounter3++;
    }
    if (changes['onInitObject2']) {
      this.changeCounter++;
    }
  }

  ngOnInit() {
    this.projectionDuringOnInit = this.afterContentInitProjection;
  }

  ngDoCheck() {
    if (this.cycleSelector === 'docheck') {
      this.doCheckCounter++;
    }
  }

  ngAfterContentInit() {
    this.projectionDuringAfterContentInit = this.afterContentInitProjection;
  }

  ngAfterContentChecked() {
    this.afterContentCheckedInputChangeCounter++;
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
  }

  ngOnDestroy() {
    this.destroysEvent.emit();
  }
}
