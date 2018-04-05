/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import {GhTable} from './table';
import {GhColumn} from './column';
import {GhHeaderRow, GhHeaderRowDef, GhRow, GhRowDef} from './row';
import {GhCell, GhCellDef, GhColumnDef, GhHeaderCell, GhHeaderCellDef} from './cell';

const EXPORTED_DECLARATIONS = [
  // Table
  GhTable,

  // Template defs
  GhCellDef,
  GhHeaderCellDef,
  GhColumnDef,
  GhHeaderRowDef,
  GhRowDef,

  // Cell directives
  GhHeaderCell,
  GhCell,

  // Row directions
  GhHeaderRow,
  GhRow,
];

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
  ],
  exports: [
    GhTable,
    GhColumn,
  ],
  declarations: [
    GhTable,
    GhColumn,
  ]
})
export class GhTableModule {}
