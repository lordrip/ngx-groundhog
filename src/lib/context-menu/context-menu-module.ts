import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GhButtonModule } from '@dynatrace/ngx-groundhog/button';
import { GhContextDialogModule } from '@dynatrace/ngx-groundhog/context-dialog';

import { GhContextMenu, GhContextMenuItem } from './context-menu';

@NgModule({
  imports: [
    CommonModule,
    GhButtonModule,
    GhContextDialogModule,
  ],
  exports: [
    GhContextMenu,
    GhContextMenuItem,
  ],
  declarations: [
    GhContextMenu,
    GhContextMenuItem,
  ]
})
export class GhContextMenuModule {}
