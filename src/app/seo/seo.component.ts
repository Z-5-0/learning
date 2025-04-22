import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent {
  @ViewChildren(`
    basics,
    factors,
    technicalseo,
    onpageseo,
    offpageseo,
    snippets,
    standardsnippet,
    richsnippet,
    featuredsnippet,
    structureddata,
    schemamarkup,
    dictionary,
    jsonld,
    microdata,
    rdfa,
    examples,
    loginpageexample,
    homepageexample,
    cartepageexample,
    categorypageexample,
    staticpageexample,
    blogpageexample,
    algorithms,
    angular,
    angularmetadata,
    angularjsonld
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'Basics', anchor: 'basics' },
    {
      title: 'Factors', anchor: 'factors', subtitles: [
        { title: 'Technical SEO', anchor: 'technicalseo' },
        { title: 'On-page SEO', anchor: 'onpageseo' },
        { title: 'Off-page SEO', anchor: 'offpageseo' },
      ]
    },
    {
      title: 'Snippets', anchor: 'snippets', subtitles: [
        { title: 'Standard Snippet', anchor: 'standardsnippet' },
        { title: 'Rich Snippet', anchor: 'richsnippet' },
        { title: 'Featured Snippet', anchor: 'featuredsnippet' },
      ]
    },
    {
      title: 'Structured data', anchor: 'structureddata', subtitles: [
        { title: 'Schema Markup', anchor: 'schemamarkup' },
        { title: 'Schema.org dictionary', anchor: 'dictionary' },
        { title: 'JSON-LD', anchor: 'jsonld' },
        { title: 'Microdata', anchor: 'microdata' },
        { title: 'RDFa', anchor: 'rdfa' }
      ]
    },
    {
      title: 'Examples', anchor: 'examples', subtitles: [
        { title: 'Login page', anchor: 'loginpageexample' },
        { title: 'Home page', anchor: 'homepageexample' },
        { title: 'Carte page', anchor: 'cartepageexample' },
        { title: 'Category page', anchor: 'categorypageexample' },
        { title: 'Static page', anchor: 'staticpageexample' },
        { title: 'Blog page', anchor: 'blogpageexample' }
      ]
    },
    { title: 'Algorithms', anchor: 'algorithms' },
    {
      title: 'Angular', anchor: 'angular', subtitles: [
        { title: 'Metadata', anchor: 'angularmetadata' },
        { title: 'JSON-LD', anchor: 'angularjsonld' }

      ]
    }
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
