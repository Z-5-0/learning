import { animate, animation, query, style, transition, trigger } from "@angular/animations";

export const routeTransition = trigger('routeTransition', [
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0, transform: 'scale(0.4)' }),
        ], { optional: true }),
        query(':leave', [
            style({ position: 'absolute'}),
            animate('1s', style({ opacity: 0, transform: 'scale(0.4)' }))
        ], { optional: true }),
        query(':enter', [
            animate('1s', style({ opacity: 1, transform: 'scale(1)' }))
        ], { optional: true })
    ])
]);