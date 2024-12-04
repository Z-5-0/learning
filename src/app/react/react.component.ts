import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from "../../shared/services/scrolling.service";

@Component({
  selector: 'app-react',
  templateUrl: './react.component.html',
  styleUrls: ['./react.component.scss']
})
export class ReactComponent {
  @ViewChildren(`
    howitworks,
    react,
    todo,
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'How it works?', anchor: 'howitworks' },
    { title: 'React', anchor: 'react' },
    {
      title: 'TODO', anchor: 'todo', subtitles: [
        { title: 'TODO', anchor: 'todo' },
      ]
    },
    { title: 'TODO', anchor: 'todo' },
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
