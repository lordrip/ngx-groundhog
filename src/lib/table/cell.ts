/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, Input} from '@angular/core';
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
} from '@angular/cdk/table';

/**
 * Cell definition for the gh-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[ghCellDef]',
  providers: [{provide: CdkCellDef, useExisting: GhCellDef}]
})
export class GhCellDef extends CdkCellDef { }

/**
 * Header cell definition for the gh-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[ghHeaderCellDef]',
  providers: [{provide: CdkHeaderCellDef, useExisting: GhHeaderCellDef}]
})
export class GhHeaderCellDef extends CdkHeaderCellDef { }

/**
 * Column definition for the gh-table.
 * Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[ghColumnDef]',
  providers: [{provide: CdkColumnDef, useExisting: GhColumnDef}],
})
export class GhColumnDef extends CdkColumnDef {
  /** Unique name for this column. */
  @Input('ghColumnDef') name: string;
}

/** Header cell template container that adds the right classes and role. */
@Directive({
  selector: 'gh-header-cell, th[gh-header-cell]',
  host: {
    'class': 'gh-header-cell',
    'role': 'columnheader',
  },
})
export class GhHeaderCell extends CdkHeaderCell {
  constructor(columnDef: CdkColumnDef,
              elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`gh-column-${columnDef.cssClassFriendlyName}`);
  }
}

/** Cell template container that adds the right classes and role. */
@Directive({
  selector: 'gh-cell, td[gh-cell]',
  host: {
    'class': 'gh-cell',
    'role': 'gridcell',
  },
})
export class GhCell extends CdkCell {
  constructor(columnDef: CdkColumnDef,
              elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`gh-column-${columnDef.cssClassFriendlyName}`);
  }
}
