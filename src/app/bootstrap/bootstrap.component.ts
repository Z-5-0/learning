import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ScrollingService } from "../../shared/services/scrolling.service";
// import { Tooltip } from 'bootstrap';
// import { Popover } from 'bootstrap';

interface Food {
  name: string,
  details: string,
  prepTime: number,
  img: string
}

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent implements AfterViewInit {
  @ViewChildren(`
    bootstrap,
    angularintegration,
    grid,
    typography,
    icons,
    buttons,
    input,
    breakpoints,
    navbar,
    breadcrumb,
    modal,
    card
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'Bootstrap', anchor: 'bootstrap', subtitle: [] },
    { title: 'Angular integration', anchor: 'angularintegration', subtitle: [] },
    { title: 'Grid', anchor: 'grid', subtitle: [] },
    { title: 'Typography', anchor: 'typography', subtitle: [] },
    { title: 'Icons', anchor: 'icons', subtitle: [] },
    { title: 'Buttons', anchor: 'buttons', subtitle: [] },
    { title: 'Input', anchor: 'input', subtitle: [] },
    { title: 'Breakpoints', anchor: 'breakpoints', subtitle: [] },
    { title: 'Navbar', anchor: 'navbar', subtitle: [] },
    { title: 'Breadcrumb', anchor: 'breadcrumb', subtitle: [] },
    { title: 'Modal', anchor: 'modal', subtitle: [] },
    { title: 'Card', anchor: 'card', subtitle: [] },
  ]

  @ViewChildren('buttons') baseButtons!: QueryList<ElementRef>;

  @ViewChild('indeterminate') indeterminate!: ElementRef;
  state: 'unchecked' | 'indeterminate' | 'checked' = 'unchecked';

  formWasValidated: boolean = false;

  navbarExpand: boolean = true;
  fixedToTop: boolean = false;

  cardImageIsUp: boolean = true;
  cardActivetTab: number = 0;
  cardBodyAlignment: string = 'start';
  cardBackgroundColor: string = 'white';
  cardBorderColor: string = 'white';

  modalControl: any = {
    show: true,
    backdrop: false,
    centered: false,
    scrollable: false,
    fullscreen: false,
  }

  foodCards: Food[] = [
    { name: 'Pörkölt', details: 'Hozzávalók: marhahús, hagyma, paprika, paradicsom, fűszerek. A pörkölt alapja a jól megpárolt hagyma, amelyre fűszereket és pirospaprikát adunk. Ezután a húsdarabokat hozzáadjuk, és elkezdjük pirítani, amíg szépen meg nem sülnek. A pörkölés során a hús magába szívja a fűszereket, majd paradicsomot és paprikát is hozzáadunk. A lassú főzés során a hús puhává válik, miközben az ízek jól összeérnek. Tálalás előtt fűszerezzük, és ha szükséges, tejföllel gazdagíthatjuk.', prepTime: 120, img: 'https://picsum.photos/50/50/?blur=1&random=1.webp' },
    { name: 'Túró rudi', details: 'Hozzávalók: túró, tejföl, csokoládé, porcukor. A túrós tölteléket csokoládéval borítjuk be, hogy krémes és finom édességet kapjunk.', prepTime: 30, img: 'https://picsum.photos/50/50/?blur=1&random=2.webp' },
    { name: 'Rakott krumpli', details: 'Hozzávalók: krumpli, tojás, kolbász, tejföl, sajt. A krumplit és tojást rétegezzük, a kolbászt és tejfölt hozzáadjuk, majd sütjük, míg a sajt megolvad.', prepTime: 60, img: 'https://picsum.photos/50/50/?blur=1&random=3.webp' },
  ]

  constructor(private anchor: ScrollingService) {
  }

  ngAfterViewInit(): void {
    // Tooltip-ek aktiválása
    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));

    // Popover-ek aktiválása
    // const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    // const popoverList = Array.from(popoverTriggerList).map(popoverTriggerEl => new Popover(popoverTriggerEl));
  }

  scrollToAnchor(anchor: string) {
    const sectionElement = this.sections.find(sec => sec.nativeElement.getAttribute('data-anchor') === anchor)?.nativeElement;
    if (sectionElement) {
      this.anchor.scrollTo(sectionElement);
    } else {
      alert('No anchor provided for this button!')
    }
  }

  toggleBaseButtonsDisableAttr() {
    this.baseButtons.forEach(button => {
      button.nativeElement.disabled = !button.nativeElement.disabled;
    })
  }

  indeterminateCheckboxChange(e: any) {
    if (this.state === 'unchecked') {
      this.state = 'indeterminate';
      this.indeterminate.nativeElement.indeterminate = true;
      this.indeterminate.nativeElement.checked = false;
    } else if (this.state === 'indeterminate') {
      this.state = 'checked';
      this.indeterminate.nativeElement.indeterminate = false;
      this.indeterminate.nativeElement.checked = true;
    } else { // this.state === 'checked'
      this.state = 'unchecked';
      this.indeterminate.nativeElement.indeterminate = false;
      this.indeterminate.nativeElement.checked = false;
    }
  }

  formSubmit(e: any) {
    e.preventDefault();
    this.formWasValidated = true;
  }

  backDropChanged(e: any, switcher: string) {
    this.modalControl.show = false;
    this.modalControl[switcher] = e.target.checked;
    setTimeout(() => {
      this.modalControl.show = true;
    }, 0);
  }
}
