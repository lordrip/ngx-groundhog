import {Component} from '@angular/core';
import { DataSource } from '@angular/cdk/table';

@Component({
  moduleId: module.id,
  selector: 'table-demo',
  templateUrl: 'table-demo.html',
  styleUrls: ['table-demo.css'],
})
export class TableDemo {
  term = [{
      'Component': 'Platform - SSO(DebugUI)/Basic Auth',
      'Owner': 'Min-Hsien Lin',
      'Backup': ' '
    },
    {
      'Component': 'Platform - OAuth',
      'Owner': 'Min-Hsien Lin',
      'Backup': 'Stefan Chiettini'},
    {
      'Component': 'Platform - Billing',
      'Owner': 'Min-Hsien Lin',
      'Backup': ' '
    }];
}
