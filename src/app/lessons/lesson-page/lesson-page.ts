import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { levelBadgeClasses, statusBadgeClasses, statusLabel } from '../lesson-badges';
import { ALL_LESSONS, findLesson } from '../lessons';
import { LessonStepTabs } from './lesson-step-tabs';

@Component({
  selector: 'app-lesson-page',
  imports: [RouterLink, LessonStepTabs],
  templateUrl: './lesson-page.html',
})
export class LessonPage {
  /** Set by the router from the :slug part of the URL (withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly lesson = computed(() => findLesson(this.slug(), this.allLessons));

  /** The page sections, in order. The ids are the #links in the "On this page" list. */
  protected readonly sections = [
    { id: 'brief', title: 'Brief' },
    { id: 'learn', title: "What you'll learn" },
    { id: 'steps', title: 'Steps' },
    { id: 'in-our-repo', title: 'In our repo' },
    { id: 'feedback', title: 'Feedback' },
    { id: 'mistakes', title: 'Common mistakes' },
    { id: 'check', title: 'Check yourself' },
  ];

  protected readonly levelBadgeClasses = levelBadgeClasses;
  protected readonly statusBadgeClasses = statusBadgeClasses;
  protected readonly statusLabel = statusLabel;

  private readonly allLessons = inject(ALL_LESSONS);
}
