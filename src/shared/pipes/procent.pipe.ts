import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'procent'
})

export class ProcentPipe implements PipeTransform {
    transform(value: any, args: [number, number?]) {
        const [total, fraction] = args;
        return (((value / total) * 100).toFixed(fraction || 0)).toString() + '%';
    }
}