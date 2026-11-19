import { TestBed } from '@angular/core/testing';
import { Level, Status } from '../../lessons/lesson.model';
import { Badge } from './badge';

async function render(inputs: { level?: Level; status?: Status }): Promise<HTMLElement> {
  const fixture = TestBed.createComponent(Badge);
  for (const [name, value] of Object.entries(inputs)) {
    fixture.componentRef.setInput(name, value);
  }
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('Badge', () => {
  it('should give every badge the same pill shape and text size', async () => {
    const badge = await render({ level: 'Starter' });
    expect(Array.from(badge.classList)).toEqual(
      expect.arrayContaining(['rounded-full', 'text-xs', 'font-semibold', 'px-2.5', 'py-0.5']),
    );
  });

  describe('with a level', () => {
    it.each([
      ['Starter', ['bg-emerald-100', 'text-emerald-800']],
      ['Beginner', ['bg-sky-100', 'text-sky-800']],
      ['Intermediate', ['bg-amber-100', 'text-amber-900']],
    ] as const)('should show %s in its own colours', async (level, colors) => {
      const badge = await render({ level });
      expect(badge.textContent?.trim()).toBe(level);
      expect(Array.from(badge.classList)).toEqual(expect.arrayContaining([...colors]));
    });
  });

  describe('with a status', () => {
    it.each([
      ['done', 'Done', ['bg-emerald-50', 'text-emerald-700']],
      ['current', 'Current', ['bg-violet-100', 'text-violet-800']],
      ['upcoming', 'Coming up', ['bg-slate-100', 'text-slate-600']],
    ] as const)('should show %s as "%s" in its own colours', async (status, label, colors) => {
      const badge = await render({ status });
      expect(badge.textContent?.trim()).toBe(label);
      expect(Array.from(badge.classList)).toEqual(expect.arrayContaining([...colors]));
    });
  });

  it('should have no other classes', async () => {
    const badge = await render({ status: 'current' });
    expect(Array.from(badge.classList).sort()).toEqual(
      'rounded-full bg-violet-100 text-violet-800 text-xs font-semibold px-2.5 py-0.5'
        .split(' ')
        .sort(),
    );
  });
});
