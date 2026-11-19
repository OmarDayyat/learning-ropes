import { TestBed } from '@angular/core/testing';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooter],
    }).compileComponents();

    const fixture = TestBed.createComponent(SiteFooter);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should show the site name and the current year', () => {
    const text = compiled.querySelector('footer')?.textContent;
    expect(text).toContain('Learning Ropes');
    expect(text).toContain(String(new Date().getFullYear()));
  });

  it('should say who built the site', () => {
    expect(compiled.textContent).toContain('Built by one human and a team of Claude agents.');
  });

  it('should link to the GitHub repo in a new tab', () => {
    const link = compiled.querySelector<HTMLAnchorElement>(
      'a[href="https://github.com/OmarDayyat/learning-ropes"]',
    );
    expect(link).not.toBeNull();
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toContain('noopener');
  });
});
