import { NgModule } from '@angular/core';
import { GhLoadingSpinner, GhLoadingDistractor } from './loading-distractor';

@NgModule({
  exports: [
    GhLoadingSpinner,
    GhLoadingDistractor
  ],
  declarations: [
    GhLoadingSpinner,
    GhLoadingDistractor
  ]
})
export class GhLoadingDistractorModule { }
