import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Directive,
  ContentChild
} from '@angular/core';

/** Title of a card, needed as it's used as a selector in the API. */
@Directive({
  selector: `gh-card-title, [gh-card-title], [ghCardTitle]`,
  host: {
    'class': 'gh-card-title'
  }
})
export class GhCardTitle { }

/** Icon of a card, needed as it's used as a selector in the API. */
@Directive({
  selector: `gh-card-icon, [gh-card-icon], [ghCardIcon]`,
  host: {
    'class': 'gh-card-icon',
  }
})
export class GhCardIcon { }

/** Sub-title of a card, needed as it's used as a selector in the API. */
@Directive({
  selector: `gh-card-subtitle, [gh-card-subtitle], [ghCardSubtitle]`,
  host: {
    'class': 'gh-card-subtitle'
  }
})
export class GhCardSubtitle { }

/** Sub-title of a card, needed as it's used as a selector in the API. */
@Directive({
  selector: `gh-card-actions, [gh-card-actions], [ghCardActions]`,
  host: {
    'class': 'gh-card-actions'
  }
})
export class GhCardActions { }


@Component({
  moduleId: module.id,
  selector: 'gh-card',
  exportAs: 'ghCard',
  templateUrl: 'card.html',
  styleUrls: ['card.css'],
  host: {
    'class': 'gh-card',
    // We know that a header is present when the card has at least a title
    '[class.gh-card-has-header]': '!!_title'
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhCard {
  @ContentChild(GhCardTitle) _title: GhCardTitle;
}
