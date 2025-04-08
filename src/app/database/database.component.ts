import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent {
  @ViewChildren(`
    introduction
    relational,
    nonrelational,
    comparison
    `
  ) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'Introduction', anchor: 'introduction' },
    { title: 'Relational database', anchor: 'relational' },
    { title: 'Non-relational database', anchor: 'nonrelational' },
    { title: 'Comparison', anchor: 'comparison' },
  ]
  constructor(private anchor: ScrollingService) { }

  scrollToAnchor(anchor: string) {
    const sectionElement = this.sections.find(sec => sec.nativeElement.getAttribute('data-anchor') === anchor)?.nativeElement;
    if (sectionElement) {
      this.anchor.scrollTo(sectionElement);
    } else {
      alert('No anchor provided for this button!')
    }
  }
}