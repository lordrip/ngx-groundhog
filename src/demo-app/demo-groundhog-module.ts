import {NgModule} from '@angular/core';
import {
  GhButtonModule,
  GhFormFieldModule,
  GhCheckboxModule,
  GhIconModule,
  GhInputModule,
  GhIslandModule,
  GhLoadingDistractorModule,
  GhProgressCircleModule,
  GhRadioModule,
  GhSelectModule,
  GhTileModule,
  GhThemingModule,
  GhContextMenuModule,
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
    GhIslandModule,
    GhLoadingDistractorModule,
    GhProgressCircleModule,
    GhRadioModule,
    GhSelectModule,
    GhTileModule,
    GhThemingModule,
    GhContextMenuModule,
  ]
})
export class DemoGroundhogModule {}
