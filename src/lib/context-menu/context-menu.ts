import {
  Directive,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  ElementRef,
  NgZone,
  Attribute,
  Self,
  Optional,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
  AfterContentInit,
  isDevMode,
  Inject,
  Input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GhButton } from '@dynatrace/ngx-groundhog/button';
import { NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import {
  mixinDisabled,
  CanDisable,
  mixinTabIndex,
  HasTabIndex,
  CanColor,
  mixinColor,
} from '@dynatrace/ngx-groundhog/core';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {map} from 'rxjs/operators/map';
import {filter} from 'rxjs/operators/filter';
import {merge} from 'rxjs/observable/merge';
import {Subject} from 'rxjs/Subject';
import { DOCUMENT } from '@angular/common';
import { GhContextDialog } from '@dynatrace/ngx-groundhog/context-dialog';

// Boilerplate for applying mixins to GhContextMenu.
export class GhContextMenuBase {
  constructor(public _elementRef: ElementRef) { }
}
export const _GhContextMenuBase =
  mixinTabIndex(mixinDisabled(mixinColor(GhContextMenuBase)));

@Component({
  moduleId: module.id,
  selector: 'gh-context-menu',
  templateUrl: 'context-menu.html',
  styleUrls: ['context-menu.css'],
  inputs: ['disabled', 'tabIndex', 'color'],
  host: {
    'class': 'gh-context-menu',
    'attr.aria-hidden': 'true',
    '[attr.aria-disabled]': 'disabled.toString()',
    'tabindex': '-1',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhContextMenu extends _GhContextMenuBase
  implements OnDestroy, HasTabIndex, CanDisable, CanColor {

  /** Aria label of the context-menu. */
  @Input('aria-label') ariaLabel: string = '';

  get _ariaLabel(): string | null {
    return this.ariaLabel;
  }

  /** Event emitted when the select has been opened. */
  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('contextDialog') contextDialog: GhContextDialog;

  /** List of the items inside of a menu. */
  @ContentChildren(GhButton) items: QueryList<GhButton>;

  /** Whether or not the overlay panel is open. */
  get panelOpen() {
    return this.contextDialog.panelOpen;
  }

  constructor(
    elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    @Attribute('tabindex') tabIndex: string,
    @Optional() @Inject(DOCUMENT) private _document: any
  ) {
    super(elementRef);

    this.tabIndex = parseInt(tabIndex) || 0;
  }

  /** Opens the panel */
  open() {
    if (!this.disabled && !this.contextDialog.panelOpen) {
      this.contextDialog.open();
      this.openedChange.emit(true);
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Closes the panel */
  close() {
    if (this.contextDialog.panelOpen) {
      this.contextDialog.close();
      this.openedChange.emit(false);
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Focuses the context-menu element. */
  focus(): void {
    this.contextDialog.focus();
  }

  /** Hook that trigger right before the component will be destroyed. */
  ngOnDestroy(): void {
    this.close();
  }
}

@Component({
  selector: 'gh-context-menu-item',
  templateUrl: './context-menu-item.html',
  inputs: ['disabled', 'tabIndex', 'color'],
  host: {
    'class': 'gh-context-menu-item',
    '[attr.aria-disabled]': 'disabled.toString()',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhContextMenuItem extends _GhContextMenuBase
  implements CanDisable, HasTabIndex, CanColor {
  constructor(
    elementRef: ElementRef,
    @Attribute('tabindex') tabIndex: string,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super(elementRef);

    this.tabIndex = parseInt(tabIndex) || 0;
  }

  /** Event emitted when the item has been clicked. */
  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  // Call is invoked when the button in the item is clicked
  _actionClicked(event: Event) {
    event.preventDefault();
    this.onClick.emit(event);
    this._changeDetectorRef.markForCheck();
  }
}
