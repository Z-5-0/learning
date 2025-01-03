import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss']
})
export class XmlComponent {
  @ViewChildren(`
    xml,
    comparison,
    example
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'XML', anchor: 'xml' },
    { title: 'Comparison', anchor: 'comparison' },
    { title: 'Example', anchor: 'example' },
  ]

  constructor(private anchor: ScrollingService) {
  }

  scrollToAnchor(anchor: string) {
    const sectionElement = this.sections.find(sec => sec.nativeElement.getAttribute('data-anchor') === anchor)?.nativeElement;
    if (sectionElement) {
      this.anchor.scrollTo(sectionElement);
    } else {
      alert('No anchor provided for this button!')
    }
  }
}
