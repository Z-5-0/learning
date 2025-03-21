import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent {
  @ViewChildren(`
      introduction,
      rules,
      support,
      files,
      jsonvsxml
      `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'Introduction', anchor: 'introduction' },
    { title: 'Rules', anchor: 'rules' },
    { title: 'Support', anchor: 'support' },
    { title: 'Files', anchor: 'files' },
    { title: 'JSON vs XML', anchor: 'jsonvsxml' }
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
