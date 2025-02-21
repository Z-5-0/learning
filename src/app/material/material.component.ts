import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent {
  @ViewChildren(`
    introduction,
    minput,
    mautocomplete,
    mmenuandtoolbar,
    mbadge,
    msidenav,
    mcard,
    mslider,
    mtable,
    mformcontrol,
    mdialog
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'Introduction', anchor: 'introduction', subtitles: [] },
    { title: 'Input', anchor: 'minput', subtitles: [] },
    { title: 'Autocomplete', anchor: 'mautocomplete', subtitles: [] },
    { title: 'Menu and toolbar', anchor: 'mmenuandtoolbar', subtitles: [] },
    { title: 'Badge', anchor: 'mbadge', subtitles: [] },
    { title: 'Sidenav', anchor: 'msidenav', subtitles: [] },
    { title: 'Card', anchor: 'mcard', subtitles: [] },
    { title: 'Slider', anchor: 'mslider', subtitles: [] },
    { title: 'Table', anchor: 'mtable', subtitles: [] },
    { title: 'FormControl', anchor: 'mformcontrol', subtitles: [] },
    { title: 'Dialog', anchor: 'mdialog', subtitles: [] }
  ];

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
