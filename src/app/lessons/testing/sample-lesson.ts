import { Lesson } from '../lesson.model';

// Sample lessons for tests only. The app never imports this file, so it is not in the built site.

export const SAMPLE_LESSON: Lesson = {
  slug: 'sample',
  sprint: 1,
  title: 'Make your first branch',
  level: 'Starter',
  status: 'current',
  skills: ['git branch', 'git commit'],
  summary: 'Create a branch, commit a change and see it on GitHub.',
  brief: 'You will make a branch, change one file and commit it.',
  learn: ['What a branch is', 'How to write a commit message'],
  steps: [
    {
      title: 'Create a branch',
      why: 'A branch keeps your work away from main until it is reviewed.',
      vscode: [
        'Click the branch name in the bottom-left corner.',
        'Choose Create new branch from..., then pick main.',
      ],
      commands: [
        { cmd: 'git switch -c feat/1-sample', explain: 'Makes the branch and moves to it.' },
      ],
    },
    {
      title: 'Commit your change',
      why: 'A commit saves a snapshot of your work with a message.',
      vscode: ['Open Source Control.', 'Type a message and click Commit.'],
      commands: [
        { cmd: 'git add .', explain: 'Stages every changed file.' },
        { cmd: 'git commit -m "docs: fix typo"', explain: 'Saves the snapshot.' },
      ],
    },
  ],
  inOurRepo: [
    {
      label: 'PR #4: Angular scaffold',
      url: 'https://github.com/OmarDayyat/learning-ropes/pull/4',
    },
  ],
  feedback: ['Keep the first line of a commit message short.'],
  mistakes: ['Committing straight to main.'],
  checklist: ['I can make a branch from main.', 'I can write a commit message.'],
};

export const SAMPLE_LESSONS: Lesson[] = [
  { ...SAMPLE_LESSON, slug: 'later', sprint: 2, title: 'Open a pull request', status: 'upcoming' },
  SAMPLE_LESSON,
  {
    ...SAMPLE_LESSON,
    slug: 'review',
    sprint: 1,
    title: 'Review a pull request',
    level: 'Beginner',
    status: 'done',
  },
];
