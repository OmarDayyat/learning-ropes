import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ALL_LESSONS } from '../lessons';
import { SAMPLE_LESSONS } from '../testing/sample-lesson';
import { LessonPage } from './lesson-page';

describe('LessonPage', () => {
  let fixture: ComponentFixture<LessonPage>;
  let page: HTMLElement;

  async function render(slug: string): Promise<void> {
    fixture = TestBed.createComponent(LessonPage);
    fixture.componentRef.setInput('slug', slug);
    await fixture.whenStable();
    page = fixture.nativeElement as HTMLElement;
  }

  /** The two tab buttons of one step: [VS Code, Command line]. */
  function tabs(stepNumber: number): HTMLButtonElement[] {
    return Array.from(page.querySelectorAll(`[id^="step-${stepNumber}-tab-"]`));
  }

  function byId(id: string): HTMLElement {
    return page.querySelector(`#${id}`) as HTMLElement;
  }

  function press(element: HTMLElement, key: string): Promise<void> {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    return fixture.whenStable();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LessonPage],
      providers: [provideRouter([]), { provide: ALL_LESSONS, useValue: SAMPLE_LESSONS }],
    });
  });

  describe('with a known slug', () => {
    beforeEach(() => render('sample'));

    it('should not have its own <main> (the layout in app.html provides it)', () => {
      expect(page.querySelector('main')).toBeNull();
    });

    it('should show one h1 with the lesson title', () => {
      const headings = page.querySelectorAll('h1');
      expect(headings.length).toBe(1);
      expect(headings[0].textContent).toContain('Make your first branch');
    });

    it('should show the sprint, level, status and summary in the header', () => {
      const header = page.querySelector('header')?.textContent ?? '';
      expect(header).toContain('Sprint 1');
      expect(header).toContain('Starter');
      expect(header).toContain('Current');
      expect(header).toContain('Create a branch, commit a change and see it on GitHub.');
    });

    it('should show the 7 sections in order, with their ids and headings', () => {
      const sections = Array.from(page.querySelectorAll('section'));
      expect(sections.map((s) => s.id)).toEqual([
        'brief',
        'learn',
        'steps',
        'in-our-repo',
        'feedback',
        'mistakes',
        'check',
      ]);
      expect(sections.map((s) => s.querySelector('h2')?.textContent?.trim())).toEqual([
        'Brief',
        "What you'll learn",
        'Steps',
        'In our repo',
        'Feedback',
        'Common mistakes',
        'Check yourself',
      ]);
    });

    it('should link to every section from the "On this page" list', () => {
      const links = Array.from(page.querySelectorAll('nav[aria-label="On this page"] a'));
      expect(links.map((a) => a.getAttribute('href'))).toEqual([
        '/lessons/sample#brief',
        '/lessons/sample#learn',
        '/lessons/sample#steps',
        '/lessons/sample#in-our-repo',
        '/lessons/sample#feedback',
        '/lessons/sample#mistakes',
        '/lessons/sample#check',
      ]);
    });

    it('should show the steps as a numbered list with title and why', () => {
      const steps = page.querySelectorAll('#steps > ol > li');
      expect(steps.length).toBe(2);
      expect(steps[0].querySelector('h3')?.textContent).toContain('Create a branch');
      expect(steps[0].textContent).toContain('A branch keeps your work away from main');
      expect(steps[1].querySelector('span')?.textContent?.trim()).toBe('2');
    });

    it('should open repo links in a new tab', () => {
      const link = page.querySelector('#in-our-repo a')!;
      expect(link.getAttribute('href')).toBe('https://github.com/OmarDayyat/learning-ropes/pull/4');
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener');
      expect(link.textContent).toContain('PR #4: Angular scaffold');
    });

    it('should show feedback, common mistakes and the checklist', () => {
      expect(byId('feedback').textContent).toContain('Keep the first line');
      expect(byId('mistakes').textContent).toContain('Committing straight to main.');
      expect(byId('check').querySelectorAll('li').length).toBe(2);
    });
  });

  describe('step tabs', () => {
    beforeEach(() => render('sample'));

    it('should give each step a tablist with VS Code and Command line tabs', () => {
      expect(page.querySelectorAll('[role="tablist"]').length).toBe(2);
      expect(tabs(1).map((t) => t.textContent?.trim())).toEqual(['VS Code', 'Command line']);
      expect(tabs(1).every((t) => t.getAttribute('role') === 'tab')).toBe(true);
    });

    it('should use unique ids that link each tab to its panel', () => {
      const ids = Array.from(page.querySelectorAll('[id]')).map((el) => el.id);
      expect(new Set(ids).size).toBe(ids.length);

      for (const tab of [...tabs(1), ...tabs(2)]) {
        const panel = byId(tab.getAttribute('aria-controls')!);
        expect(panel.getAttribute('role')).toBe('tabpanel');
        expect(panel.getAttribute('aria-labelledby')).toBe(tab.id);
      }
    });

    it('should start on the VS Code tab', () => {
      const [vscode, cli] = tabs(1);
      expect(vscode.getAttribute('aria-selected')).toBe('true');
      expect(cli.getAttribute('aria-selected')).toBe('false');
      expect(vscode.tabIndex).toBe(0);
      expect(cli.tabIndex).toBe(-1);
      expect(byId('step-1-panel-vscode').hidden).toBe(false);
      expect(byId('step-1-panel-cli').hidden).toBe(true);
      expect(byId('step-1-panel-vscode').querySelectorAll('ol > li').length).toBe(2);
    });

    it('should switch tabs on click, for that step only', async () => {
      tabs(1)[1].click();
      await fixture.whenStable();

      expect(tabs(1)[1].getAttribute('aria-selected')).toBe('true');
      expect(byId('step-1-panel-cli').hidden).toBe(false);
      expect(byId('step-1-panel-vscode').hidden).toBe(true);
      expect(tabs(2)[0].getAttribute('aria-selected')).toBe('true');
      expect(byId('step-2-panel-cli').hidden).toBe(true);
    });

    it('should show each command in a code block with its explanation', async () => {
      tabs(2)[1].click();
      await fixture.whenStable();

      const panel = byId('step-2-panel-cli');
      const commands = Array.from(panel.querySelectorAll('pre code')).map((c) => c.textContent);
      expect(commands).toEqual(['git add .', 'git commit -m "docs: fix typo"']);
      expect(panel.textContent).toContain('Stages every changed file.');
    });

    it('should move between tabs with the Left and Right arrow keys', async () => {
      const [vscode, cli] = tabs(1);
      vscode.focus();

      await press(vscode, 'ArrowRight');
      expect(cli.getAttribute('aria-selected')).toBe('true');
      expect(document.activeElement).toBe(cli);

      await press(cli, 'ArrowLeft');
      expect(vscode.getAttribute('aria-selected')).toBe('true');
      expect(document.activeElement).toBe(vscode);

      // From the first tab, Left wraps around to the last one.
      await press(vscode, 'ArrowLeft');
      expect(cli.getAttribute('aria-selected')).toBe('true');
    });
  });

  describe('with an unknown slug', () => {
    beforeEach(() => render('no-such-lesson'));

    it('should say the lesson was not found', () => {
      expect(page.querySelector('h1')?.textContent).toContain('Lesson not found');
      expect(page.querySelectorAll('section').length).toBe(0);
      expect(page.querySelector('main')).toBeNull();
    });

    it('should link back to the lessons list', () => {
      const link = page.querySelector('a')!;
      expect(link.getAttribute('href')).toBe('/lessons');
      expect(link.textContent).toContain('Back to all lessons');
    });
  });
});
