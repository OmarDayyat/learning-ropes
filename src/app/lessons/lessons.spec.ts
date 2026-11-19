import { findLesson, LESSONS, sortLessons } from './lessons';
import { SAMPLE_LESSON, SAMPLE_LESSONS } from './testing/sample-lesson';

describe('lessons', () => {
  it('should give every lesson a unique slug', () => {
    const slugs = LESSONS.map((lesson) => lesson.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('should find a lesson by its slug', () => {
    expect(findLesson('sample', SAMPLE_LESSONS)).toBe(SAMPLE_LESSON);
  });

  it('should return undefined for an unknown slug', () => {
    expect(findLesson('no-such-lesson', SAMPLE_LESSONS)).toBeUndefined();
    expect(findLesson('no-such-lesson')).toBeUndefined();
  });

  it('should sort by sprint and keep the array order inside a sprint', () => {
    const slugs = sortLessons(SAMPLE_LESSONS).map((lesson) => lesson.slug);
    expect(slugs).toEqual(['sample', 'review', 'later']);
  });

  it('should not change the list it sorts', () => {
    const before = SAMPLE_LESSONS.map((lesson) => lesson.slug);
    sortLessons(SAMPLE_LESSONS);
    expect(SAMPLE_LESSONS.map((lesson) => lesson.slug)).toEqual(before);
  });
});
