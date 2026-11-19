import { Status } from '../lessons/lesson.model';

export interface LearningPathStep {
  sprint: number;
  skill: string;
  description: string;
  status: Status;
}

export const LEARNING_PATH: readonly LearningPathStep[] = [
  {
    sprint: 0,
    skill: 'Setup and first review',
    description: 'Accounts, tools, the repo and your first code review.',
    status: 'done',
  },
  {
    sprint: 1,
    skill: 'Your first pull request',
    description: 'Branch, commit, push and open a PR that closes an Issue.',
    status: 'current',
  },
  {
    sprint: 2,
    skill: 'Answer a code review',
    description: 'Fix review comments with new commits.',
    status: 'upcoming',
  },
  {
    sprint: 3,
    skill: 'Merge conflicts',
    description: 'Two people changed the same lines. Decide what stays.',
    status: 'upcoming',
  },
  {
    sprint: 4,
    skill: 'Clean history',
    description: 'Rebase, squash and stash.',
    status: 'upcoming',
  },
  {
    sprint: 5,
    skill: 'CI with GitHub Actions',
    description: 'Tests run on every PR, and a red check blocks the merge.',
    status: 'upcoming',
  },
  {
    sprint: 6,
    skill: 'Fixing mistakes',
    description: 'Revert, cherry-pick and bisect.',
    status: 'upcoming',
  },
];
