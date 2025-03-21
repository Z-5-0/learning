import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollingService } from 'src/shared/services/scrolling.service';

@Component({
  selector: 'app-webpack',
  templateUrl: './webpack.component.html',
  styleUrls: ['./webpack.component.scss']
})
export class WebpackComponent {
  @ViewChildren(`
    introduction,
    installingandrunning,
    base,
    codeseparation,
    install,
    running,
    importexportmodules,
    configuration,
    loaderscsssass,
    loaders,
    cssloader,
    sassloader,
    cachebustingandplugins,
    cachebusting,
    plugins, 
    devandprod,
    devserver,
    moreloaders,
    fileloader,
    htmlloader,
    cleanwebpackplugin,
    multientrypoints,
    extractandminify,
    extractcss,
    minifycss,
    minifyhtml
    `) sections!: QueryList<ElementRef>;

  anchorButtons: any[] = [
    { title: 'Introduction', anchor: 'introduction' },
    {
      title: 'Installing & running', anchor: 'installingandrunning', subtitles: [
        { title: 'Base', anchor: 'base' },
        { title: 'Code separation', anchor: 'codeseparation' },
        { title: 'Install', anchor: 'install' },
        { title: 'Running', anchor: 'running' }
      ]
    },
    { title: 'Import, export, modules', anchor: 'importexportmodules' },
    { title: 'Configuration', anchor: 'configuration' },
    {
      title: 'Loaders, CSS & SASS', anchor: 'loaderscsssass', subtitles: [
        { title: 'Loaders', anchor: 'loaders' },
        { title: 'CSS Loader', anchor: 'cssloader' },
        { title: 'SASS Loader', anchor: 'sassloader' }
      ]
    },
    {
      title: 'Cache busting & plugins', anchor: 'cachebustingandplugins', subtitles: [
        { title: 'Cache busting', anchor: 'cachebusting' },
        { title: 'Plugins', anchor: 'plugins' }
      ]
    },
    {
      title: 'Dev & prod', anchor: 'devandprod', subtitles: [
        { title: 'Webpack merge', anchor: 'webpackmerge' },
        { title: 'Dev server', anchor: 'devserver' }
      ]
    },
    {
      title: 'More loaders', anchor: 'moreloaders', subtitles: [
        { title: 'File Loader', anchor: 'fileloader' },
        { title: 'HTML Loader', anchor: 'htmlloader' },
        { title: 'Clean Webpack Plugin', anchor: 'cleanwebpackplugin' },
      ]
    },
    { title: 'Multi entrypoints', anchor: 'multientrypoints' },
    {
      title: 'Extract & minify', anchor: 'extractandminify', subtitles: [
        { title: 'Extract css', anchor: 'extractcss' },
        { title: 'Minify CSS', anchor: 'minifycss' },
        { title: 'Minify HTML', anchor: 'minifyhtml' },
      ]
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
