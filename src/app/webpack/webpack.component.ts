import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';

@Component({
  selector: 'app-webpack',
  templateUrl: './webpack.component.html',
  styleUrls: ['./webpack.component.scss']
})
export class WebpackComponent {
  @ViewChildren(`
    introduction,
    
    todo
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    {
      title: 'Introduction', anchor: 'introduction', subtitles: [
        { title: 'TODO', anchor: 'todo' }
      ]
    },
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
