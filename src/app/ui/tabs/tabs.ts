import {
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
  signal,
  viewChildren,
} from '@angular/core';

/** Counts <ui-tabs> on the page, so every tab and panel gets its own id. */
let nextTabsId = 0;

/**
 * Accessible tabs. Put one <ui-tab> inside for each tab:
 *
 *   <ui-tabs label="Ways to do step 1">
 *     <ui-tab label="VS Code">...</ui-tab>
 *     <ui-tab label="Command line">...</ui-tab>
 *   </ui-tabs>
 *
 * Follows the WAI-ARIA tabs pattern: the tab buttons are a `tablist`, each <ui-tab> is a
 * `tabpanel`, and only the selected tab is in the Tab order. Left and Right arrows (and Home
 * and End) move between tabs.
 */
@Component({
  selector: 'ui-tabs',
  templateUrl: './tabs.html',
  host: { class: 'block' },
})
export class Tabs {
  /** Read out by screen readers as the name of the tab list. */
  readonly label = input.required<string>();

  readonly tabs = contentChildren(Tab);
  readonly selected = signal(0);

  private readonly baseId = `ui-tabs-${nextTabsId++}`;
  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  tabId(index: number): string {
    return `${this.baseId}-tab-${index}`;
  }

  panelId(index: number): string {
    return `${this.baseId}-panel-${index}`;
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const last = this.tabs().length - 1;
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = index === last ? 0 : index + 1;
        break;
      case 'ArrowLeft':
        next = index === 0 ? last : index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.selected.set(next);
    this.tabButtons()[next].nativeElement.focus();
  }
}

/**
 * One tab inside <ui-tabs>. `label` is the text on the tab button.
 * The <ui-tab> element itself is the panel that shows the tab's content.
 */
@Component({
  selector: 'ui-tab',
  template: '<ng-content />',
  host: {
    role: 'tabpanel',
    tabindex: '0',
    class: 'block focus-ring pt-4',
    '[id]': 'tabs.panelId(index())',
    '[attr.aria-labelledby]': 'tabs.tabId(index())',
    '[hidden]': 'tabs.selected() !== index()',
  },
})
export class Tab {
  readonly label = input.required<string>();

  protected readonly tabs = inject(Tabs);
  protected readonly index = computed(() => this.tabs.tabs().indexOf(this));
}
