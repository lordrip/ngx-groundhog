import { sandboxOf } from 'angular-playground';
import { GhButton, GhButtonModule } from '@dynatrace/ngx-groundhog';

export default sandboxOf(GhButton, {
  imports: [GhButtonModule],
  declareComponent: false,
})
  .add('with simple text', {
    template: `<button gh-button>Hey playground!</button>`
  })
  .add('with more text', {
    template: `<button gh-button>Hey more playground!</button>`
  });