import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab, Tabs } from './tabs';

@Component({
  imports: [Tabs, Tab],
  template: `
    <ui-tabs label="Fruit">
      <ui-tab label="Apple">Apples are red.</ui-tab>
      <ui-tab label="Banana">Bananas are yellow.</ui-tab>
      <ui-tab label="Cherry">Cherries are small.</ui-tab>
    </ui-tabs>
    <ui-tabs label="Colours">
      <ui-tab label="Red">Red panel</ui-tab>
      <ui-tab label="Blue">Blue panel</ui-tab>
    </ui-tabs>
  `,
})
class TestHost {}

describe('Tabs', () => {
  let fixture: ComponentFixture<TestHost>;
  let page: HTMLElement;

  /** The tab buttons of the first or second <ui-tabs>. */
  function tabs(which = 0): HTMLButtonElement[] {
    const tabList = page.querySelectorAll('ui-tabs')[which];
    return Array.from(tabList.querySelectorAll('[role="tab"]'));
  }

  function panelOf(tab: HTMLElement): HTMLElement {
    return page.querySelector(`#${tab.getAttribute('aria-controls')}`) as HTMLElement;
  }

  function selectedLabel(which = 0): string | undefined {
    const selected = tabs(which).filter((t) => t.getAttribute('aria-selected') === 'true');
    expect(selected.length).toBe(1);
    return selected[0].textContent?.trim();
  }

  function press(element: HTMLElement, key: string): Promise<void> {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    return fixture.whenStable();
  }

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    page = fixture.nativeElement as HTMLElement;
  });

  it('should render one tablist with a button per tab, named by the label input', () => {
    const tabList = page.querySelector('ui-tabs [role="tablist"]')!;
    expect(tabList.getAttribute('aria-label')).toBe('Fruit');
    expect(tabs().map((t) => t.textContent?.trim())).toEqual(['Apple', 'Banana', 'Cherry']);
    expect(tabs().every((t) => t.getAttribute('type') === 'button')).toBe(true);
  });

  it('should make each <ui-tab> a tabpanel linked to its tab both ways', () => {
    for (const tab of tabs()) {
      const panel = panelOf(tab);
      expect(panel.tagName).toBe('UI-TAB');
      expect(panel.getAttribute('role')).toBe('tabpanel');
      expect(panel.getAttribute('aria-labelledby')).toBe(tab.id);
      expect(panel.getAttribute('tabindex')).toBe('0');
    }
  });

  it('should give every tab and panel an id that is unique on the page', () => {
    const ids = Array.from(page.querySelectorAll('[id]')).map((el) => el.id);
    expect(ids.length).toBe(10); // 5 tabs + 5 panels
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should start on the first tab, with only that tab in the Tab order', () => {
    const [apple, banana, cherry] = tabs();
    expect(selectedLabel()).toBe('Apple');
    expect([apple.tabIndex, banana.tabIndex, cherry.tabIndex]).toEqual([0, -1, -1]);
    expect(panelOf(apple).hidden).toBe(false);
    expect(panelOf(banana).hidden).toBe(true);
    expect(panelOf(cherry).hidden).toBe(true);
  });

  it('should switch tabs on click, in that tab list only', async () => {
    const banana = tabs()[1];
    banana.click();
    await fixture.whenStable();

    expect(selectedLabel()).toBe('Banana');
    expect(banana.tabIndex).toBe(0);
    expect(panelOf(banana).hidden).toBe(false);
    expect(panelOf(tabs()[0]).hidden).toBe(true);
    expect(selectedLabel(1)).toBe('Red');
  });

  it('should move with the Left and Right arrow keys, wrapping at both ends', async () => {
    const [apple, banana, cherry] = tabs();
    apple.focus();

    await press(apple, 'ArrowRight');
    expect(selectedLabel()).toBe('Banana');
    expect(document.activeElement).toBe(banana);

    await press(banana, 'ArrowLeft');
    expect(selectedLabel()).toBe('Apple');
    expect(document.activeElement).toBe(apple);

    await press(apple, 'ArrowLeft');
    expect(selectedLabel()).toBe('Cherry');
    expect(document.activeElement).toBe(cherry);

    await press(cherry, 'ArrowRight');
    expect(selectedLabel()).toBe('Apple');
    expect(document.activeElement).toBe(apple);
  });

  it('should jump to the first and last tab with Home and End', async () => {
    const [apple, , cherry] = tabs();
    apple.focus();

    await press(apple, 'End');
    expect(selectedLabel()).toBe('Cherry');
    expect(document.activeElement).toBe(cherry);

    await press(cherry, 'Home');
    expect(selectedLabel()).toBe('Apple');
    expect(document.activeElement).toBe(apple);
  });

  it('should ignore other keys', async () => {
    const [apple] = tabs();
    apple.focus();
    await press(apple, 'ArrowDown');
    expect(selectedLabel()).toBe('Apple');
    expect(document.activeElement).toBe(apple);
  });

  it('should style the selected tab emerald and the others slate', async () => {
    const [apple, banana] = tabs();
    expect(apple.classList).toContain('border-emerald-600');
    expect(apple.classList).toContain('text-emerald-800');
    expect(banana.classList).toContain('border-transparent');
    expect(banana.classList).toContain('text-slate-600');
    expect(apple.classList).toContain('focus-ring');
    expect(panelOf(apple).classList).toContain('focus-ring');
  });
});
