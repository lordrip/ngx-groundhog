import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'gh-loading-spinner',
  exportAs: 'ghLoadingSpinner',
  templateUrl: 'loading-spinner.html',
  styleUrls: ['loading-distractor.css'],
  host: {
    'class': 'gh-loading-spinner',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhLoadingSpinner { }

@Component({
  moduleId: module.id,
  selector: 'gh-loading-distractor',
  exportAs: 'ghLoadingDistractor',
  templateUrl: 'loading-distractor.html',
  host: {
    'class': 'gh-loading-distractor',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhLoadingDistractor { }
