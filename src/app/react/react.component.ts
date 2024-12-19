import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from "../../shared/services/scrolling.service";

@Component({
  selector: 'app-react',
  templateUrl: './react.component.html',
  styleUrls: ['./react.component.scss']
})
export class ReactComponent implements OnInit {
  @ViewChildren(`
    howitworks,
    react,
    reactvsjs,
    reactvsangularvsvue,
    initialization,
    gettingstarted,
    component,
    state,
    todo,
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'How it works?', anchor: 'howitworks' },
    { title: 'React', anchor: 'react' },
    {
      title: 'React comparison', anchor: 'reactcomparison', subtitles: [
        { title: 'React vs JS', anchor: 'reactvsjs' },
        { title: 'React vs Angular vs Vue', anchor: 'reactvsangularvsvue' },
      ]
    },
    { title: 'Initialization', anchor: 'initialization' },
    { title: 'Getting started', anchor: 'gettingstarted' },
    { title: 'Component', anchor: 'component' },
    { title: 'State', anchor: 'state' },
    {
      title: 'TODO', anchor: 'todo', subtitles: [
        { title: 'TODO', anchor: 'todo' },
      ]
    },
    { title: 'TODO', anchor: 'todo' },
  ]

  constructor(private anchor: ScrollingService) {
  }

  ngOnInit() {
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
