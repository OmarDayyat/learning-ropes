import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { Card, CardVariant } from './card';

@Component({
  imports: [Card, RouterLink],
  template: `
    <ul>
      <li uiCard [variant]="variant()" class="flex p-4">Item card</li>
    </ul>
    <a uiCard [variant]="variant()" routerLink="/lessons/setup" class="flex flex-col p-5">
      <h2>Link card</h2>
    </a>
    <ui-card>Plain card</ui-card>
  `,
})
class TestHost {
  readonly variant = signal<CardVariant>('default');
}

describe('Card', () => {
  let fixture: ComponentFixture<TestHost>;
  let page: HTMLElement;

  function card(selector: string): HTMLElement {
    return page.querySelector(selector) as HTMLElement;
  }

  function classesOf(selector: string): string[] {
    return Array.from(card(selector).classList);
  }

  async function setVariant(variant: CardVariant): Promise<void> {
    fixture.componentInstance.variant.set(variant);
    await fixture.whenStable();
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    page = fixture.nativeElement as HTMLElement;
  });

  it('should project its content', () => {
    expect(card('li').textContent).toContain('Item card');
    expect(card('a h2').textContent).toContain('Link card');
    expect(card('ui-card').textContent).toContain('Plain card');
  });

  it('should draw a white box with a grey border and round corners by default', () => {
    expect(classesOf('li')).toEqual(
      expect.arrayContaining(['border', 'border-slate-200', 'rounded-xl', 'bg-white']),
    );
    expect(classesOf('li')).not.toContain('border-dashed');
  });

  it('should keep the layout and padding classes the page adds', () => {
    expect(classesOf('li')).toEqual(expect.arrayContaining(['flex', 'p-4']));
    expect(classesOf('a')).toEqual(expect.arrayContaining(['flex', 'flex-col', 'p-5']));
  });

  it('should look dashed and grey when muted', async () => {
    await setVariant('muted');
    expect(classesOf('li')).toEqual(
      expect.arrayContaining(['border', 'border-dashed', 'border-slate-200', 'rounded-xl']),
    );
    expect(classesOf('li')).toContain('bg-slate-50');
    expect(classesOf('li')).not.toContain('bg-white');
  });

  it('should get a violet border when highlighted', async () => {
    await setVariant('highlighted');
    expect(classesOf('li')).toContain('border-violet-300');
    expect(classesOf('li')).not.toContain('border-slate-200');
    expect(classesOf('li')).toContain('bg-white');
  });

  it('should stay a real link when used on an <a>', () => {
    const link = card('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/lessons/setup');
  });

  it('should add hover and focus styles only when the card is a link', () => {
    const linkStyles = ['transition', 'hover:border-emerald-600', 'hover:shadow-sm', 'focus-ring'];
    expect(classesOf('a')).toEqual(expect.arrayContaining(linkStyles));
    expect(classesOf('li')).not.toContain('focus-ring');
    expect(classesOf('ui-card')).not.toContain('focus-ring');
  });

  it('should keep the hover and focus styles on a muted link card', async () => {
    await setVariant('muted');
    expect(classesOf('a')).toEqual(expect.arrayContaining(['border-dashed', 'focus-ring']));
  });

  it('should make <ui-card> a block, because a custom element is inline by default', () => {
    expect(classesOf('ui-card')).toContain('block');
    expect(classesOf('li')).not.toContain('block');
  });
});
