import {
  Directive,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Attribute,
  ChangeDetectorRef,
  Inject,
  Optional,
} from '@angular/core';
import {
  mixinDisabled,
  CanDisable,
  mixinTabIndex,
  HasTabIndex,
  CanColor,
  mixinColor,
} from '@dynatrace/ngx-groundhog/core';
import { CdkConnectedOverlay, ConnectionPositionPair } from '@angular/cdk/overlay';
import { Subject } from 'rxjs/Subject';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {map} from 'rxjs/operators/map';
import {filter} from 'rxjs/operators/filter';
import {merge} from 'rxjs/observable/merge';

// Boilerplate for applying mixins to GhContextDialog.
export class GhContextDialogBase {
  constructor(public _elementRef: ElementRef) { }
}
export const _GhContextDialogBase =
  mixinTabIndex(mixinDisabled(mixinColor(GhContextDialogBase)));

@Component({
  moduleId: module.id,
  selector: 'gh-context-dialog',
  templateUrl: 'context-dialog.html',
  styleUrls: ['context-dialog.css'],
  inputs: ['disabled', 'tabIndex', 'color'],
  host: {
    'class': 'gh-context-dialog',
    'attr.aria-hidden': 'true',
    '[attr.aria-disabled]': 'disabled.toString()',
    'tabindex': '-1',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhContextDialog extends _GhContextDialogBase
implements OnDestroy, HasTabIndex, CanDisable, CanColor {
  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;

  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject();

  /** Last emitted position of the overlay */
  private _connectionPair: ConnectionPositionPair;

  /** The class that traps and manages focus within the overlay. */
  private _focusTrap: FocusTrap | null;

  // Element that was focused before the context-dialog was opened.
  // Save this to restore upon close.
  private _elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

  /** Aria label of the context-dialog. */
  @Input('aria-label') ariaLabel: string = '';

  get _ariaLabel(): string | null {
    return this.ariaLabel;
  }

  /** Event emitted when the select has been opened. */
  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  _positions = [{
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
  }, {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
  }];

  /** Overlay pane containing the content */
  @ViewChild(CdkConnectedOverlay) overlayDir: CdkConnectedOverlay;

  /** Panel that holds the content */
  @ViewChild('panel') panel: ElementRef;

  /** Whether or not the overlay panel is open. */
  get panelOpen() {
    return this._panelOpen;
  }

  constructor(
    elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private _focusTrapFactory: FocusTrapFactory,
    @Attribute('tabindex') tabIndex: string,
    @Optional() @Inject(DOCUMENT) private _document: any
  ) {
    super(elementRef);

    this.tabIndex = parseInt(tabIndex) || 0;
  }

  /** Opens the panel */
  open() {
    if (!this.disabled && !this._panelOpen) {
      this._panelOpen = true;
      this.openedChange.emit(true);
      this._savePreviouslyFocusedElement();
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Closes the panel */
  close() {
    if (this._panelOpen) {
      this._panelOpen = false;
      this.openedChange.emit(false);
      this._restoreFocus();
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Focuses the context-dialog element. */
  focus(): void {
    this._elementRef.nativeElement.focus();
  }

  /** Moves the focus inside the focus trap. */
  private _trapFocus() {
    if (!this._focusTrap) {
      this._focusTrap = this._focusTrapFactory.create(this.overlayDir.overlayRef.overlayElement);
    }
    this._focusTrap.focusInitialElementWhenReady();
  }

  /** Restores focus to the element that was focused before the overlay opened. */
  private _restoreFocus() {
    const toFocus = this._elementFocusedBeforeDialogWasOpened;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (toFocus && typeof toFocus.focus === 'function') {
      toFocus.focus();
    }

    if (this._focusTrap) {
      /** Destroy the focus trap */
      this._focusTrap.destroy();
      /** reset the focus trap to null to create a new one on subsequent open calls */
      this._focusTrap = null;
    }
  }

  /** Saves a reference to the element that was focused before the overlay was opened. */
  private _savePreviouslyFocusedElement() {
    if (this._document) {
      this._elementFocusedBeforeDialogWasOpened = this._document.activeElement as HTMLElement;
    }
  }

  /** Callback that is invoked when the overlay panel has been attached. */
  _onAttached(): void {
    /** trap focus within the overlay */
    this._trapFocus();

    const positionChange = this.overlayDir.positionChange;

    // Set classes depending on the position of the overlay
    positionChange
      // Stop listening when the component will be destroyed
      // or the overlay closes
      .pipe(takeUntil(merge(
        this._destroy,
        this.openedChange.pipe(filter(o => !o))
      )))
      // Map the change event to the provided ConnectionPositionPair
      .pipe(map(change => change.connectionPair))
      .subscribe(connectionPair => {
        // Set the classes to indicate the position of the overlay
        if (this._connectionPair) {
          this.panel.nativeElement.classList
            .remove(`gh-context-dialog-panel-${this._connectionPair.originY}`);
        }
        this.panel.nativeElement.classList.add(`gh-context-dialog-panel-${connectionPair.originY}`);
        this._connectionPair = connectionPair;
      });
  }

  /** Hook that trigger right before the component will be destroyed. */
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    this.close();
  }
}
