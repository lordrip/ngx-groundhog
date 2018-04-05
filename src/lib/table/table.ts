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
  constructor(_differs: IterableDiffers,
    _changeDetectorRef: ChangeDetectorRef,
    _elementRef: ElementRef,
    @Attribute('role') role: string,
    private renderer2: Renderer2) {
      super(_differs, _changeDetectorRef, _elementRef, role);
    }

    renderRows() {
      super.renderRows();
      this.renderZebraStyle();
    }

    renderZebraStyle() {
      const viewContainer = this._rowPlaceholder.viewContainer;
      for (let index = 0, count = viewContainer.length; index < count; index++) {
        // const viewRef = viewContainer.get(index) as RowViewRef<T>;
        const viewRef = viewContainer.get(index) as any;
        viewRef.context.index = index;
        viewRef.context.count = count;
        viewRef.context.first = index === 0;
        viewRef.context.last = index === count - 1;
        viewRef.context.even = index % 2 === 0;
        viewRef.context.odd = !viewRef.context.even;
        console.log(viewRef);
      }


    }
  }
