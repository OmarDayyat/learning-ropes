import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEARNING_PATH, STATUS_BADGE_CLASSES, STATUS_LABELS } from './learning-path';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  protected readonly steps = LEARNING_PATH;
  protected readonly statusLabels = STATUS_LABELS;
  protected readonly badgeClasses = STATUS_BADGE_CLASSES;
}
