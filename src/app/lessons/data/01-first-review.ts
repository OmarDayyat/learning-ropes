import { Lesson } from '../lesson.model';

const REPO = 'https://github.com/OmarDayyat/learning-ropes';

export const FIRST_REVIEW_LESSON: Lesson = {
  slug: 'first-review',
  sprint: 0,
  title: 'Review your first pull request',
  level: 'Starter',
  status: 'done',
  skills: ['gh pr view', 'gh pr diff', 'gh pr review'],
  summary: 'Read a diff, comment on lines, request changes, resolve threads and approve.',
  brief:
    'A teammate opened a pull request and asked you to review it. Your job: read what changed, ask about ' +
    'anything unclear, request the changes you want, check the fixes, and approve when you are happy. ' +
    'Your approval is what lets the pull request merge into the protected main branch.',
  learn: [
    'What a pull request (PR) and a diff are',
    'How to leave a comment on a specific line',
    'The difference between Comment, Approve and Request changes',
    'How fixes arrive as new commits on the same PR',
    'Why resolving a conversation is not the same as approving',
  ],
  steps: [
    {
      title: 'Open the pull request and read the description',
      why:
        'A pull request asks to merge one branch into another, usually into main. The description says ' +
        'what changed, why, and how it was tested. Read it first, so you know what to look for.',
      vscode: [
        'On GitHub, open the repo and click the Pull requests tab.',
        'Open the PR. The Conversation tab shows the description, the linked Issue ("Closes #3") and every comment.',
      ],
      commands: [
        { cmd: 'gh pr list', explain: 'Lists the open pull requests in this repo.' },
        { cmd: 'gh pr view 4', explain: 'Shows PR #4: title, author, description and status.' },
        { cmd: 'gh pr view 4 --web', explain: 'Opens the same PR in the browser.' },
      ],
    },
    {
      title: 'Read the diff, file by file',
      why:
        'The diff is the list of changed lines. Spend your time on the files a person wrote. Generated files, ' +
        'like package-lock.json with thousands of lines, only need a glance.',
      vscode: [
        'Open the Files changed tab.',
        'Read each file. Tick "Viewed" when you are done with it, and GitHub collapses it.',
        'The PR description often says which files matter most. Start there.',
      ],
      commands: [
        { cmd: 'gh pr diff 4 --name-only', explain: 'Lists only the names of the changed files.' },
        { cmd: 'gh pr diff 4', explain: 'Prints the whole diff in the terminal.' },
      ],
    },
    {
      title: 'Comment on a line',
      why:
        'A line comment sits right next to the code it is about, so nobody has to guess what you mean. ' +
        'Questions are welcome: "Is this file needed?" is a real review comment.',
      vscode: [
        'In Files changed, hover over a line and click the blue + that appears.',
        'Write your comment and click "Start a review". GitHub keeps it as pending until you submit.',
        'Add as many comments as you need.',
      ],
      commands: [
        {
          cmd: 'gh pr comment 4 --body "Why emerald green?"',
          explain:
            "Adds a general comment to the PR's Conversation. Comments on a specific line are easiest in the browser.",
        },
      ],
    },
    {
      title: 'Submit your review',
      why:
        'Submitting sends all your pending comments at once, with a verdict. Comment only gives feedback. ' +
        'Approve says it can merge. Request changes blocks the merge until you approve.',
      vscode: [
        'Click Review changes (or Submit review) at the top of Files changed.',
        'Pick Comment, Approve or Request changes, add a short summary, and click Submit review.',
      ],
      commands: [
        {
          cmd: 'gh pr review 4 --request-changes --body "Please see my comments"',
          explain: 'Submits a review that blocks the merge until the changes are made.',
        },
        { cmd: 'gh pr review 4 --approve', explain: 'Submits an approval.' },
        {
          cmd: 'gh pr review 4 --comment --body "Looks good so far"',
          explain: 'Submits feedback without approving or blocking.',
        },
      ],
    },
    {
      title: 'Read the replies and the new commits',
      why:
        'The author answers in each comment thread and pushes fixes as new commits on the same branch. ' +
        'The PR updates by itself. Nobody opens a new PR to fix review comments.',
      vscode: [
        'In Conversation, read each reply under your comments.',
        'In Files changed, open the "Changes from all commits" dropdown and pick "Show changes since your last review", so you do not reread everything.',
        'If an answer does not convince you, reply in the thread. Asking "why?" again is fine.',
      ],
      commands: [
        {
          cmd: 'gh pr view 4 --comments',
          explain: 'Shows the PR with all its comments in the terminal.',
        },
        {
          cmd: 'gh pr view 4 --json commits --jq ".commits[].messageHeadline"',
          explain: 'Lists the commit messages in the PR, so you can spot the new ones.',
        },
      ],
    },
    {
      title: 'Resolve the threads, then approve',
      why:
        'Resolving a conversation folds that thread away and marks it as done. It does not change your review. If you ' +
        'requested changes, the merge stays blocked until you submit a new review that approves.',
      vscode: [
        'Click "Resolve conversation" under each thread you are happy with.',
        'Then Review changes → Approve → Submit review.',
      ],
      commands: [
        {
          cmd: 'gh pr review 4 --approve',
          explain: 'Replaces your earlier "Request changes" with an approval.',
        },
        {
          cmd: 'gh pr view 4 --json reviewDecision',
          explain: 'Shows the overall decision: APPROVED, CHANGES_REQUESTED or REVIEW_REQUIRED.',
        },
      ],
    },
    {
      title: 'After the merge, update your main',
      why: 'The merge happens on GitHub. Your computer only gets the new main when you pull it.',
      vscode: [
        'Switch to main (bottom-left corner), then click Sync Changes.',
        'If you do not see Sync Changes, click the circling arrows next to the branch name, or Source Control → ··· → Pull.',
      ],
      commands: [
        { cmd: 'git switch main', explain: 'Moves to the main branch.' },
        { cmd: 'git pull', explain: 'Downloads the merged commits into your main.' },
      ],
    },
  ],
  inOurRepo: [
    { label: 'PR #2: your first review (approved)', url: `${REPO}/pull/2` },
    { label: 'PR #4: you requested changes', url: `${REPO}/pull/4` },
    {
      label: 'PR #4 thread: "always keep the margin and padding classes at the end"',
      url: `${REPO}/pull/4#discussion_r4634471346`,
    },
    {
      label: 'PR #4 thread: "is this file needed?"',
      url: `${REPO}/pull/4#discussion_r4634473537`,
    },
    {
      label: 'CONTRIBUTING.md section 7: the rule your review created',
      url: `${REPO}/blob/main/CONTRIBUTING.md#7-code-style`,
    },
  ],
  feedback: [
    'Your review set a team rule: in Tailwind class lists, margin and padding classes go last. It is now in CONTRIBUTING.md, so every teammate follows it.',
    'You asked why test files stay when they "do nothing". The honest answer: they never ship with the site, and they catch mistakes. On a tiny page they are not worth much yet, but CI and git bisect in later sprints need them.',
    'Review fixes come as new commits on the same branch: Dev A pushed two, and PR #4 updated by itself.',
    'Resolving all the threads did not unblock the merge. Your approval did.',
  ],
  mistakes: [
    'Thinking "Resolve conversation" approves the PR. It only folds the thread away.',
    'Approving without reading, or with no comment at all. Even one question makes the review useful.',
    'Reading a generated file like package-lock.json line by line. Check that it is expected, then move on.',
    'Rereading the whole diff after fixes, instead of only the new commits.',
  ],
  checklist: [
    'I can find what a PR changes and which files matter most',
    'I can leave a comment on a specific line',
    'I know when to choose Comment, Approve or Request changes',
    'I can check a fix by looking at only the new commits',
    'I know that resolving is not approving',
  ],
};
