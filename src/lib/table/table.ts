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
  @Input() dataSource: string[];
  @ViewChildren(GhColumn) columns: QueryList<GhColumn>;

  constructor() {
    console.log(this.dataSource);
    console.log('Columns', this.columns);
  }

}
