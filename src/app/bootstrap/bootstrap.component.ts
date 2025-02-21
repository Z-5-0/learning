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
    grid,
    typography,
    icons,
    buttons,
    input,
    select,
    breakpoints,
    navbar,
    breadcrumb,
    modal,
    cards
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'Bootstrap', anchor: 'bootstrap', subtitle: [] },
    { title: 'Angular integration', anchor: 'angularintegration', subtitle: [] },
    { title: 'Grid', anchor: 'grid', subtitle: [] },
    { title: 'Typography', anchor: 'typography', subtitle: [] },
    { title: 'Icons', anchor: 'icons', subtitle: [] },
    { title: 'Buttons', anchor: 'buttons', subtitle: [] },
    { title: 'Input', anchor: 'input', subtitle: [] },
    { title: 'Select', anchor: 'select', subtitle: [] },
    { title: 'Breakpoints', anchor: 'breakpoints', subtitle: [] },
    { title: 'Navbar', anchor: 'navbar', subtitle: [] },
    { title: 'Breadcrumb', anchor: 'breadcrumb', subtitle: [] },
    { title: 'Modal', anchor: 'modal', subtitle: [] },
    { title: 'Cards', anchor: 'cards', subtitle: [] },
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
