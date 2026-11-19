import { Level, Status } from './lesson.model';

// Full class strings (not built from pieces) so Tailwind can find them in this file.
// Margin and padding classes go last (CONTRIBUTING.md, section 7).

const LEVEL_CLASSES: Record<Level, string> = {
  Starter: 'rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5',
  Beginner: 'rounded-full bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-0.5',
  Intermediate: 'rounded-full bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-0.5',
};

const STATUS_BADGES: Record<Status, { label: string; classes: string }> = {
  done: {
    label: 'Done',
    classes: 'rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5',
  },
  current: {
    label: 'Current',
    classes: 'rounded-full bg-violet-100 text-violet-800 text-xs font-semibold px-2.5 py-0.5',
  },
  upcoming: {
    label: 'Coming up',
    classes: 'rounded-full bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-0.5',
  },
};

export function levelBadgeClasses(level: Level): string {
  return LEVEL_CLASSES[level];
}

export function statusLabel(status: Status): string {
  return STATUS_BADGES[status].label;
}

export function statusBadgeClasses(status: Status): string {
  return STATUS_BADGES[status].classes;
}
