import { computed, Directive, input } from '@angular/core';

/**
 * - `inline`: always underlined. For links inside or next to other text. The default.
 * - `standalone`: underlined only on hover. For a link on its own line, like "← All lessons".
 */
export type LinkVariant = 'inline' | 'standalone';

// Full class strings (not built from pieces) so Tailwind can find them in this file.
const LINK_CLASSES: Record<LinkVariant, string> = {
  inline:
    'rounded-sm text-emerald-700 font-medium underline underline-offset-2 hover:text-emerald-800 focus-ring',
  standalone:
    'rounded-sm text-emerald-700 font-medium hover:text-emerald-800 hover:underline focus-ring',
};

/**
 * The emerald text-link style. Add it to a normal `<a>`, so the link stays a real link
 * (with `href` or `routerLink`) and only gets the classes:
 *
 *   <a uiLink [href]="url">PR #4</a>                          → inline (underlined)
 *   <a uiLink="standalone" routerLink="/lessons">All lessons</a>  → underlined on hover
 *
 * Size and spacing classes (like `text-sm` or `mt-6`) still go on the `<a>` itself.
 */
@Directive({
  selector: 'a[uiLink]',
  host: { '[class]': 'classes()' },
})
export class Link {
  /** The style. A bare `uiLink` attribute (an empty string) means `inline`. */
  readonly uiLink = input<LinkVariant | ''>('');

  protected readonly classes = computed(() => LINK_CLASSES[this.uiLink() || 'inline']);
}
