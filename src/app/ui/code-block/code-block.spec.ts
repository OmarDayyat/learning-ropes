import { TestBed } from '@angular/core/testing';
import { CodeBlock } from './code-block';

async function render(inputs: { code: string; explain?: string }): Promise<HTMLElement> {
  const fixture = TestBed.createComponent(CodeBlock);
  for (const [name, value] of Object.entries(inputs)) {
    fixture.componentRef.setInput(name, value);
  }
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('CodeBlock', () => {
  it('should show the code exactly as given, inside <pre><code>', async () => {
    const block = await render({ code: 'git commit -m "docs: fix typo"' });
    expect(block.querySelector('pre > code')?.textContent).toBe('git commit -m "docs: fix typo"');
  });

  it('should keep line breaks in multi-line code', async () => {
    const block = await render({ code: 'git add .\ngit commit' });
    expect(block.querySelector('pre > code')?.textContent).toBe('git add .\ngit commit');
  });

  it('should draw the dark box that scrolls sideways', async () => {
    const pre = (await render({ code: 'git status' })).querySelector('pre')!;
    expect(pre.className).toBe(
      'overflow-x-auto rounded-lg bg-slate-900 text-slate-100 text-sm font-mono p-4',
    );
  });

  it('should show the explanation under the box when there is one', async () => {
    const block = await render({ code: 'git add .', explain: 'Stages every changed file.' });
    const explain = block.querySelector('pre + p');
    expect(explain?.textContent).toBe('Stages every changed file.');
    expect(explain?.className).toBe('text-slate-600 text-sm mt-2');
  });

  it('should leave the explanation out when there is none', async () => {
    const block = await render({ code: 'git add .' });
    expect(block.querySelector('p')).toBeNull();
  });
});
