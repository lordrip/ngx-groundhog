import { Directive, OnInit, OnChanges, Input, SimpleChanges, Component } from '@angular/core';

@Component({
    selector: 'gh-column',
    template: `
        <ng-content></ng-content>
    `
})
export class GhColumn {
    @Input() index: string | number;
    private _title: string;

    get title(): string {
        return this._title || this._normalize(this.index);
    }
    @Input() set title(val) {
        this._title = val;
    }

    private _normalize(elem: string | number): string {
        if (typeof elem === 'string') {
            return elem.replace(/\w\S*/g, (word) => {
                return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
            });
        }

        if (typeof elem === 'number') {
            return elem.toString();
        }

        return '';
    }

}
