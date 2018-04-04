import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {GhTable} from './table';
import {GhColumn} from './column';

@NgModule({
  imports: [
    CdkTableModule,
  ],
  exports: [
    GhTable,
    GhColumn,
  ],
  declarations: [
    GhTable,
    GhColumn,
  ]
})
export class GhTableModule {}
