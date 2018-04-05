import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'table-demo',
  templateUrl: 'table-demo.html',
  styleUrls: ['table-demo.css'],
})
export class TableDemo {
  data: object[];

  constructor() {
    this.data = [
      { name: 'string 1', age: 1},
      { name: 'string 2', age: 2},
      { name: 'string 3', age: 3},
      { name: 'string 4', age: 4},
    ];
  }
}
