import {Component, ViewChild} from '@angular/core';
import { GhContextDialog } from '@dynatrace/ngx-groundhog/context-dialog';

@Component({
  moduleId: module.id,
  selector: 'context-dialog-demo',
  templateUrl: 'context-dialog-demo.html',
})
export class ContextDialogDemo {
  opened: boolean = false;
  disabled: boolean = false;
  editDisabled: boolean = false;

  @ViewChild('contextDialog') caDialog: GhContextDialog;

  open() {
    this.caDialog.open();
  }

  close() {
    this.caDialog.close();
  }
}
