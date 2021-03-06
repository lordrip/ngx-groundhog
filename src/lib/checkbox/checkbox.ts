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
  OnDestroy,
  forwardRef,
  Attribute,
  Directive,
  Provider
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusOrigin } from '@angular/cdk/a11y';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  CheckboxRequiredValidator
} from '@angular/forms';
import {
  mixinTabIndex,
  mixinDisabled,
  CanDisable,
  HasTabIndex
} from '@dynatrace/ngx-groundhog/core';

/**
 * Checkbox IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let nextUniqueId = 0;

/**
 * Provider Expression that allows mat-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const GH_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GhCheckbox),
  multi: true
};

/** Change event object emitted by GhCheckbox */
export interface GhCheckboxChange {
  source: GhCheckbox;
  checked: boolean;
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
    '[class.gh-checkbox-disabled]': 'disabled',
    '(focus)': '_inputElement.nativeElement.focus()',
  },
  inputs: ['disabled', 'tabIndex'],
  providers: [GH_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhCheckbox extends _GhCheckboxMixinBase
  implements CanDisable, HasTabIndex, AfterViewInit, OnDestroy, ControlValueAccessor {

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

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input('aria-label') ariaLabel: string = '';

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  /** Event emitted when the checkbox's `checked` value changes. */
  @Output() readonly change: EventEmitter<GhCheckboxChange> = new EventEmitter<GhCheckboxChange>();

  /** The native radio input element */
  @ViewChild('input') _inputElement: ElementRef;

  /** Returns the unique id for the visual hidden input. */
  get _inputId(): string { return `${this.id}-input`; }

  _onTouched: () => any = () => { };

  private _checked: boolean = false;
  private _uid = `gh-checkbox-${nextUniqueId++}`;
  private _id: string;
  private _required: boolean;
  private _controlValueAccessorChangeFn: (value: any) => void = () => { };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _focusMonitor: FocusMonitor,
    @Attribute('tabindex') tabIndex: string,
  ) {
    super();

    // Force setter to be called in case id was not specified.
    this.id = this.id;
    this.tabIndex = parseInt(tabIndex) || 0;
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
      this._emitChangeEvent();
    }
  }

  _onInputChange(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }

  /** Implemented as a part of ControlValueAccessor. */
  writeValue(value: any) {
    this.checked = !!value;
  }

  /** Implemented as a part of ControlValueAccessor. */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /** Implemented as a part of ControlValueAccessor. */
  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  private _onInputFocusChange(focusOrigin: FocusOrigin) {
    const element = this._elementRef.nativeElement;

    if (focusOrigin === 'keyboard') {
      element.classList.add('gh-checkbox-focused');
    } else if (!focusOrigin) {
      element.classList.remove('gh-checkbox-focused');
      this._onTouched();
    }
  }

  private _emitChangeEvent() {
    this._controlValueAccessorChangeFn(this.checked);
    this.change.emit({ source: this, checked: this.checked });
  }
}

export const GH_CHECKBOX_REQUIRED_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => GhCheckboxRequiredValidator),
  multi: true
};

/**
 * Validator for checkbox's required attribute in template-driven checkbox.
 * TODO @thomaspink: Remove once CheckboxRequiredValidator supports custom checkbox
 */
@Directive({
  selector: `gh-checkbox[required][formControlName],
             gh-checkbox[required][formControl], gh-checkbox[required][ngModel]`,
  providers: [GH_CHECKBOX_REQUIRED_VALIDATOR],
  host: { '[attr.required]': 'required ? "" : null' }
})
export class GhCheckboxRequiredValidator extends CheckboxRequiredValidator { }
