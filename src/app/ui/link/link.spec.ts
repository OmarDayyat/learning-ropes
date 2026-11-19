import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { Link } from './link';

@Component({
  imports: [Link, RouterLink],
  template: `
    <a id="bare" uiLink href="https://example.com">Bare</a>
    <a id="inline" uiLink="inline" href="https://example.com">Inline</a>
    <a id="standalone" uiLink="standalone" routerLink="/lessons" class="text-sm">Standalone</a>
  `,
})
class TestHost {}

describe('Link', () => {
  let page: HTMLElement;

  function link(id: string): HTMLAnchorElement {
    return page.querySelector(`#${id}`) as HTMLAnchorElement;
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    page = fixture.nativeElement as HTMLElement;
  });

  it('should give every link the emerald colour, hover colour and focus ring', () => {
    for (const id of ['bare', 'inline', 'standalone']) {
      expect(Array.from(link(id).classList)).toEqual(
        expect.arrayContaining([
          'rounded-sm',
          'text-emerald-700',
          'font-medium',
          'hover:text-emerald-800',
          'focus-ring',
        ]),
      );
    }
  });

  it('should underline an inline link all the time', () => {
    const classes = Array.from(link('inline').classList);
    expect(classes).toEqual(expect.arrayContaining(['underline', 'underline-offset-2']));
    expect(classes).not.toContain('hover:underline');
  });

  it('should treat a bare uiLink as inline', () => {
    expect(Array.from(link('bare').classList).sort()).toEqual(
      Array.from(link('inline').classList).sort(),
    );
  });

  it('should underline a standalone link only on hover', () => {
    const classes = Array.from(link('standalone').classList);
    expect(classes).toContain('hover:underline');
    expect(classes).not.toContain('underline');
  });

  it('should keep the classes written on the <a> itself', () => {
    expect(link('standalone').classList).toContain('text-sm');
  });

  it('should stay a real link', () => {
    expect(link('bare').getAttribute('href')).toBe('https://example.com');
    expect(link('standalone').getAttribute('href')).toBe('/lessons');
  });
});
