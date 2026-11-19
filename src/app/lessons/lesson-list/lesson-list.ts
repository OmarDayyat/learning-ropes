import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { levelBadgeClasses, statusBadgeClasses, statusLabel } from '../lesson-badges';
import { ALL_LESSONS, sortLessons } from '../lessons';

@Component({
  selector: 'app-lesson-list',
  imports: [RouterLink],
  templateUrl: './lesson-list.html',
})
export class LessonList {
  protected readonly lessons = sortLessons(inject(ALL_LESSONS));

  protected readonly levelBadgeClasses = levelBadgeClasses;
  protected readonly statusBadgeClasses = statusBadgeClasses;
  protected readonly statusLabel = statusLabel;
}
