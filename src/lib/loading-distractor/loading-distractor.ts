import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Input
} from '@angular/core';

/** Possible spinner sizes */
export type GhSpinnerSizes = 'default' | 'small';

/** Base name for size css class */
const SPINNER_SIZE_BASE_CLASS = 'gh-loading-spinner-size';

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'gh-loading-spinner',
  exportAs: 'ghLoadingSpinner',
  templateUrl: 'loading-spinner.html',
  styleUrls: ['loading-distractor.css'],
  host: {
    'class': 'gh-loading-spinner',
    'role': 'alertdialog',
    'aria-busy': 'true',
    'aria-live': 'assertive'
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhLoadingSpinner {
  private _size: GhSpinnerSizes = 'default';

  /** The spinner size */
  @Input()
  get size(): GhSpinnerSizes { return this._size; }
  set size(value: GhSpinnerSizes) {
    this._replaceCssClass(value, this._size);
    this._size = value;
  }

  @Input('aria-labelledby') ariaLabelledby: string;
  @Input('aria-label') ariaLabel: string;

  constructor (private _elementRef: ElementRef) {
    // Trigger size class setting once
    this.size = this.size;
  }

  private _replaceCssClass(newClass?: string, oldClass?: string) {
    if (oldClass) {
      this._elementRef.nativeElement.classList.remove(`${SPINNER_SIZE_BASE_CLASS}-${oldClass}`);
    }
    if (newClass) {
      this._elementRef.nativeElement.classList.add(`${SPINNER_SIZE_BASE_CLASS}-${newClass}`);
    }
  }
}

@Component({
  moduleId: module.id,
  selector: 'gh-loading-distractor',
  exportAs: 'ghLoadingDistractor',
  templateUrl: 'loading-distractor.html',
  host: {
    'class': 'gh-loading-distractor',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhLoadingDistractor {
  _labelId: string = `"gh-loading-distractor-label-${nextUniqueId++}`;
}
