import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
import { LessonList } from './lesson-list/lesson-list';
import { LessonPage } from './lesson-page/lesson-page';
import { ALL_LESSONS } from './lessons';
import { SAMPLE_LESSONS } from './testing/sample-lesson';

describe('lesson routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        { provide: ALL_LESSONS, useValue: SAMPLE_LESSONS },
      ],
    });
    harness = await RouterTestingHarness.create();
  });

  it('should show the lesson list at /lessons', async () => {
    await harness.navigateByUrl('/lessons', LessonList);
    expect(TestBed.inject(Title).getTitle()).toBe('Lessons');
  });

  it('should pass the slug from the URL to the lesson page', async () => {
    await harness.navigateByUrl('/lessons/sample', LessonPage);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Make your first branch',
    );
  });

  it('should use the lesson title as the browser tab title', async () => {
    await harness.navigateByUrl('/lessons/review', LessonPage);
    expect(TestBed.inject(Title).getTitle()).toBe('Review a pull request');
  });

  it('should fall back to the site name for an unknown lesson', async () => {
    await harness.navigateByUrl('/lessons/no-such-lesson', LessonPage);
    expect(TestBed.inject(Title).getTitle()).toBe('Learning Ropes');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Lesson not found',
    );
  });
});
