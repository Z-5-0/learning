import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from "../../shared/services/scrolling.service";

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent {
  @ViewChildren(`
    bootstrap,
    angularintegration,
    buttons,
    icons,
    todo
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'Bootstrap', anchor: 'bootstrap', subtitle: [] },
    { title: 'Angular integration', anchor: 'angularintegration', subtitle: [] },
    { title: 'Buttons', anchor: 'buttons', subtitle: [] },
    { title: 'Icons', anchor: 'icons', subtitle: [] },
    { title: 'TODO', anchor: 'todo', subtitle: [] },
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
