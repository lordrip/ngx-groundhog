import {Component} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'

@Component({
  moduleId: module.id,
  selector: 'table-demo',
  templateUrl: 'table-demo.html',
  styleUrls: ['table-demo.css'],
})
export class TableDemo {
  dataObj: object[];
  dataObjDisp: string;
  dataArr: object[];
  dataArrDisp: string;

  constructor() {
    this.dataObj = [
      { name: 'string 1', age: 1},
      { name: 'string 2', age: 2},
      { name: 'string 3', age: 3},
      { name: 'string 4', age: 4},
    ];
    this.dataObjDisp = this.stringify(JSON.stringify(this.dataObj));

    this.dataArr = [
      ['string 1', 1],
      ['string 2', 2],
      ['string 3', 3],
      ['string 4', 4],
    ];
    this.dataArrDisp = this.stringify(JSON.stringify(this.dataArr));
  }

  stringify(obj: any): string {
    return JSON.stringify(obj)
    .replace(/]"/g, '\n]\"')
    .replace(/{/g, '\n\t{')
    .replace(/\\/g, '');
  }
}
