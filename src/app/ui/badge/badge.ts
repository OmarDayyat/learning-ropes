import { Component, computed, input } from '@angular/core';
import { Level, Status } from '../../lessons/lesson.model';

// Full class names (not built from pieces) so Tailwind can find them in this file.
const LEVEL_COLORS: Record<Level, string> = {
  Starter: 'bg-emerald-100 text-emerald-800',
  Beginner: 'bg-sky-100 text-sky-800',
  Intermediate: 'bg-amber-100 text-amber-900',
};

const STATUS_BADGES: Record<Status, { label: string; colors: string }> = {
  done: { label: 'Done', colors: 'bg-emerald-50 text-emerald-700' },
  current: { label: 'Current', colors: 'bg-violet-100 text-violet-800' },
  upcoming: { label: 'Coming up', colors: 'bg-slate-100 text-slate-600' },
};

/**
 * A small rounded label for a lesson's level or a sprint's status.
 * Give it exactly one input:
 *
 *   <ui-badge [level]="lesson.level" />    → "Starter", "Beginner" or "Intermediate"
 *   <ui-badge [status]="lesson.status" />  → "Done", "Current" or "Coming up"
 *
 * The badge owns every colour and label, so Home and Lessons always match.
 */
@Component({
  selector: 'ui-badge',
  template: '{{ label() }}',
  host: { '[class]': 'classes()' },
})
export class Badge {
  readonly level = input<Level>();
  readonly status = input<Status>();

  protected readonly label = computed(() => {
    const status = this.status();
    return status ? STATUS_BADGES[status].label : (this.level() ?? '');
  });

  protected readonly classes = computed(() => {
    const status = this.status();
    const level = this.level();
    const colors = status ? STATUS_BADGES[status].colors : level ? LEVEL_COLORS[level] : '';
    // The colours sit between the shape and the text size, to keep the class order
    // from CONTRIBUTING.md section 7: border and corners, background, text, spacing.
    return `rounded-full ${colors} text-xs font-semibold px-2.5 py-0.5`;
  });
}
