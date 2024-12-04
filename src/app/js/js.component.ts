import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-js',
  templateUrl: './js.component.html',
  styleUrls: ['./js.component.scss']
})
export class JsComponent implements OnInit, AfterViewInit, AfterContentInit {
  @ViewChild('box') box!: ElementRef<HTMLDivElement>;

  isBoxGrabbed: boolean = false;
  xPosition = 100; // Kezdő X pozíció
  yPosition = 100; // Kezdő Y pozíció
  boxWidth = 150;   // Doboz szélessége
  boxHeight = 0; // Doboz magassága
  grabOffsetX = 0; // Az egér pozíciója a doboz bal oldalától
  grabOffsetY = 0; // Az egér pozíciója a doboz tetejétől
  containerWidth = 800; // Konténer szélessége
  containerHeight = 800; // Konténer magassága
  color: string = 'red';

  constructor() {
  }

  ngOnInit() {
    this.loadScript('assets/scripts/basic.js');
    this.loadScript('assets/scripts/prompt.js');
    this.loadScript('assets/scripts/loops.js');
    this.loadScript('assets/scripts/if.js');
    this.loadScript('assets/scripts/functions.js');
    this.loadScript('assets/scripts/window.js');
    this.loadScript('assets/scripts/boxes.js');
    this.loadScript('assets/scripts/template-literal.js');
    this.loadScript('assets/scripts/ajax.js');
    this.loadScript('assets/scripts/fetch.js');
    this.loadScript('assets/scripts/async.js');
    this.loadScript('assets/scripts/movie.js');
    this.loadScript('assets/scripts/paradigms.js');
    this.loadScript('assets/scripts/object_blueprint.js');
    this.loadScript('assets/scripts/arrow_function.js');
    this.loadScript('assets/scripts/try-catch.js');
    this.loadScript('assets/scripts/ticket.js');

    this.loadStyle(`
          #element-one {
        width: 100px;
        height: 100px;
        background-color: darkcyan;
      }

      #element-two {
        width: 100px;
        height: 100px;
        background-color: firebrick;
      }

      #element-three {
        background-color: darkolivegreen;
      }

      #element-four {
        background-color: chocolate;
      }

      #element-five {
        background-color: sandybrown;
      }

      #element-six {
        background-color: forestgreen;
      }

      #element-seven {
        background-color: cadetblue;
      }

      #element-eight {
        background-color: seagreen;
      }

      #element-nine {
        background-color: sienna;
      }

      .container {
        width: 400px;
        padding-bottom: 40px;
      }

      .shape {
        width: 100px;
        height: 100px;
        float: left;
        margin: 10px;
        border-radius: 3px;
      }

      .text {
        display: table;
        margin: auto;
        font-size: 50px;
        font-family: sans-serif;
        line-height: 100px;
      }

      .parent-table {
        display: table;
        text-align: center;
      }

      .child-table {
        font-size: 30px;
        display: table-cell;
        vertical-align: middle;
      }

      .blur {
        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
      }

      .hidden {
        display: none;
      }

      .w-95 {
        width: 95px;
      }

      .w-100 {
        width: 100px;
      }

      .box5style {
        border-radius: 50%;
      }

      .theater {
        .auditorium {
          justify-self: center;
          align-items: center;
          width: 75%;
          text-align: center;
          display: grid;
          gap: 5px;

          .row {
            position: relative;
            display: grid;
            justify-content: space-evenly;
            grid-auto-flow: column;

            .row-label {
              position: absolute;
              left: -20px;
              top: 50%;
              transform: translateY(-50%);
              color: #b1dfbb;
            }

            .seat {
              position: relative;
              height: 20px;
              width: 30px;
              background: white;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              cursor: pointer;

              &.selected {
                background: #1abc9c;
              }

              &.booked {
                cursor: default;
                background: #b21f2d;
              }

              span {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
              }
            }
          }
        }
      }

      .legend {
        display: grid;
        grid-auto-flow: column;
        justify-content: space-evenly;
        color: #b1dfbb;
        padding: 50px;

        > div {
          display: grid;
          gap: 5px;
          justify-items: center;

          span {
            position: relative;
            display: block;
            height: 15px;
            width: 15px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }

          &:first-child {
            span {
              background: white;
            }
          }

          &:nth-child(2) {
            span {
              background: #b21f2d;
            }
          }

          &:last-child {
            span {
              background: #1abc9c;
            }
          }
        }
      }
    `);
  }

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

  newColorHasBeenSelected(color: string) {
    this.color = color;
  }

  ngAfterViewInit() {
    this.boxWidth = this.box.nativeElement.clientWidth;
    this.boxHeight = this.box.nativeElement.clientHeight;
  }

  ngAfterContentInit() {
  }

  private loadScript(src: string) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      console.log('Script loaded and ready.');
    };
    document.body.appendChild(script);
  }

  private loadStyle(css: string) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    document.head.appendChild(style);
  }
}
