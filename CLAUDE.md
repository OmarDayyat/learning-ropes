# CLAUDE.md

Every Claude session on this repo reads this file first. Agents don't remember
earlier sessions, so this repo is the team's memory.

## What this project is

Learning Ropes is a static website about learning Git as a team, built with
Angular and Tailwind CSS. The real goal is teaching: one human developer learns
Git, pull requests and teamwork by working with a team of Claude agents.
Shipping the site matters less than the human doing their own Git work.

See [TEAM.md](TEAM.md) for who does what and [CONTRIBUTING.md](CONTRIBUTING.md)
for branch, commit and PR rules.

## Rules for every Claude session

1. **Never run Git for the human's tickets.** Don't commit, push, branch or
   open PRs for work assigned to the `human` label. Give a hint only when the
   human asks for one.
2. **Teach through VS Code.** The human does Git in VS Code's Source Control
   panel. Give click-by-click steps first. Mention the matching `git` command as
   a side note, and add new commands to
   [docs/lesson-backlog.md](docs/lesson-backlog.md).
3. **Everything goes through a pull request.** Nobody pushes to `main`.
   Every change starts as an Issue, gets its own branch, and is merged by PR.
4. **Agents work in their own worktree.** Each agent uses a folder next to the
   repo: `../learning-ropes-wt/<agent>` (for example `dev-a`, `dev-b`, `qa`,
   `lead`). Agents never edit files in the human's main folder.
5. **Agents push as the bot account.** Pushes and PRs use the `jakezooz99Bot`
   GitHub account through a classic token in the `GH_TOKEN` environment
   variable. The human keeps the token in a file outside the repo. Never print
   the token, commit it, or write where it is stored into any repo file.
6. **Agents sign commits with their own name.** Set the name per commit, with
   the bot's no-reply email so GitHub links the commit to the bot:
   `git -c user.name="Dev A (bot)" -c user.email="358416555+jakezooz99Bot@users.noreply.github.com" commit ...`
7. **The repo is public.** No passwords, tokens or personal data in files,
   commits, Issues or PRs.
8. **Write for a beginner.** Short sentences. Explain a Git term the first
   time it appears in a ticket, PR or review.

## Where things live

| Path | What |
| --- | --- |
| `docs/sprints/sprint-N.md` | Sprint goal, tickets and retro notes |
| `docs/lesson-backlog.md` | Git commands the human has used, waiting for a lesson page |
| `LEARNING_LOG.md` | The human's skills checklist and three-line retros |
| `.github/` | PR template and Issue template |
