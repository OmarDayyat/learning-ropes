import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ALL_LESSONS, findLesson } from './lessons';

/** Route title for /lessons/:slug: the lesson's title, or the site name if there is no such lesson. */
export const lessonTitle: ResolveFn<string> = (route) =>
  findLesson(route.paramMap.get('slug') ?? '', inject(ALL_LESSONS))?.title ?? 'Learning Ropes';
