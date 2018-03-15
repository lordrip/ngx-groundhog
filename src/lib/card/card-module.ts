import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GhCard, GhCardTitle,
  GhCardSubtitle,
  GhCardIcon,
  GhCardActions
} from './card';

@NgModule({
  imports: [CommonModule],
  exports: [
    GhCard,
    GhCardTitle,
    GhCardSubtitle,
    GhCardIcon,
    GhCardActions
  ],
  declarations: [
    GhCard,
    GhCardTitle,
    GhCardSubtitle,
    GhCardIcon,
    GhCardActions
  ]
})
export class GhCardModule { }
