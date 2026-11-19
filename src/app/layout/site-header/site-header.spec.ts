import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SiteHeader } from './site-header';

// Stand-in pages so the router has somewhere to go in these tests.
// The real lesson routes live in app.routes.ts.
@Component({ template: '' })
class StubPage {}

describe('SiteHeader', () => {
  let compiled: HTMLElement;

  async function renderAt(url: string) {
    const fixture = TestBed.createComponent(SiteHeader);
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  }

  function navLink(label: string): HTMLAnchorElement | undefined {
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('nav a'));
    return links.find((link) => link.textContent?.trim() === label);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [
        provideRouter([
          { path: '', component: StubPage },
          { path: 'lessons', component: StubPage },
          { path: 'lessons/:slug', component: StubPage },
        ]),
      ],
    }).compileComponents();
  });

  it('should link the site name to the Home page', async () => {
    await renderAt('/');
    const siteName = compiled.querySelector<HTMLAnchorElement>('header > div > a');
    expect(siteName?.textContent).toContain('Learning Ropes');
    expect(siteName?.getAttribute('href')).toBe('/');
  });

  it('should have a main nav with Home and Lessons links', async () => {
    await renderAt('/');
    expect(compiled.querySelector('nav')?.getAttribute('aria-label')).toBe('Main');
    expect(navLink('Home')?.getAttribute('href')).toBe('/');
    expect(navLink('Lessons')?.getAttribute('href')).toBe('/lessons');
  });

  it('should mark Home as the current page on /', async () => {
    await renderAt('/');
    expect(navLink('Home')?.getAttribute('aria-current')).toBe('page');
    expect(navLink('Lessons')?.hasAttribute('aria-current')).toBe(false);
  });

  it('should mark only Lessons as the current page on /lessons', async () => {
    await renderAt('/lessons');
    expect(navLink('Lessons')?.getAttribute('aria-current')).toBe('page');
    expect(navLink('Home')?.hasAttribute('aria-current')).toBe(false);
  });

  it('should mark Lessons as current on a lesson page like /lessons/setup', async () => {
    await renderAt('/lessons/setup');
    expect(navLink('Lessons')?.getAttribute('aria-current')).toBe('page');
    expect(navLink('Home')?.hasAttribute('aria-current')).toBe(false);
  });
});
