import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DemoGroundhogModule} from '../demo-groundhog-module';
import {ButtonDemo} from '../button/button-demo';
import {CheckboxDemo} from '../checkbox/checkbox-demo';
import {IconDemo} from '../icon/icon-demo';
import {InputDemo} from 'input/input-demo';
import {CardDemo} from 'card/card-demo';
import {DemoApp, Home} from './demo-app';
import {DEMO_APP_ROUTES} from './routes';
import {SelectDemo} from '../select/select-demo';
import {ProgressCircleDemo} from '../progress-circle/progress-circle-demo';
import {TileDemo} from 'tile/tile-demo';
import {ContextMenuDemo} from '../context-menu/context-menu-demo';
import {RadioDemo} from 'radio/radio-demo';
import {LoadingDistractorDemo} from 'loading-distractor/loading-distractor-demo';
import {ContextDialogDemo} from '../context-dialog/context-dialog-demo';
import { TableDemo } from '../table/table-demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DEMO_APP_ROUTES),
    DemoGroundhogModule
  ],
  declarations: [
    ButtonDemo,
    CheckboxDemo,
    IconDemo,
    InputDemo,
    CardDemo,
    LoadingDistractorDemo,
    ProgressCircleDemo,
    RadioDemo,
    SelectDemo,
    TileDemo,
    DemoApp,
    Home,
    ContextMenuDemo,
    ContextDialogDemo,
    TableDemo,
  ],
  entryComponents: [
    DemoApp,
  ],
})
export class DemoModule {}
