import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge } from '../../ui/badge/badge';
import { Card } from '../../ui/card/card';
import { ALL_LESSONS, sortLessons } from '../lessons';

@Component({
  selector: 'app-lesson-list',
  imports: [RouterLink, Badge, Card],
  templateUrl: './lesson-list.html',
})
export class LessonList {
  protected readonly lessons = sortLessons(inject(ALL_LESSONS));
}
