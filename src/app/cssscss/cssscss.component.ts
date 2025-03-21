import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';

@Component({
  selector: 'app-cssscss',
  templateUrl: './cssscss.component.html',
  styleUrls: ['./cssscss.component.scss']
})
export class CssscssComponent implements AfterViewInit {
  @ViewChildren(`
    intro,
    gulp,
    variables,
    partials,
    projectstructure,
    nestedrules,
    math,
    debug,
    maps,
    loops,
    conditionals,
    parentselector, 
    mixins,
    functions, 
    utilityclasses,
    mediaqueries,
    gridsystem,
    extend,
    usingthelibrary,
    purgingunusedstyles,
    default,
    extendingthelibrary,
    extra,
    cssscssvariables,
    cssreset,
    verticalalign,
    operators,
    pxemrem,
    vhvwdvhlvhsvh,
    aspectratio,
    todo
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'Introduction', anchor: 'intro', subtitles: [] },
    { title: 'Gulp', anchor: 'gulp', subtitles: [] },
    { title: 'Variables', anchor: 'variables', subtitles: [] },
    { title: 'Partials', anchor: 'partials', subtitles: [] },
    { title: 'Project structure', anchor: 'projectstructure', subtitles: [] },
    { title: 'Nested rules', anchor: 'nestedrules', subtitles: [] },
    { title: 'Math', anchor: 'math', subtitles: [] },
    { title: 'Debug', anchor: 'debug', subtitles: [] },
    { title: 'Maps', anchor: 'maps', subtitles: [] },
    { title: 'Loops', anchor: 'loops', subtitles: [] },
    { title: 'Conditionals', anchor: 'conditionals', subtitles: [] },
    { title: 'Parent selector', anchor: 'parentselector', subtitles: [] },
    { title: 'Mixins', anchor: 'mixins', subtitles: [] },
    { title: 'Functions', anchor: 'functions', subtitles: [] },
    { title: 'Utility claseses', anchor: 'utilityclasses', subtitles: [] },
    { title: 'Media queries', anchor: 'mediaqueries', subtitles: [] },
    { title: 'Grid system', anchor: 'gridsystem', subtitles: [] },
    { title: 'Extend', anchor: 'extend', subtitles: [] },
    { title: 'Using the library', anchor: 'usingthelibrary', subtitles: [] },
    { title: 'Purging unused styles', anchor: 'purgingunusedstyles', subtitles: [] },
    { title: '!default', anchor: 'default', subtitles: [] },
    { title: 'Extending the library', anchor: 'extendingthelibrary', subtitles: [] },
    {
      title: 'Extra', anchor: 'extra', subtitles: [
        { title: 'CSS/SCSS variables', anchor: 'cssscssvariables', subtitles: [] },
        { title: 'CSS reset', anchor: 'cssreset', subtitles: [] },
        { title: 'vertical-align', anchor: 'verticalalign', subtitles: [] },
        { title: 'Operators', anchor: 'operators', subtitles: [] },
        { title: 'px / em / rem', anchor: 'pxemrem', subtitles: [] },
        { title: 'vh / vw / dvh / lvh / svh', anchor: 'vhvwdvhlvhsvh', subtitles: [] },
        { title: 'aspect-ratio', anchor: 'aspectratio', subtitles: [] },
        { title: 'TODO', anchor: 'todo', subtitles: [] },
      ]
    }
  ]

  textColorClass: string = 'primary';
  textColorClassValue: number = 1;

  @ViewChildren('paragraph') paragraph!: QueryList<ElementRef>;
  paragraphsVisibility: { [key: string]: boolean[] } = {};
  colorPalette: string[] = ['primary', 'secondary', 'error', 'info', 'magenta', 'orange'];
  colorPaletteNumbers: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90];

  constructor(private anchor: ScrollingService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.paragraph.forEach((p, index) => {
        let colorAttribute = p.nativeElement.getAttribute('data-color'); // kiszedjük a data-color attribútumot
        let color = window.getComputedStyle(p.nativeElement).color;
        this.paragraphsVisibility[colorAttribute] === undefined ? this.paragraphsVisibility[colorAttribute] = [] : null;
        this.paragraphsVisibility[colorAttribute].push(color === 'rgb(255, 255, 255)' ? false : true);
      });
    }, 0)

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
