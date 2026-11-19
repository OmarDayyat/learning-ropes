import { Component, computed, ElementRef, inject, input } from '@angular/core';

/**
 * - `default`: white box with a light grey border.
 * - `muted`: dashed border on a light grey background, for things that aren't ready yet.
 * - `highlighted`: violet border, for the one thing happening now (like the current sprint).
 */
export type CardVariant = 'default' | 'muted' | 'highlighted';

// Full class names (not built from pieces) so Tailwind can find them in this file.
const FRAME_CLASSES: Record<CardVariant, string> = {
  default: 'border border-slate-200 rounded-xl bg-white',
  muted: 'border border-dashed border-slate-200 rounded-xl bg-slate-50',
  highlighted: 'border border-violet-300 rounded-xl bg-white',
};

/** Extra classes when the whole card is a link: it lights up on hover and keyboard focus. */
const LINK_CLASSES = 'transition hover:border-emerald-600 hover:shadow-sm focus-ring';

/**
 * The bordered, rounded box used for lesson cards and the Home learning path.
 * It draws only the frame (border, corners, background). The page adds its own layout
 * and padding classes, because those differ from place to place.
 *
 * Use it as an attribute, so the HTML stays meaningful:
 *
 *   <li uiCard class="p-4">...</li>
 *   <a uiCard variant="muted" routerLink="/lessons/setup" class="p-5">...</a>
 *
 * On an `<a>` the whole card is the link, and it also gets the hover and focus styles.
 * `<ui-card>` works too, for a card with no better HTML element.
 */
@Component({
  selector: 'ui-card, [uiCard]',
  template: '<ng-content />',
  host: { '[class]': 'classes()' },
})
export class Card {
  readonly variant = input<CardVariant>('default');

  private readonly tagName = (inject(ElementRef).nativeElement as HTMLElement).tagName;

  protected readonly classes = computed(() => {
    const classes = [FRAME_CLASSES[this.variant()]];
    if (this.tagName === 'UI-CARD') {
      // A custom element is inline by default. `block` is a layout class, so it goes first.
      classes.unshift('block');
    }
    if (this.tagName === 'A') {
      classes.push(LINK_CLASSES);
    }
    return classes.join(' ');
  });
}
