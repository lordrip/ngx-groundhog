import { ComponentFixture, fakeAsync, TestBed, tick, flush } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent } from '@dynatrace/ngx-groundhog/core';
import { GhCheckbox, GhCheckboxChange, GhCheckboxModule } from './index';
import { MutationObserverFactory } from '@angular/cdk/observers';


describe('GhCheckbox', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GhCheckboxModule, FormsModule, ReactiveFormsModule],
      declarations: [
        SingleCheckbox,
        CheckboxWithFormDirectives,
        MultipleCheckboxes,
        CheckboxWithNgModel,
        CheckboxWithTabIndex,
        CheckboxWithAriaLabel,
        CheckboxWithAriaLabelledby,
        CheckboxWithNameAttribute,
        CheckboxWithChangeEvent,
        CheckboxWithFormControl,
        CheckboxWithTabindexAttr,
      ]
    });

    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let checkboxInstance: GhCheckbox;
    let testComponent: SingleCheckbox;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleCheckbox);
      fixture.detectChanges();

      checkboxDebugElement = fixture.debugElement.query(By.directive(GhCheckbox));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      checkboxInstance = checkboxDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
      labelElement = <HTMLLabelElement>checkboxNativeElement.querySelector('label');
    });

    it('should add and remove the checked state', () => {
      expect(checkboxInstance.checked).toBe(false);
      expect(checkboxNativeElement.classList).not.toContain('gh-checkbox-checked');
      expect(inputElement.checked).toBe(false);

      testComponent.isChecked = true;
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(true);
      expect(checkboxNativeElement.classList).toContain('gh-checkbox-checked');
      expect(inputElement.checked).toBe(true);

      testComponent.isChecked = false;
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(false);
      expect(checkboxNativeElement.classList).not.toContain('gh-checkbox-checked');
      expect(inputElement.checked).toBe(false);
    });

    it('should change native element checked when check programmatically', () => {
      expect(inputElement.checked).toBe(false);

      checkboxInstance.checked = true;
      fixture.detectChanges();

      expect(inputElement.checked).toBe(true);
    });

    it('should toggle checked state on click', () => {
      expect(checkboxInstance.checked).toBe(false);

      labelElement.click();
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(true);

      labelElement.click();
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(false);
    });

    it('should add and remove disabled state', () => {
      expect(checkboxInstance.disabled).toBe(false);
      expect(checkboxNativeElement.classList).not.toContain('gh-checkbox-disabled');
      expect(inputElement.tabIndex).toBe(0);
      expect(inputElement.disabled).toBe(false);

      testComponent.isDisabled = true;
      fixture.detectChanges();

      expect(checkboxInstance.disabled).toBe(true);
      expect(checkboxNativeElement.classList).toContain('gh-checkbox-disabled');
      expect(inputElement.disabled).toBe(true);

      testComponent.isDisabled = false;
      fixture.detectChanges();

      expect(checkboxInstance.disabled).toBe(false);
      expect(checkboxNativeElement.classList).not.toContain('gh-checkbox-disabled');
      expect(inputElement.tabIndex).toBe(0);
      expect(inputElement.disabled).toBe(false);
    });

    it('should not toggle `checked` state upon interation while disabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      checkboxNativeElement.click();
      expect(checkboxInstance.checked).toBe(false);
    });

    it('should preserve the user-provided id', () => {
      expect(checkboxNativeElement.id).toBe('simple-check');
      expect(inputElement.id).toBe('simple-check-input');
    });

    it('should generate a unique id for the checkbox input if no id is set', () => {
      testComponent.checkboxId = null;
      fixture.detectChanges();

      expect(checkboxInstance._inputId).toMatch(/gh-checkbox-\d+/);
      expect(inputElement.id).toBe(checkboxInstance._inputId);
    });

    it('should project the checkbox content into the label element', () => {
      let label = <HTMLLabelElement>checkboxNativeElement.querySelector('.gh-checkbox-label');
      expect(label.textContent!.trim()).toBe('Simple checkbox');
    });

    it('should make the host element a tab stop', () => {
      expect(inputElement.tabIndex).toBe(0);
    });

    it('should not trigger the click event multiple times', () => {
      // By default, when clicking on a label element, a generated click will be dispatched
      // on the associated input element.
      // Since we're using a label element and a visual hidden input, this behavior can led
      // to an issue, where the click events on the checkbox are getting executed twice.

      spyOn(testComponent, 'onCheckboxClick');

      expect(inputElement.checked).toBe(false);
      expect(checkboxNativeElement.classList).not.toContain('gh-checkbox-checked');

      labelElement.click();
      fixture.detectChanges();

      expect(checkboxNativeElement.classList).toContain('gh-checkbox-checked');
      expect(inputElement.checked).toBe(true);

      expect(testComponent.onCheckboxClick).toHaveBeenCalledTimes(1);
    });

    it('should trigger a change event when the native input does', fakeAsync(() => {
      spyOn(testComponent, 'onCheckboxChange');

      expect(inputElement.checked).toBe(false);
      expect(checkboxNativeElement.classList).not.toContain('gh-checkbox-checked');

      labelElement.click();
      fixture.detectChanges();

      expect(inputElement.checked).toBe(true);
      expect(checkboxNativeElement.classList).toContain('gh-checkbox-checked');

      fixture.detectChanges();
      flush();

      // The change event shouldn't fire, because the value change was not caused
      // by any interaction.
      expect(testComponent.onCheckboxChange).toHaveBeenCalledTimes(1);
    }));

    it('should not trigger the change event by changing the native value', fakeAsync(() => {
      spyOn(testComponent, 'onCheckboxChange');

      expect(inputElement.checked).toBe(false);
      expect(checkboxNativeElement.classList).not.toContain('gh-checkbox-checked');

      testComponent.isChecked = true;
      fixture.detectChanges();

      expect(inputElement.checked).toBe(true);
      expect(checkboxNativeElement.classList).toContain('gh-checkbox-checked');

      fixture.detectChanges();
      flush();

      // The change event shouldn't fire, because the value change was not caused
      // by any interaction.
      expect(testComponent.onCheckboxChange).not.toHaveBeenCalled();
    }));

    it('should forward the required attribute', () => {
      testComponent.isRequired = true;
      fixture.detectChanges();

      expect(inputElement.required).toBe(true);

      testComponent.isRequired = false;
      fixture.detectChanges();

      expect(inputElement.required).toBe(false);
    });

    it('should focus on underlying input element when focus() is called', () => {
      expect(document.activeElement).not.toBe(inputElement);

      checkboxInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(inputElement);
    });

    it('should forward the value to input element', () => {
      testComponent.checkboxValue = 'basic_checkbox';
      fixture.detectChanges();

      expect(inputElement.value).toBe('basic_checkbox');
    });

    it('should remove the SVG checkmark from the tab order', () => {
      expect(checkboxNativeElement.querySelector('svg')!.getAttribute('focusable')).toBe('false');
    });
  });

  describe('with change event and no initial value', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let checkboxInstance: GhCheckbox;
    let testComponent: CheckboxWithChangeEvent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(CheckboxWithChangeEvent);
      fixture.detectChanges();

      checkboxDebugElement = fixture.debugElement.query(By.directive(GhCheckbox));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      checkboxInstance = checkboxDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
      labelElement = <HTMLLabelElement>checkboxNativeElement.querySelector('label');
    });

    it('should emit the event to the change observable', () => {
      let changeSpy = jasmine.createSpy('onChangeObservable');

      checkboxInstance.change.subscribe(changeSpy);

      fixture.detectChanges();
      expect(changeSpy).not.toHaveBeenCalled();

      // When changing the native `checked` property the checkbox will not fire a change event,
      // because the element is not focused and it's not the native behavior of the input element.
      labelElement.click();
      fixture.detectChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit a DOM event to the change output', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.lastEvent).toBeUndefined();

      // Trigger the click on the inputElement, because the input will probably
      // emit a DOM event to the change output.
      inputElement.click();
      fixture.detectChanges();
      flush();

      // We're checking the arguments type / emitted value to be a boolean, because sometimes the
      // emitted value can be a DOM Event, which is not valid.
      // See angular/angular#4059
      expect(testComponent.lastEvent.checked).toBe(true);
    }));
  });

  describe('aria-label ', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;

    it('should use the provided aria-label', () => {
      fixture = TestBed.createComponent(CheckboxWithAriaLabel);
      checkboxDebugElement = fixture.debugElement.query(By.directive(GhCheckbox));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

      fixture.detectChanges();
      expect(inputElement.getAttribute('aria-label')).toBe('Super effective');
    });

    it('should not set the aria-label attribute if no value is provided', () => {
      fixture = TestBed.createComponent(SingleCheckbox);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('input').hasAttribute('aria-label')).toBe(false);
    });
  });

  describe('with provided aria-labelledby ', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;

    it('should use the provided aria-labelledby', () => {
      fixture = TestBed.createComponent(CheckboxWithAriaLabelledby);
      checkboxDebugElement = fixture.debugElement.query(By.directive(GhCheckbox));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

      fixture.detectChanges();
      expect(inputElement.getAttribute('aria-labelledby')).toBe('some-id');
    });

    it('should not assign aria-labelledby if none is provided', () => {
      fixture = TestBed.createComponent(SingleCheckbox);
      checkboxDebugElement = fixture.debugElement.query(By.directive(GhCheckbox));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

      fixture.detectChanges();
      expect(inputElement.getAttribute('aria-labelledby')).toBe(null);
    });
  });

  describe('with provided tabIndex', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let testComponent: CheckboxWithTabIndex;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(CheckboxWithTabIndex);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      checkboxDebugElement = fixture.debugElement.query(By.directive(GhCheckbox));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
    });

    it('should preserve any given tabIndex', () => {
      expect(inputElement.tabIndex).toBe(7);
    });

    it('should preserve given tabIndex when the checkbox is disabled then enabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      testComponent.customTabIndex = 13;
      fixture.detectChanges();

      testComponent.isDisabled = false;
      fixture.detectChanges();

      expect(inputElement.tabIndex).toBe(13);
    });

  });

  describe('with native tabindex attribute', () => {

    it('should properly detect native tabindex attribute', fakeAsync(() => {
      fixture = TestBed.createComponent(CheckboxWithTabindexAttr);
      fixture.detectChanges();

      const checkbox = fixture.debugElement
        .query(By.directive(GhCheckbox)).componentInstance as GhCheckbox;

      expect(checkbox.tabIndex)
        .toBe(5, 'Expected tabIndex property to have been set based on the native attribute');
    }));
  });

  describe('with multiple checkboxes', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MultipleCheckboxes);
      fixture.detectChanges();
    });

    it('should assign a unique id to each checkbox', () => {
      let [firstId, secondId] =
        fixture.debugElement.queryAll(By.directive(GhCheckbox))
          .map(debugElement => debugElement.nativeElement.querySelector('input').id);

      expect(firstId).toMatch(/gh-checkbox-\d+-input/);
      expect(secondId).toMatch(/gh-checkbox-\d+-input/);
      expect(firstId).not.toEqual(secondId);
    });
  });

  describe('with ngModel', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let checkboxInstance: GhCheckbox;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(CheckboxWithFormDirectives);
      fixture.detectChanges();

      checkboxDebugElement = fixture.debugElement.query(By.directive(GhCheckbox));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      checkboxInstance = checkboxDebugElement.componentInstance;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
    });

    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();

      let checkboxElement = fixture.debugElement.query(By.directive(GhCheckbox));
      let ngModel = checkboxElement.injector.get<NgModel>(NgModel);

      expect(ngModel.valid).toBe(true);
      expect(ngModel.pristine).toBe(true);
      expect(ngModel.touched).toBe(false);

      // TODO(jelbourn): test that `touched` and `pristine` state are modified appropriately.
      // This is currently blocked on issues with async() and fakeAsync().
    }));

    it('should toggle checked state on click', () => {
      expect(checkboxInstance.checked).toBe(false);

      inputElement.click();
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(true);

      inputElement.click();
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(false);
    });
  });

  describe('with required ngModel', () => {
    let checkboxInstance: GhCheckbox;
    let inputElement: HTMLInputElement;
    let testComponent: CheckboxWithNgModel;

    beforeEach(() => {
      fixture = TestBed.createComponent(CheckboxWithNgModel);
      fixture.detectChanges();

      let checkboxDebugElement = fixture.debugElement.query(By.directive(GhCheckbox));
      let checkboxNativeElement = checkboxDebugElement.nativeElement;
      testComponent = fixture.debugElement.componentInstance;
      checkboxInstance = checkboxDebugElement.componentInstance;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
    });

    it('should validate with RequiredTrue validator', () => {
      let checkboxElement = fixture.debugElement.query(By.directive(GhCheckbox));
      let ngModel = checkboxElement.injector.get<NgModel>(NgModel);

      testComponent.isRequired = true;
      inputElement.click();
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(true);
      expect(ngModel.valid).toBe(true);

      inputElement.click();
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(false);
      expect(ngModel.valid).toBe(false);
    });
  });

  describe('with name attribute', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CheckboxWithNameAttribute);
      fixture.detectChanges();
    });

    it('should forward name value to input element', () => {
      let checkboxElement = fixture.debugElement.query(By.directive(GhCheckbox));
      let inputElement = <HTMLInputElement>checkboxElement.nativeElement.querySelector('input');

      expect(inputElement.getAttribute('name')).toBe('test-name');
    });
  });
});

/** Simple component for testing a single checkbox. */
@Component({
  template: `
  <div (click)="parentElementClicked = true" (keyup)="parentElementKeyedUp = true">
    <gh-checkbox
        [id]="checkboxId"
        [required]="isRequired"
        [checked]="isChecked"
        [disabled]="isDisabled"
        [value]="checkboxValue"
        (click)="onCheckboxClick($event)"
        (change)="onCheckboxChange($event)">
      Simple checkbox
    </gh-checkbox>
  </div>`
})
class SingleCheckbox {
  isChecked: boolean = false;
  isRequired: boolean = false;
  isDisabled: boolean = false;
  parentElementClicked: boolean = false;
  parentElementKeyedUp: boolean = false;
  checkboxId: string | null = 'simple-check';
  checkboxValue: string = 'single_checkbox';

  onCheckboxClick: (event?: Event) => void = () => { };
  onCheckboxChange: (event?: GhCheckboxChange) => void = () => { };
}

/** Simple component for testing an GhCheckbox with ngModel in a form. */
@Component({
  template: `
    <form>
      <gh-checkbox name="cb" [(ngModel)]="isGood">Be good</gh-checkbox>
    </form>
  `,
})
class CheckboxWithFormDirectives {
  isGood: boolean = false;
}

/** Simple component for testing an GhCheckbox with required ngModel. */
@Component({
  template: `<gh-checkbox [required]="isRequired" [(ngModel)]="isGood">Be good</gh-checkbox>`,
})
class CheckboxWithNgModel {
  isGood: boolean = false;
  isRequired: boolean = true;
}

/** Simple test component with multiple checkboxes. */
@Component(({
  template: `
    <gh-checkbox>Option 1</gh-checkbox>
    <gh-checkbox>Option 2</gh-checkbox>
  `
}))
class MultipleCheckboxes { }


/** Simple test component with tabIndex */
@Component({
  template: `
    <gh-checkbox
        [tabIndex]="customTabIndex"
        [disabled]="isDisabled">
    </gh-checkbox>`,
})
class CheckboxWithTabIndex {
  customTabIndex: number = 7;
  isDisabled: boolean = false;
}

/** Simple test component with an aria-label set. */
@Component({
  template: `<gh-checkbox aria-label="Super effective"></gh-checkbox>`
})
class CheckboxWithAriaLabel { }

/** Simple test component with an aria-label set. */
@Component({
  template: `<gh-checkbox aria-labelledby="some-id"></gh-checkbox>`
})
class CheckboxWithAriaLabelledby { }

/** Simple test component with name attribute */
@Component({
  template: `<gh-checkbox name="test-name"></gh-checkbox>`
})
class CheckboxWithNameAttribute { }

/** Simple test component with change event */
@Component({
  template: `<gh-checkbox (change)="lastEvent = $event"></gh-checkbox>`
})
class CheckboxWithChangeEvent {
  lastEvent: GhCheckboxChange;
}

/** Test component with reactive forms */
@Component({
  template: `<gh-checkbox [formControl]="formControl"></gh-checkbox>`
})
class CheckboxWithFormControl {
  formControl = new FormControl();
}

/** Test component with the native tabindex attribute. */
@Component({
  template: `<gh-checkbox tabindex="5"></gh-checkbox>`
})
class CheckboxWithTabindexAttr { }
