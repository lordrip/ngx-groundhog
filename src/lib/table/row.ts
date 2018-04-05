/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectionStrategy, Component, Directive, ViewEncapsulation} from '@angular/core';
import {
  CDK_ROW_TEMPLATE,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef,
} from '@angular/cdk/table';

/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
  selector: '[ghHeaderRowDef]',
  providers: [{provide: CdkHeaderRowDef, useExisting: GhHeaderRowDef}],
  inputs: ['columns:ghHeaderRowDef'],
})
export class GhHeaderRowDef extends CdkHeaderRowDef { }

/**
 * Data row definition for the gh-table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
  selector: '[ghRowDef]',
  providers: [{provide: CdkRowDef, useExisting: GhRowDef}],
  inputs: ['columns: ghRowDefColumns', 'when: ghRowDefWhen'],
})
export class GhRowDef<T> extends CdkRowDef<T> {
}

/** Header template container that contains the cell outlet. Adds the right class and role. */
@Component({
  moduleId: module.id,
  selector: 'gh-header-row, tr[gh-header-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'gh-header-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ghHeaderRow',
})
export class GhHeaderRow extends CdkHeaderRow { }

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
  moduleId: module.id,
  selector: 'gh-row, tr[gh-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'gh-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'ghRow',
})
export class GhRow extends CdkRow { }
