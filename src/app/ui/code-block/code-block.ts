import { Component, input } from '@angular/core';

/**
 * A dark box for a command or a piece of code, with an optional line that explains it.
 *
 *   <ui-code-block code="git status" explain="Shows which files changed." />
 *
 * Long lines scroll sideways instead of wrapping, so a command is never broken in two.
 */
@Component({
  selector: 'ui-code-block',
  templateUrl: './code-block.html',
  host: { class: 'block' },
})
export class CodeBlock {
  readonly code = input.required<string>();
  /** Optional. A short sentence under the box that says what the code does. */
  readonly explain = input<string>();
}
