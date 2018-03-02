
import {TestBed, async} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {GhProgressCircleModule, GhProgressCircle} from './index';


describe('GhProgressCircle', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GhProgressCircleModule],
      declarations: [
        BasicProgressCircle,
        ValueProgressCircle,
        ColorProgressCircle
      ]
    });
  }));

  it('should define a default value of zero for the value attribute', () => {
    const fixture = TestBed.createComponent(BasicProgressCircle);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('gh-progress-circle'));
    expect(progressElement.componentInstance.value).toBe(0);
  });

  it('should define a default value of zero for the min attribute', () => {
    const fixture = TestBed.createComponent(BasicProgressCircle);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('gh-progress-circle'));
    expect(progressElement.componentInstance.min).toBe(0);
  });

  it('should define a default value of 100 for the max attribute', () => {
    const fixture = TestBed.createComponent(BasicProgressCircle);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('gh-progress-circle'));
    expect(progressElement.componentInstance.max).toBe(100);
  });

  it('should clamp the value of the progress between 0 and 100', () => {
    const fixture = TestBed.createComponent(BasicProgressCircle);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('gh-progress-circle'));
    const progressComponent = progressElement.componentInstance;

    progressComponent.value = 50;
    expect(progressComponent.value).toBe(50);

    progressComponent.value = 0;
    expect(progressComponent.value).toBe(0);

    progressComponent.value = 100;
    expect(progressComponent.value).toBe(100);

    progressComponent.value = 999;
    expect(progressComponent.value).toBe(100);

    progressComponent.value = -10;
    expect(progressComponent.value).toBe(0);
  });

  it('should accept the value, min and max attribute as an input', () => {
    const fixture = TestBed.createComponent(ValueProgressCircle);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('gh-progress-circle'));
    expect(progressElement.componentInstance.value).toBe(150);
    expect(progressElement.componentInstance.min).toBe(100);
    expect(progressElement.componentInstance.max).toBe(200);
  });

  it('should calculate the percentage based on value, min and max', () => {
    const fixture = TestBed.createComponent(ValueProgressCircle);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('gh-progress-circle'));
    expect(progressElement.componentInstance.percent).toBe(50);
  });

  it('should calculate the dash offset based the percentage', () => {
    const fixture = TestBed.createComponent(ValueProgressCircle);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('gh-progress-circle'));
    expect(progressElement.componentInstance._dashOffset).toBe(757);
  });

  it('should set the min, max and value aria attribute accordingly', () => {
    const fixture = TestBed.createComponent(ValueProgressCircle);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('gh-progress-circle'));
    expect(progressElement.nativeElement.getAttribute('aria-valuemin')).toBe('100');
    expect(progressElement.nativeElement.getAttribute('aria-valuemax')).toBe('200');
    expect(progressElement.nativeElement.getAttribute('aria-valuenow')).toBe('150');
  });

  it('should augment an existing class with a color property', () => {
    const fixture = TestBed.createComponent(ColorProgressCircle);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('gh-progress-circle'));
    const instance = progressElement.componentInstance;

    expect(instance.color)
      .toBe('main', 'Expected the mixed-into class to have a color property');

    instance.color = 'accent';

    expect(instance.color)
        .toBe('accent', 'Expected the mixed-into class to have an updated color property');
  });

  it('should remove old color classes if new color is set', () => {
    const fixture = TestBed.createComponent(ColorProgressCircle);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('gh-progress-circle'));
    const instance = progressElement.componentInstance;

    expect(progressElement.nativeElement.classList)
      .toContain('gh-main', 'Expected the element to have the "gh-main" class set');

    instance.color = 'accent';

    expect(progressElement.nativeElement.classList).not.toContain('gh-main',
      'Expected the element to no longer have "gh-main" set.');
    expect(progressElement.nativeElement.classList).toContain('gh-accent',
      'Expected the element to have the "gh-accent" class set');
  });
});

@Component({template: '<gh-progress-circle></gh-progress-circle>'})
class BasicProgressCircle {}

@Component({
  template: '<gh-progress-circle [value]="value" [min]="min" [max]="max"></gh-progress-circle>'
})
class ValueProgressCircle {
  value = 150;
  min = 100;
  max = 200;
}

@Component({template: '<gh-progress-circle [color]="color"></gh-progress-circle>'})
class ColorProgressCircle {
  color = 'main';
}
