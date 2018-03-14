import { NgModule } from '@angular/core';
import { GhCheckbox, GhCheckboxRequiredValidator } from './checkbox';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  imports: [
    CommonModule,
    A11yModule
  ],
  exports: [
    GhCheckbox,
    GhCheckboxRequiredValidator
  ],
  declarations: [
    GhCheckbox,
    GhCheckboxRequiredValidator
  ]
})
export class GhCheckboxModule {}
