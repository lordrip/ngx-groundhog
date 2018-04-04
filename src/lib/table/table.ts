import {
  Directive,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  ViewContainerRef,
  ViewChild,
  AfterViewChecked,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ContentChildren
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
export class GhTable {
  @Input() dataSource: any[];
  @ContentChildren(GhColumn) columns: QueryList<GhColumn>;

  getCell(row: Array<any> | object, column: string | number): string {
    return row[column] || '';
  }

}
