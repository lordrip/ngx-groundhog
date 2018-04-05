import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  QueryList,
  ContentChildren,
  AfterViewInit
} from '@angular/core';
import { GhColumn } from './column';

import {Renderer2, IterableDiffers, ChangeDetectorRef, ElementRef, Attribute} from '@angular/core';
import {CDK_TABLE_TEMPLATE, CdkTable} from '@angular/cdk/table';

/**
* Wrapper for the CdkTable with Material design styles.
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
export class GhTable implements AfterViewInit {
  dataSource: any[];
  // @Input() dataSource: any[];
  @ContentChildren(GhColumn) columns: QueryList<GhColumn>;

  constructor() {
    this.dataSource = [
      { name: 'string 1', age: 1},
      { name: 'string 2', age: 2},
      { name: 'string 3', age: 3},
      { name: 'string 4', age: 4},
    ];
  }

  getCell(row: Array<any> | object, column: string | number): string {
    return row[column] || '';
  }

  ngAfterViewInit() {
    console.log('Columns', this.columns);
  }


}
