import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GhLoadingDistractorModule, GhLoadingSpinner } from './index';

describe('GhLoadingDistractor', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GhLoadingDistractorModule],
      declarations: [TestApp],
    });

    TestBed.compileComponents();
  }));

  it('should support setting a custom aria-label', fakeAsync(() => {
    const fixture = TestBed.createComponent(TestApp);
    const spinnerElement = fixture.debugElement.query(By.css('gh-loading-spinner'));
    const instance = spinnerElement.componentInstance;
    instance.ariaLabel = 'Custom Label';
    fixture.detectChanges();
    expect(spinnerElement.nativeElement.getAttribute('aria-label')).toEqual('Custom Label');
  }));

  it('should support setting aria-labeledby', fakeAsync(() => {
    const fixture = TestBed.createComponent(TestApp);
    const spinnerElement = fixture.debugElement.query(By.css('gh-loading-spinner'));
    const instance = spinnerElement.componentInstance;
    instance.ariaLabelledby = 'test';
    fixture.detectChanges();
    expect(spinnerElement.nativeElement.getAttribute('aria-labeledby')).toEqual('test');
  }));

  it('should augment an existing class with a size property', () => {
    const fixture = TestBed.createComponent(TestApp);
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('gh-loading-spinner'));
    const instance = spinnerElement.componentInstance;

    expect(instance.size)
      .toBe('default', 'Expected the class to have a size property');

    instance.size = 'small';

    expect(instance.size)
      .toBe('small', 'Expected the class to have an updated size property');
  });

  it('should remove old size classes if new size is set', () => {
    const fixture = TestBed.createComponent(TestApp);
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('gh-loading-spinner'));
    const instance = spinnerElement.componentInstance;

    expect(spinnerElement.nativeElement.classList).toContain('gh-loading-spinner-size-default',
      'Expected the element to have the "gh-loading-spinner-size-default" class set');

    instance.size = 'small';

    expect(spinnerElement.nativeElement.classList).not.toContain('gh-loading-spinner-size-default',
      'Expected the element to no longer have "gh-loading-spinner-size-default" set.');
    expect(spinnerElement.nativeElement.classList).toContain('gh-loading-spinner-size-small',
      'Expected the element to have the "gh-loading-spinner-size-smallt" class set');
  });
});

@Component({
  selector: 'test-app',
  template: `
    <gh-loading-spinner [size]="size"></gh-loading-spinner>
  `
})
class TestApp {
  size = 'default';
}
