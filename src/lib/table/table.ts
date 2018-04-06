/**
* @license
* Copyright Google LLC All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/

import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Renderer2,
  IterableDiffers,
  ChangeDetectorRef,
  ElementRef,
  Attribute
} from '@angular/core';
import {CDK_TABLE_TEMPLATE, CdkTable} from '@angular/cdk/table';

/**
* Wrapper for the CdkTable with Groundhog design styles.
*/
@Component({
  moduleId: module.id,
  selector: 'gh-table, table[gh-table]',
  exportAs: 'ghTable',
  template: CDK_TABLE_TEMPLATE,
  styleUrls: ['table.css'],
  host: {
    'class': 'gh-table',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhTable<T> extends CdkTable<T> {
  constructor(
    _differs: IterableDiffers,
    _changeDetectorRef: ChangeDetectorRef,
    _elementRef: ElementRef,
    @Attribute('role') role: string,
    private renderer2: Renderer2
  ) {
    super(_differs, _changeDetectorRef, _elementRef, role);
  }

}
