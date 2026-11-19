import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Lesson } from '../lesson.model';
import { ALL_LESSONS } from '../lessons';
import { SAMPLE_LESSONS } from '../testing/sample-lesson';
import { LessonList } from './lesson-list';

async function render(lessons: Lesson[]): Promise<HTMLElement> {
  TestBed.configureTestingModule({
    imports: [LessonList],
    providers: [provideRouter([]), { provide: ALL_LESSONS, useValue: lessons }],
  });
  const fixture = TestBed.createComponent(LessonList);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('LessonList', () => {
  it('should show the heading', async () => {
    const page = await render(SAMPLE_LESSONS);
    expect(page.querySelector('h1')?.textContent).toContain('Lessons');
  });

  it('should show a friendly message when there are no lessons', async () => {
    const page = await render([]);
    expect(page.textContent).toContain('Lessons appear here as the team finishes each sprint.');
    expect(page.querySelectorAll('a').length).toBe(0);
  });

  it('should show one card per lesson, sorted by sprint', async () => {
    const page = await render(SAMPLE_LESSONS);
    const titles = Array.from(page.querySelectorAll('h2')).map((h) => h.textContent?.trim());
    expect(titles).toEqual([
      'Make your first branch',
      'Review a pull request',
      'Open a pull request',
    ]);
  });

  it('should link each card to its lesson page', async () => {
    const page = await render(SAMPLE_LESSONS);
    const hrefs = Array.from(page.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/lessons/sample', '/lessons/review', '/lessons/later']);
  });

  it('should show the sprint, level, status, summary and skills on a card', async () => {
    const page = await render(SAMPLE_LESSONS);
    const card = page.querySelector('a[href="/lessons/sample"]')!;
    const text = card.textContent ?? '';
    expect(text).toContain('Sprint 1');
    expect(text).toContain('Starter');
    expect(text).toContain('Current');
    expect(text).toContain('Create a branch, commit a change and see it on GitHub.');
    const skills = Array.from(card.querySelectorAll('li')).map((li) => li.textContent?.trim());
    expect(skills).toEqual(['git branch', 'git commit']);
  });

  it('should label statuses as Done, Current and Coming up', async () => {
    const page = await render(SAMPLE_LESSONS);
    expect(page.querySelector('a[href="/lessons/review"]')?.textContent).toContain('Done');
    expect(page.querySelector('a[href="/lessons/later"]')?.textContent).toContain('Coming up');
  });

  it('should mute upcoming lessons but keep them clickable', async () => {
    const page = await render(SAMPLE_LESSONS);
    const upcoming = page.querySelector('a[href="/lessons/later"]')!;
    const current = page.querySelector('a[href="/lessons/sample"]')!;
    expect(upcoming.classList).toContain('border-dashed');
    expect(current.classList).not.toContain('border-dashed');
  });
});
