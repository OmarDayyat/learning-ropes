import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge } from '../../ui/badge/badge';
import { CodeBlock } from '../../ui/code-block/code-block';
import { Link } from '../../ui/link/link';
import { Tab, Tabs } from '../../ui/tabs/tabs';
import { ALL_LESSONS, findLesson } from '../lessons';

@Component({
  selector: 'app-lesson-page',
  imports: [RouterLink, Badge, CodeBlock, Link, Tab, Tabs],
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

  private readonly allLessons = inject(ALL_LESSONS);
}
