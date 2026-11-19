import { InjectionToken } from '@angular/core';
import { SETUP_LESSON } from './data/00-setup';
import { FIRST_REVIEW_LESSON } from './data/01-first-review';
import { Lesson } from './lesson.model';

/**
 * Every lesson on the site, one per sprint topic.
 * Keep the list sorted by sprint. Lessons in the same sprint show in the order they appear here.
 */
export const LESSONS: Lesson[] = [SETUP_LESSON, FIRST_REVIEW_LESSON];

/**
 * The lessons the pages show. It is LESSONS unless a test swaps in its own list:
 * `{ provide: ALL_LESSONS, useValue: [SAMPLE_LESSON] }`.
 */
export const ALL_LESSONS = new InjectionToken<Lesson[]>('ALL_LESSONS', {
  providedIn: 'root',
  factory: () => LESSONS,
});

/** Returns the lesson with this slug, or undefined if there is none. */
export function findLesson(slug: string, lessons: Lesson[] = LESSONS): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

/** Returns a copy of the list sorted by sprint. Lessons in the same sprint keep their order. */
export function sortLessons(lessons: Lesson[]): Lesson[] {
  return [...lessons].sort((a, b) => a.sprint - b.sprint);
}
