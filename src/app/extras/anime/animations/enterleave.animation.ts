import { animate, animation, group, query, style, transition, trigger } from "@angular/animations";

export const enterLeaveAnimation = trigger('enterLeaveAnimation', [
    transition(':enter', [
        group([
            style({ opacity: 0 }),
            animate('1000ms ease-in', style({ opacity: 1 })),
            query('img', [
                style({ filter: 'blur(5px)' }),
                animate('1000ms ease-in', style({ filter: 'blur(0)' })),
            ])
        ])
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('2000ms ease-in', style({ opacity: 0 })),
    ]),
]);
