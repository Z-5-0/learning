import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';

@Component({
  selector: 'app-gulp',
  templateUrl: './gulp.component.html',
  styleUrls: ['./gulp.component.scss']
})
export class GulpComponent {
  @ViewChildren(`
    todo
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    {
      title: 'TODO', anchor: 'todo', subtitles: [
        { title: 'TODO', anchor: 'todo' }
      ]
    },
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
