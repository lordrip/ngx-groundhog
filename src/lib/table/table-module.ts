import {NgModule} from '@angular/core';
import {GhTable} from './table';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
    CdkTableModule,
  ],
  exports: [
    GhTable,
  ],
  declarations: [
    GhTable,
  ]
})
export class GhTableModule {}

