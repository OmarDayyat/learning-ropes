# Contributing

These rules apply to everyone: the human and every agent.

## 1. Start from an Issue

Every change starts as a GitHub Issue (a ticket). The Issue number goes in the
branch name and in the PR.

## 2. Make a branch

A branch is your own copy of the code where you can work without changing
`main`. Name it `<type>/<issue-number>-<short-name>`:

```
feat/12-lesson-page
fix/15-broken-link
docs/18-update-readme
```

| Type | Use it for |
| --- | --- |
| `feat` | A new page or feature |
| `fix` | A bug fix |
| `docs` | Text and documentation only |
| `chore` | Setup, config, tooling |
| `test` | Tests only |

In VS Code: click the branch name in the bottom-left corner, then
**Create new branch from...**, pick `main`, and type the name.

## 3. Commit

A commit is a saved snapshot of your changes, with a message that says what
changed. Use the same types as branch names:

```
feat: add lesson page for pull requests
fix: correct link to home page
docs: explain how to run the site locally
```

- Write the message as an order: "add", not "added".
- Keep the first line under about 60 characters.
- Make small commits that each do one thing.

## 4. Open a pull request

A pull request (PR) asks the team to merge your branch into `main`.

1. Push your branch. In VS Code: **Publish Branch**.
2. Open the PR on GitHub. The template asks what changed, why, and how you
   tested it.
3. Write `Closes #<issue-number>` in the PR so the Issue closes when it merges.

## 5. Review

- Every PR needs one approval before it can merge.
- Reviewers read the whole diff (the list of changed lines).
- Comment on the code, not the person. Say what to change and why.
- The author fixes review comments with new commits on the same branch.
  The PR updates on its own.

## 6. Merge

The Team Lead merges approved PRs. After a merge, switch to `main` and pull.
In VS Code: switch to `main`, then **Sync Changes**.
