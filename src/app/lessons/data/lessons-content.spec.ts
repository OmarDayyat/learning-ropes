import { LESSONS } from '../lessons';

// Checks the real lesson content, so a lesson with an empty section or a broken link fails the tests.

const REPO = 'https://github.com/OmarDayyat/learning-ropes/';

describe('Lesson content', () => {
  it('has the two Sprint 0 lessons first', () => {
    expect(LESSONS.slice(0, 2).map((lesson) => lesson.slug)).toEqual(['setup', 'first-review']);
  });

  it('uses a unique, URL-safe slug for every lesson', () => {
    const slugs = LESSONS.map((lesson) => lesson.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('is sorted by sprint', () => {
    const sprints = LESSONS.map((lesson) => lesson.sprint);
    expect(sprints).toEqual([...sprints].sort((a, b) => a - b));
  });

  for (const lesson of LESSONS) {
    describe(lesson.slug, () => {
      it('fills in every section', () => {
        expect(lesson.title.trim()).not.toBe('');
        expect(lesson.summary.trim()).not.toBe('');
        expect(lesson.brief.trim()).not.toBe('');
        expect(lesson.skills.length).toBeGreaterThan(0);
        expect(lesson.learn.length).toBeGreaterThan(0);
        expect(lesson.steps.length).toBeGreaterThan(0);
        expect(lesson.inOurRepo.length).toBeGreaterThan(0);
        expect(lesson.feedback.length).toBeGreaterThan(0);
        expect(lesson.mistakes.length).toBeGreaterThan(0);
        expect(lesson.checklist.length).toBeGreaterThan(0);
      });

      it('gives every step a VS Code way and a command line way', () => {
        for (const step of lesson.steps) {
          expect(step.why.trim(), step.title).not.toBe('');
          expect(step.vscode.length, step.title).toBeGreaterThan(0);
          expect(step.commands.length, step.title).toBeGreaterThan(0);
          for (const command of step.commands) {
            expect(command.cmd.trim(), step.title).not.toBe('');
            expect(command.explain.trim(), command.cmd).not.toBe('');
          }
        }
      });

      it('links only to this repo on GitHub', () => {
        for (const link of lesson.inOurRepo) {
          expect(link.url.startsWith(REPO), link.url).toBe(true);
        }
      });
    });
  }
});
