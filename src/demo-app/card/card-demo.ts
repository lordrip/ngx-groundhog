import {Component} from '@angular/core';
import {GhIconRegistry} from '@dynatrace/ngx-groundhog';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'card-demo',
  templateUrl: 'card-demo.html',
  styleUrls: ['card-demo.css'],
})
export class CardDemo {
  constructor(iconRegistry: GhIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry
      .addSvgIcon('agent',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/agent.svg'));
  }
}
