import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';
import { Tooltip } from 'bootstrap';

@Component({
  selector: 'app-ssr',
  templateUrl: './ssr.component.html',
  styleUrls: ['./ssr.component.scss']
})
export class SsrComponent {
  @ViewChildren(`
    introduction,
    csrvsssr,
    implementation,
    versiondifferences,
    conversion,
    expressengine,
    nativeangularssr,
    firststart,
    httpclientcaching,
    browseronlylogic,
    prerendering,
    staticroutes,
    parameterizedroutes,
    hybridrendering,
    customizingbuildtime,
    getprerenderparams,
    prerenderfallbackstrategy,
    contexttokens,
    hydration,
    enabling,
    defer,
    testing,
    incrementalhydration,
    triggers
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    {
      title: 'Introduction', anchor: 'introduction', subtitles: [
        { title: 'CSR vs SSR', anchor: 'csrvsssr' },
        { title: 'Implementation', anchor: 'implementation' },
        { title: 'Version differences', anchor: 'versiondifferences' },
        { title: 'Conversion', anchor: 'conversion' },
      ]
    },
    { title: 'Express-engine', anchor: 'expressengine' },
    { title: 'Native Angular SSR', anchor: 'nativeangularssr' },
    { title: 'First start', anchor: 'firststart' },
    { title: 'HTTP client caching', anchor: 'httpclientcaching' },
    { title: 'Browser-only logic', anchor: 'browseronlylogic' },
    {
      title: 'Prerendering', anchor: 'prerendering', subtitles: [
        { title: 'Static routes', anchor: 'staticroutes' },
        { title: 'Parameterized routes', anchor: 'parameterizedroutes' }
      ]
    },
    { title: 'Hybrid rendering', anchor: 'hybridrendering' },
    {
      title: 'Customizing build-time', anchor: 'customizingbuildtime', subtitles: [
        { title: 'getPrerenderParams', anchor: 'getprerenderparams' },
        { title: 'Prerender fallback strategy', anchor: 'prerenderfallbackstrategy' }
      ]
    },
    { title: 'Context tokens', anchor: 'contexttokens' },
    {
      title: 'Hydration', anchor: 'hydration', subtitles: [
        { title: 'Enabling', anchor: 'enabling' },
      ]
    },
    { title: '@defer', anchor: 'defer' },
    { title: 'Testing', anchor: 'testing' },
    {
      title: 'Incremental hydration', anchor: 'incrementalhydration', subtitles: [
        { title: 'Triggers', anchor: 'triggers' }
      ]
    }
  ];

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
