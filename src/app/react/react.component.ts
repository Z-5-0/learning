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
    loopingoverlists,
    keyprops,
    listfiltering,
    conditionalrendering,
    conditionalcontent,
    conditionalform,
    dynamicinlinestyling,
    dynamicattributevalues,
    fragments,
    portals,
    refs,
    hooks,
    sideeffects,
    cleanupfunction,
    usereducer,
    combiningwithuseeffect, 
    usestatevsusereducer, 
    usecontext,
    contextvsprops, 
    customcontextprovider,
    contextlimitations,
    useimperativehandlerandforwardref,
    dom,
    virtualdom,
    rerenderchildcomponent, 
    reactmemo,
    usecallback,
    statescheduleandbatch, 
    usememo,
    classbasedcomponent,
    statesandevents,
    sideeffect,
    handlingcontext,
    errorboundaries,
    httprequestsandresponses,
    postrequest,
    getrequest,
    loading, 
    fetchonpageload,
    errorhandling,
    filluserform,
    putrequest,
    deleterequest,
    customhook,
    customhttphook,
    gethttphook,
    posthttphook,
    deletehttphook,
    completehttphook,
    workingwithforms, 
    fetchformdata,
    valdateformdata,
    cssscss,
    cssmodule
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
    { title: 'Looping over lists', anchor: 'loopingoverlists' },
    { title: 'Key props', anchor: 'keyprops' },
    { title: 'List filtering', anchor: 'listfiltering' },
    {
      title: 'Conditional rendering', anchor: 'conditionalrendering', subtitles: [
        { title: 'Conditional content', anchor: 'conditionalcontent' },
        { title: 'Conditional form', anchor: 'conditionalform' },
      ]
    },
    { title: 'Dynamic inline styling', anchor: 'dynamicinlinestyling' },
    { title: 'Dynamic attribute values', anchor: 'dynamicattributevalues' },
    { title: 'Fragments', anchor: 'fragments' },
    { title: 'Portals', anchor: 'portals' },
    { title: 'Refs', anchor: 'refs' },
    { title: 'Hooks', anchor: 'hooks' },
    {
      title: 'Side effects', anchor: 'sideeffects', subtitles: [
        { title: 'Dependencies', anchor: 'dependencies' },
        { title: 'Clean-up function', anchor: 'cleanupfunction' },
      ]
    },
    {
      title: 'useReducer', anchor: 'usereducer', subtitles: [
        { title: 'Combining with useEffect', anchor: 'combiningwithuseeffect' },
        { title: 'useState vs useReducer', anchor: 'usestatevsusereducer' },
      ]
    },
    {
      title: 'useContext', anchor: 'usecontext', subtitles: [
        { title: 'Context vs props', anchor: 'contextvsprops' },
        { title: 'Custom context provider', anchor: 'customcontextprovider' },
        { title: 'Context limitations', anchor: 'contextlimitations' },
      ]
    },
    { title: 'useImperativeHandler & forwardRef', anchor: 'useimperativehandlerandforwardref' },
    {
      title: 'DOM', anchor: 'dom', subtitles: [
        { title: 'Virtual DOM', anchor: 'virtualdom' },
        { title: 'Re-render child component', anchor: 'rerenderchildcomponent' },
        { title: 'React.memo', anchor: 'reactmemo' },
        { title: 'useCallback', anchor: 'usecallback' }
      ]
    },
    { title: 'State schedule & batch', anchor: 'statescheduleandbatch' },
    { title: 'useMemo', anchor: 'usememo' },
    {
      title: 'Class based component', anchor: 'classbasedcomponent', subtitles: [
        { title: 'States and events', anchor: 'statesandevents' },
        { title: 'Side effect', anchor: 'sideeffect' },
        { title: 'Handling context', anchor: 'handlingcontext' },
        { title: 'Error boundaries', anchor: 'errorboundaries' }
      ]
    },
    {
      title: 'HTTP requests & responses', anchor: 'httprequestsandresponses', subtitles: [
        { title: 'POST request', anchor: 'postrequest' },
        { title: 'GET request', anchor: 'getrequest' },
        { title: 'Loading', anchor: 'loading' },
        { title: 'Error handling', anchor: 'errorhandling' },
        { title: 'Fetch on page load', anchor: 'fetchonpageload' },
        { title: 'Fill user form', anchor: 'filluserform' },
        { title: 'PUT request', anchor: 'putrequest' },
        { title: 'DELETE request', anchor: 'deleterequest' }
      ]
    },
    {
      title: 'Custom hook', anchor: 'customhook', subtitles: [
        { title: 'Custom HTTP hook', anchor: 'customhttphook' },
        { title: 'GET HTTP hook', anchor: 'gethttphook' },
        { title: 'POST HTTP hook', anchor: 'posthttphook' },
        { title: 'DELETE HTTP hook', anchor: 'deletehttphook' },
        { title: 'Complete HTTP hook', anchor: 'completehttphook' },
      ]
    },
    {
      title: 'Working with forms', anchor: 'workingwithforms', subtitles: [
        { title: 'Fetch form data', anchor: 'fetchformdata' },
        { title: 'Validate form data', anchor: 'validateformdata' }
      ]
    },
    {
      title: 'CSS / SCSS', anchor: 'cssscss', subtitles: [
        { title: 'Module', anchor: 'cssmodule' },
      ]
    }
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
