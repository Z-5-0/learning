import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements AfterViewInit {
  @ViewChild('box') box!: ElementRef<HTMLDivElement>;

  isBoxGrabbed: boolean = false;
  @Input() xPosition: number = 0;
  @Input() yPosition: number = 0;
  @Input() color: string = '';
  boxWidth: number = 150;
  boxHeight: number = 90;
  grabOffsetX = 0; // Az egér pozíciója a doboz bal oldalától
  grabOffsetY = 0; // Az egér pozíciója a doboz tetejétől
  containerWidth = 800; // Konténer szélessége
  containerHeight = 800; // Konténer magassága

  toggleGrab(event: MouseEvent) {
    this.isBoxGrabbed = !this.isBoxGrabbed;

    if (this.isBoxGrabbed) {
      // Elmentjük az egér és a doboz relatív pozícióját
      this.grabOffsetX = event.clientX - this.xPosition;
      this.grabOffsetY = event.clientY - this.yPosition;
    }
  }

  isGrabbed(event: MouseEvent) {
    if (this.isBoxGrabbed) {
      // Új pozíció számítása az egér relatív helyzete alapján
      let newXPosition = event.clientX - this.grabOffsetX;
      let newYPosition = event.clientY - this.grabOffsetY;

      // Ellenőrizzük, hogy a doboz ne lépje túl a konténer határait
      if (newXPosition < 0) {
        newXPosition = 0;
      } else if (newXPosition + this.boxWidth > this.containerWidth) {
        newXPosition = this.containerWidth - this.boxWidth;
      }

      if (newYPosition < 0) {
        newYPosition = 0;
      } else if (newYPosition + this.boxHeight > this.containerHeight) {
        newYPosition = this.containerHeight - this.boxHeight;
      }

      // Pozíciók frissítése
      this.xPosition = newXPosition;
      this.yPosition = newYPosition;
    }
  }

  ngAfterViewInit() {
    this.boxWidth = this.box.nativeElement.clientWidth;
    this.boxHeight = this.box.nativeElement.clientHeight;
  }
}
