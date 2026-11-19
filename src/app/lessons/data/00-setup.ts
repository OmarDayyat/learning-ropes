import { Lesson } from '../lesson.model';

const REPO = 'https://github.com/OmarDayyat/learning-ropes';

export const SETUP_LESSON: Lesson = {
  slug: 'setup',
  sprint: 0,
  title: 'Set up Git, GitHub and the repo',
  level: 'Starter',
  status: 'done',
  skills: ['git init', 'git add', 'git commit', 'git push', 'git clone'],
  summary:
    'Create the accounts, install the tools, make your first commits and put the project on GitHub.',
  brief:
    'Before a team can work through pull requests, it needs a home on GitHub and the tools to reach it. ' +
    'Your job in Sprint 0: check your GitHub account, install the GitHub CLI and Node.js, make the first ' +
    'commits, publish the repo, clone it to the folder where it will live, and protect the main branch ' +
    'so every change has to go through a pull request.',
  learn: [
    'What a repository, a commit and a remote are',
    'How to stage files and write a commit message',
    'How to publish a local repo to GitHub and clone it back',
    'Why the main branch is protected, and what that changes for everyone',
    'How to install the project and run the site locally',
  ],
  steps: [
    {
      title: 'Check your GitHub account and your Git identity',
      why:
        'Every commit records a name and an email. GitHub links a commit to your account only when ' +
        'that email is listed on your account.',
      vscode: [
        'In the browser, open github.com/settings/security and check that two-factor authentication is on.',
        'Open github.com/settings/emails and check that the email Git uses is listed there.',
        'In VS Code, open a terminal with Terminal → New Terminal (Ctrl+Shift+`) to see or set your Git name and email.',
      ],
      commands: [
        {
          cmd: 'git config --global user.name "Your Name"',
          explain: 'Sets the name written into every commit you make on this computer.',
        },
        {
          cmd: 'git config --global user.email "you@example.com"',
          explain:
            'Sets the email written into your commits. Use one that is listed on your GitHub account.',
        },
        {
          cmd: 'git config --global --list',
          explain: 'Shows your Git settings, so you can check both values.',
        },
      ],
    },
    {
      title: 'Install the GitHub CLI and Node.js',
      why:
        'The GitHub CLI (gh) works with Issues and pull requests from the terminal. Node.js runs the ' +
        'Angular tools that build the site. Angular 22 needs Node 22 (22.22.3 or later), Node 24 ' +
        '(24.15 or later), or Node 26 or later.',
      vscode: [
        'Open a terminal in VS Code (Terminal → New Terminal, Ctrl+Shift+`). Installing tools happens in the terminal, not in Source Control.',
        'After installing, close and reopen VS Code so its terminals see the new programs.',
        'If nvm use says it needs more rights, run it once in a terminal opened as administrator.',
      ],
      commands: [
        { cmd: 'winget install --id GitHub.cli', explain: 'Installs the GitHub CLI on Windows.' },
        {
          cmd: 'winget install --id CoreyButler.NVMforWindows -e',
          explain:
            'Installs nvm for Windows (Node Version Manager), which lets you keep several Node versions. -e means the id must match exactly.',
        },
        {
          cmd: 'nvm install 26.13.1',
          explain:
            'With nvm (Node Version Manager), downloads Node 26 next to your other Node versions.',
        },
        {
          cmd: 'nvm use 26.13.1',
          explain:
            'Switches this computer to Node 26. nvm switches for every project, so switch back for older ones.',
        },
        {
          cmd: 'node --version',
          explain: 'Checks which Node is active. It should print v26.13.1.',
        },
      ],
    },
    {
      title: 'Sign in to GitHub from the terminal',
      why: 'gh needs to know who you are before it can read or change anything on GitHub.',
      vscode: [
        'Run the login command in the VS Code terminal and follow the browser prompt.',
        'When VS Code itself asks you to sign in to GitHub, check that it is the same account.',
      ],
      commands: [
        {
          cmd: 'gh auth login',
          explain:
            'Signs gh in to your GitHub account. Choose GitHub.com, HTTPS, and log in with a browser.',
        },
        {
          cmd: 'gh auth status',
          explain: 'Shows which account gh is signed in as, and what it is allowed to do.',
        },
      ],
    },
    {
      title: 'Start the repo and make your first commits',
      why:
        'A repository (repo) is a folder whose history Git tracks. A commit is a saved snapshot of the ' +
        'files, with a message that says what changed and why.',
      vscode: [
        'Open the empty project folder in VS Code.',
        'Source Control (Ctrl+Shift+G) → Initialize Repository.',
        'Create README.md and save it. It appears under Changes with a U (untracked: Git has never seen it).',
        'For a file Git already knows, clicking it under Changes opens the diff: green lines are added, red lines are removed. A brand-new file simply opens.',
        'Click + next to the file to stage it. Staged files go into the next commit.',
        'Type a message, for example "Add README.md", and click Commit.',
      ],
      commands: [
        {
          cmd: 'git init -b main',
          explain: 'Turns the folder into a Git repo whose first branch is main.',
        },
        { cmd: 'git status', explain: 'Lists changed, staged and untracked files. Run it often.' },
        {
          cmd: 'git diff',
          explain:
            'Shows the changed lines that are not staged yet. A brand-new file does not show up here until you git add it. Then use git diff --staged.',
        },
        { cmd: 'git add README.md', explain: 'Stages one file for the next commit.' },
        { cmd: 'git diff --staged', explain: 'Shows exactly what the next commit will contain.' },
        {
          cmd: 'git commit -m "Add README.md"',
          explain: 'Saves the staged files as a commit. -m gives the message.',
        },
        { cmd: 'git log --oneline', explain: 'Lists the commits, newest first, one line each.' },
      ],
    },
    {
      title: 'Put the repo on GitHub',
      why:
        'Pull requests only exist on GitHub, so a repo that lives only on your computer is not enough. ' +
        'The GitHub copy is called a remote, and its usual name is origin.',
      vscode: [
        'Source Control → Publish Branch.',
        'Choose "Publish to GitHub public repository" and keep the name learning-ropes.',
        'If VS Code asks you to sign in, check that it is your own GitHub account.',
      ],
      commands: [
        {
          cmd: 'gh repo create learning-ropes --public --source . --push',
          explain:
            'Creates the GitHub repo from this folder, adds it as origin and pushes your commits.',
        },
        {
          cmd: 'git remote add origin https://github.com/<you>/learning-ropes.git',
          explain:
            'The plain-Git way, step 1: after creating an empty repo on github.com, tells your local repo where its GitHub copy is, under the name origin.',
        },
        {
          cmd: 'git push -u origin main',
          explain:
            'Step 2: sends main to origin. -u remembers origin/main as its upstream, ' +
            'so later a bare git push or git pull knows where to go.',
        },
      ],
    },
    {
      title: 'Clone the repo to where it will live',
      why:
        'Cloning downloads a full copy of a GitHub repo, with its whole history, and connects it to origin. ' +
        'It is also how any new teammate gets the project.',
      vscode: [
        'Ctrl+Shift+P → Git: Clone.',
        'Paste the repo URL, pick the parent folder, and open the clone when VS Code asks.',
      ],
      commands: [
        {
          cmd: `git clone ${REPO}.git`,
          explain: 'Downloads the repo into a new learning-ropes folder.',
        },
        { cmd: 'git remote -v', explain: 'Shows where origin points, for fetching and pushing.' },
      ],
    },
    {
      title: 'Add teammates and protect main',
      why:
        'Collaborators can push branches to the repo. A protected main cannot be pushed to directly: every ' +
        'change needs a pull request with one approval. That is what makes code review real. One catch: ' +
        'admins, like the repo owner, can still bypass the rule unless "Do not allow bypassing the above ' +
        'settings" is ticked. In this repo it is not ticked, and the team agreed to use pull requests anyway.',
      vscode: [
        'On GitHub: Settings → Collaborators → Add people, then the invited account accepts.',
        'Settings → Branches → Add classic branch protection rule.',
        'Branch name pattern: main. Tick "Require a pull request before merging" and "Require approvals" (1). Create.',
        'Optional: also tick "Do not allow bypassing the above settings", so the rule binds admins too.',
        'Create the labels and milestones the team uses: Issues → Labels, and Issues → Milestones.',
      ],
      commands: [
        {
          cmd: 'gh api -X PUT repos/<owner>/<repo>/collaborators/<username>',
          explain:
            'Invites an account as a collaborator. We used it for our bot account, jakezooz99Bot. The other account still has to accept.',
        },
        {
          cmd: 'gh api repos/OmarDayyat/learning-ropes/branches/main/protection',
          explain:
            'Shows the protection rules on main, to check them. It says "Branch not protected" if there are none.',
        },
        {
          cmd: 'gh label create human --description "Ticket for the human developer"',
          explain: 'Creates a label. Labels show who a ticket is for.',
        },
      ],
    },
    {
      title: 'Get the latest main and run the site',
      why:
        'Other people merge into main on GitHub. Your copy only changes when you pull. Then npm installs ' +
        'the packages the site needs and starts a local server.',
      vscode: [
        'Make sure the bottom-left corner shows main, then click Sync Changes in Source Control. If you do not see it, click the circling arrows next to the branch name, or Source Control → ··· → Pull.',
        'Open a terminal and run npm install, then npm start.',
        'Open http://localhost:4200. Stop the server with Ctrl+C.',
      ],
      commands: [
        {
          cmd: 'git pull',
          explain: 'Downloads new commits from origin and adds them to your current branch.',
        },
        {
          cmd: 'npm install',
          explain: 'Installs the packages listed in package.json into node_modules/.',
        },
        {
          cmd: 'npm start',
          explain: 'Starts the site at http://localhost:4200 and reloads it when you save.',
        },
        { cmd: 'npm test -- --watch=false', explain: 'Runs the tests once and exits.' },
      ],
    },
  ],
  inOurRepo: [
    { label: 'Commit c5a7572: the first commit', url: `${REPO}/commit/c5a7572` },
    { label: 'Commit bf04dbb: the second commit', url: `${REPO}/commit/bf04dbb` },
    { label: 'Issue #1: Add team rules files', url: `${REPO}/issues/1` },
    { label: 'PR #2: team rules and Sprint 0 paperwork', url: `${REPO}/pull/2` },
    { label: 'Issue #3: Scaffold the Angular and Tailwind site', url: `${REPO}/issues/3` },
    { label: 'PR #4: Angular site with Tailwind CSS', url: `${REPO}/pull/4` },
  ],
  feedback: [
    "Write the team rules down. Agents start every session with no memory, so CLAUDE.md, TEAM.md and CONTRIBUTING.md are the team's memory.",
    "Secrets never go in a public repo. The bot's token lives in a file outside the project, and .gitignore has a secrets section.",
    'Once main is protected, the team works through pull requests. The owner could still bypass the rule as an admin, but we agreed not to. That is how every change gets a second pair of eyes.',
  ],
  mistakes: [
    'Having two Node versions and getting the wrong one. nvm can hide a Node installed another way, so check with node --version.',
    'Signing in to VS Code or the CLI with the wrong GitHub account. Check with gh auth status.',
    'Committing files that tools changed by themselves, like package-lock.json after npm install, or angular.json after the analytics question. Stage only the files your ticket is about.',
    'Using Discard Changes when you only meant to leave a file out of a commit. Discard deletes your edits for good. Unstaged files simply stay out of the commit.',
  ],
  checklist: [
    'I can check which name and email my commits use',
    'I can stage a file, read its diff, and commit it with a clear message',
    'I can explain what origin is, and what git push and git pull do',
    'I can clone a repo and run the site from it',
    'I can explain why main is protected',
  ],
};
