import{ trigger, style, animate, transition, query, group } from '@angular/animations';
var translateType = 'translateX'
var translate = 100;
export function routeAnim() {
    return trigger('routeAnim', [
        transition(':increment', [
            style({ height: '!', tranformOrigin: '50% 50%'  }),
            query(':enter', style({ transform: 'scale(0.9)' }), { optional: true }),
            query(':enter, :leave', style({ height: 'var(--height)', overflow: 'hidden', position: 'absolute', top: 0,  left: 0, right: 0 }), { optional: true }),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'scale(1)', height: '!' })),
                ], { optional: true }),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'scale(1)' })), { optional: true }),
            ]),
        ]),
        transition(':decrement', [
            style({ height: '!', tranformOrigin: '50% 50%' }),
            query(':enter', style({ transform: 'scale(1.2)' }), { optional: true }),
            query(':enter, :leave', style({ height: 'var(--height)', overflow: 'hidden', position: 'absolute', top: 0,  left: 0, right: 0 }), { optional: true }),
            // animate the leave page away
            group([
                query(':leave', [
                    animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'scale(1)' })),
                ], { optional: true }),
                // and now reveal the enter
                query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'scale(1)' })), { optional: true }),
            ]),
        ]),
    ])
}