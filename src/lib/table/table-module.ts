import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import {GhTable} from './table';
import {GhColumn} from './column';

@NgModule({
  imports: [
    CommonModule,
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
