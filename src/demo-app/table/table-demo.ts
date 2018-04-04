import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'table-demo',
  templateUrl: 'table-demo.html',
  styleUrls: ['table-demo.css'],
})
export class TableDemo {
  attrData: object[];
  indexData: Array<Array<string|number|boolean>>;

  constructor() {
    this.attrData = [
      { name: 'string 1', age: 1},
      { name: 'string 2', age: 2},
      { name: 'string 3', age: 3},
      { name: 'string 4', age: 4},
    ];

    this.indexData = [
      ['Value 1', 'Value 2', 'Value 3'],
      ['Value 1', 'Value 2', 'Value 3'],
      ['Value 1', 'Value 2', 'Value 3'],
      ['Value 1', 'Value 2', 'Value 3'],
      ['Value 1', 'Value 2', 'Value 3'],
      ['Value 1', 'Value 2', 'Value 3'],
    ];
  }
}
