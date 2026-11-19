export type Level = 'Starter' | 'Beginner' | 'Intermediate';
export type Status = 'done' | 'current' | 'upcoming';

export interface Lesson {
  slug: string; // 'setup' → /lessons/setup
  sprint: number;
  title: string;
  level: Level;
  status: Status;
  skills: string[]; // tags on the card
  summary: string; // one line on the card
  brief: string;
  learn: string[];
  steps: LessonStep[];
  inOurRepo: RepoLink[]; // real Issues, PRs, commits
  feedback: string[];
  mistakes: string[];
  checklist: string[];
}

export interface LessonStep {
  title: string;
  why: string;
  vscode: string[]; // click by click
  commands: { cmd: string; explain: string }[];
}

export interface RepoLink {
  label: string; // 'PR #4: Angular scaffold'
  url: string;
}
