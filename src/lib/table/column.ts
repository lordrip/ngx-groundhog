import { Directive, OnInit, Input } from '@angular/core';

@Directive({
    selector: 'gh-column',
})

export class GhColumn implements OnInit {
    @Input() title: string;

    ngOnInit() { 
        console.log('Column title:', this.title);
    }
}