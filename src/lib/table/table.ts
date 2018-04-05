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

@Component({
  moduleId: module.id,
  selector: 'gh-table',
  templateUrl: 'table.html',
  styleUrls: ['table.css'],
  host: {
    'class': 'gh-table',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
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
