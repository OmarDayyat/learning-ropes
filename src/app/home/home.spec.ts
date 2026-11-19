import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the site name', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('Learning Ropes');
  });

  it('should show one sentence about the project', () => {
    expect(compiled.querySelector('p')?.textContent).toContain(
      'A website about learning Git and GitHub as part of a team, built while learning it.',
    );
  });

  it('should not have its own <main>, because the app shell provides it', () => {
    expect(compiled.querySelector('main')).toBeNull();
  });

  describe('learning path', () => {
    it('should show a "Learning path" heading', () => {
      expect(compiled.querySelector('h2')?.textContent).toContain('Learning path');
    });

    it('should list the 7 sprints in order', () => {
      const items = compiled.querySelectorAll('ol > li');
      expect(items.length).toBe(7);
      expect(items[0].textContent).toContain('Setup and first review');
      expect(items[6].textContent).toContain('Fixing mistakes');
    });

    it('should mark exactly one sprint as Current', () => {
      const badges = Array.from(compiled.querySelectorAll('ol > li ui-badge'));
      const current = badges.filter((badge) => badge.textContent?.trim() === 'Current');
      expect(current.length).toBe(1);
      expect(compiled.querySelector('li[aria-current="step"]')?.textContent).toContain(
        'Your first pull request',
      );
    });

    it('should link to the lessons page', () => {
      const link = compiled.querySelector<HTMLAnchorElement>('a[href="/lessons"]');
      expect(link?.textContent).toContain('Browse the lessons');
    });
  });
});
