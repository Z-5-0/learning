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
    reactvsangular,
    reactvsangularvsvue,
    initialization,
    gettingstarted,
    projectstructure,
    fromscratch,
    jsx,
    component,
    addingcss,
    childcomponent,
    bootstrap,
    dynamiccontent,
    jsxattributes,
    dynamicclasses,
    props,
    splittingcomponents,
    childrenprops,
    jsxsyntax,
    eventsandstates,
    forms,
    codereformatting,
    skeleton,
    eventlistener,
    multiplestates,
    formsubmission,
    childtoparentcommunication,
    renderinglist,

    state,
    todo,
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'How it works?', anchor: 'howitworks' },
    { title: 'React', anchor: 'react' },
    {
      title: 'React comparison', anchor: 'reactcomparison', subtitles: [
        { title: 'React vs JS', anchor: 'reactvsjs' },
        { title: 'React vs Angular', anchor: 'reactvsangular' },
        { title: 'React vs Angular vs Vue', anchor: 'reactvsangularvsvue' },
      ]
    },
    { title: 'Initialization', anchor: 'initialization' },
    { title: 'Getting started', anchor: 'gettingstarted' },
    { title: 'Project structure', anchor: 'projectstructure' },
    { title: 'From scratch', anchor: 'fromscratch' },
    { title: 'JSX', anchor: 'jsx' },
    {
      title: 'Component', anchor: 'component', subtitles: [
        { title: 'Adding CSS', anchor: 'addingcss' },
        { title: 'Child component', anchor: 'childcomponent' },
      ]
    },
    { title: 'Bootstrap', anchor: 'bootstrap' },
    { title: 'Dynamic content', anchor: 'dynamiccontent' },
    { title: 'JSX attributes', anchor: 'jsxattributes' },
    { title: 'Dynamic classes', anchor: 'dynamicclasses' },
    { title: 'Props', anchor: 'props' },
    { title: 'Splitting components', anchor: 'splittingcomponents' },
    { title: 'Children props', anchor: 'childrenprops' },
    { title: 'JSX syntax', anchor: 'jsxsyntax' },
    { title: 'Events and states', anchor: 'eventsandstates' },
    {
      title: 'Forms', anchor: 'forms', subtitles: [
        { title: 'Code reformatting', anchor: 'codereformatting' },
        { title: 'Skeleton', anchor: 'skeleton' },
        { title: 'Event listener', anchor: 'eventlistener' },
        { title: 'Multiple states', anchor: 'multiplestates' },
        { title: 'Form submission', anchor: 'formsubmission' },
      ]
    },
    { title: 'Child to parent communication', anchor: 'childtoparentcommunication' },
    { title: 'Rendering list', anchor: 'renderinglist' },

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
