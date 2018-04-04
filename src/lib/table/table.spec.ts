
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {GhTableModule, GhTable} from './index';

describe('GhTable', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GhTableModule],
      declarations: [TestApp],
    });

    TestBed.compileComponents();
  }));

  /**
   * insert your tests here
   */
});

  /** Test component that contains an GhTable. */
@Component({
  selector: 'test-app',
  template: `
    <!-- insert your component testapp usage here -->
  `
})
class TestApp {

}
