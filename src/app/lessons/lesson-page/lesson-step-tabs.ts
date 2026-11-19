import { Component, ElementRef, input, signal, viewChildren } from '@angular/core';
import { LessonStep } from '../lesson.model';

type TabId = 'vscode' | 'cli';

/**
 * The "VS Code" and "Command line" tabs for one lesson step.
 * Follows the WAI-ARIA tabs pattern: Left and Right arrows (and Home and End) move between tabs.
 */
@Component({
  selector: 'app-lesson-step-tabs',
  templateUrl: './lesson-step-tabs.html',
})
export class LessonStepTabs {
  readonly step = input.required<LessonStep>();
  /** The step's number on the page (1, 2, 3...). Keeps the tab and panel ids unique. */
  readonly stepNumber = input.required<number>();

  protected readonly tabs: { id: TabId; label: string }[] = [
    { id: 'vscode', label: 'VS Code' },
    { id: 'cli', label: 'Command line' },
  ];
  protected readonly selected = signal<TabId>('vscode');

  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  protected tabId(tab: TabId): string {
    return `step-${this.stepNumber()}-tab-${tab}`;
  }

  protected panelId(tab: TabId): string {
    return `step-${this.stepNumber()}-panel-${tab}`;
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const last = this.tabs.length - 1;
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
    this.selected.set(this.tabs[next].id);
    this.tabButtons()[next].nativeElement.focus();
  }
}
