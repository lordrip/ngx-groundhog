import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  mixinTabIndex,
  mixinDisabled,
  CanDisable,
  HasTabIndex
} from '@dynatrace/ngx-groundhog/core';
import { FocusOrigin } from '@angular/cdk/a11y';
import { FocusMonitor } from '@angular/cdk/a11y';

/**
 * Checkbox IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let nextUniqueId = 0;

/** Change event object emitted by GhCheckbox */
export interface GhCheckboxChange {
  source: GhCheckbox;
  value: any;
}

// Boilerplate for applying mixins to GhCheckbox.
export class GhCheckboxBase {
  constructor() { }
}
export const _GhCheckboxMixinBase = mixinTabIndex(mixinDisabled(GhCheckboxBase));

@Component({
  moduleId: module.id,
  selector: 'gh-checkbox',
  templateUrl: 'checkbox.html',
  styleUrls: ['checkbox.css'],
  exportAs: 'ghCheckbox',
  host: {
    '[id]': 'id',
    'class': 'gh-checkbox',
    '[class.gh-checkbox-checked]': 'checked',
    '[class.mat-checkbox-disabled]': 'disabled',
    '(focus)': '_inputElement.nativeElement.focus()',
  },
  inputs: ['disabled', 'tabIndex'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhCheckbox extends _GhCheckboxMixinBase
  implements CanDisable, HasTabIndex, AfterViewInit, OnDestroy {

  // TODO: aria attributes, required

  /** Whether or not the checkbox is checked. */
  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value !== this._checked) {
      this._checked = value;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Unique id of the element. */
  @Input()
  get id(): string { return this._id; }
  set id(value: string) { this._id = value || this._uid; }

  /** Whether the checkbox is required. */
  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  /** Name value will be applied to the input element if present */
  @Input() name: string | null = null;

  /** The value attribute of the native input element */
  @Input() value: string;

  /** Event emitted when the checkbox's `checked` value changes. */
  @Output() readonly change: EventEmitter<GhCheckboxChange> = new EventEmitter<GhCheckboxChange>();

  /** The native radio input element */
  @ViewChild('input') _inputElement: ElementRef;

  /** Returns the unique id for the visual hidden input. */
  get _inputId(): string { return `${this.id}-input`; }

  private _checked: boolean = false;
  private _uid = `gh-checkbox-${nextUniqueId++}`;
  private _id: string;
  private _required: boolean;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _focusMonitor: FocusMonitor
  ) {
    super();

    // Force setter to be called in case id was not specified.
    this.id = this.id;
    this.tabIndex = this.tabIndex;
  }

  ngAfterViewInit() {
    this._focusMonitor
      .monitor(this._inputElement.nativeElement, false)
      .subscribe(focusOrigin => this._onInputFocusChange(focusOrigin));
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._inputElement.nativeElement);
  }

  /** Focuses the checkbox. */
  focus(): void {
    this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
  }

  /** Toggles the `checked` state of the checkbox. */
  toggle(): void {
    this.checked = !this.checked;
  }

  _onInputClick(event: Event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // Otherwise this will lead to multiple click events.
    event.stopPropagation();

    if (!this.disabled) {
      this.toggle();
    }
  }

  _onInputChange(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }

  private _onInputFocusChange(focusOrigin: FocusOrigin) {
    const element = this._elementRef.nativeElement;

    if (focusOrigin === 'keyboard') {
      element.classList.add('gh-checkbox-focused');
    } else if (!focusOrigin) {
      element.classList.remove('gh-checkbox-focused');
    }
  }

}
