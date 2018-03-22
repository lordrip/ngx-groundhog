import {NgModule} from '@angular/core';
import {
  GhButtonModule,
  GhCardModule,
  GhFormFieldModule,
  GhCheckboxModule,
  GhIconModule,
  GhInputModule,
  GhLoadingDistractorModule,
  GhProgressCircleModule,
  GhRadioModule,
  GhSelectModule,
  GhTileModule,
  GhThemingModule,
  GhContextMenuModule,
  GhContextDialogModule,
  GhTableModule,
} from '@dynatrace/ngx-groundhog';

/**
 * NgModule that includes all Groundhog modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    GhButtonModule,
    GhFormFieldModule,
    GhCheckboxModule,
    GhIconModule,
    GhInputModule,
    GhCardModule,
    GhLoadingDistractorModule,
    GhProgressCircleModule,
    GhRadioModule,
    GhSelectModule,
    GhTileModule,
    GhThemingModule,
    GhContextMenuModule,
    GhContextDialogModule,
    GhTableModule,
  ]
})
export class DemoGroundhogModule {}
