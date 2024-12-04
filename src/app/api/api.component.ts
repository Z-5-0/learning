import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent {
  @ViewChildren(`
  webapi,
  restapi
  openapi,
  soapapi,
  websocketapi,
  graphqlapi,
  `
  ) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    {
      title: 'WebAPI', anchor: 'webapi'
    },
    {
      title: 'RestfulAPI', anchor: 'restapi'
    },
    {
      title: 'OpenAPI / Swagger', anchor: 'openapi'
    },
    {
      title: 'SOAP API', anchor: 'soapapi'
    },
    {
      title: 'WebSocket API', anchor: 'websocketapi'
    },
    {
      title: 'GraphQL API', anchor: 'graphqlapi'
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
