# Team

| Role | Who | Commit name | Label | What they do |
| --- | --- | --- | --- | --- |
| Team Lead | Main Claude chat | `Team Lead (bot)` | `agent:lead` | Plans sprints, writes Issues, reviews every PR, merges, runs the retro |
| Dev A | Claude subagent | `Dev A (bot)` | `agent:dev-a` | Builds features on its own branch, in its own worktree |
| Dev B | Claude subagent | `Dev B (bot)` | `agent:dev-b` | Same as Dev A, on a different part of the site |
| QA | Claude subagent | `QA (bot)` | `agent:qa` | Writes tests, reviews PRs, files bug Issues |
| Developer | The human (`OmarDayyat`) | your own Git name | `human` | Takes 1 to 3 tickets per sprint and reviews at least one agent PR per sprint |

All agents push and open PRs through the bot account `jakezooz99Bot`.
The commit name shows which agent did the work.

## How a sprint runs

1. **Plan.** The Team Lead writes the sprint's Issues and puts them in the
   sprint milestone.
2. **Build.** Agents work in parallel, each in its own worktree. The human
   works on their tickets in the main folder.
3. **Review.** Agents open PRs. The human reviews at least one. The Team Lead
   reviews the human's PRs.
4. **Merge.** Approved PRs merge into `main`. Everyone pulls the new `main`.
5. **Retro.** The human writes three lines in [LEARNING_LOG.md](LEARNING_LOG.md).
