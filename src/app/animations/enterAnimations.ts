import { trigger, animate, style,transition } from "@angular/animations";

export function flyIn(){
    return trigger('flyIn',[
        transition(':enter',[
            style({
                opacity: 0,
                transform: 'translateY(-5%)'
            }),
            animate('500ms 1000ms',style({
                opacity: 1,
                transform: 'translateY(0)'
            }))
        ])
    ])
}
export function flyInHome(){
    return trigger('flyIn',[
        transition(':enter',[
            style({
                opacity: 0,
                transform: 'translateY(-5%)'
            }),
            animate('500ms 2500ms',style({
                opacity: 1,
                transform: 'translateY(0)'
            }))
        ])
    ])
}