import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'checkbox-demo',
  templateUrl: 'checkbox-demo.html',
  styleUrls: ['checkbox-demo.css'],
})
export class CheckboxDemo {
  isChecked: boolean = false;
  isDisabled: boolean = false;
}
