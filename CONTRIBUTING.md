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

## 7. Code style

### Tailwind class order

Write the classes in a class list in this order of groups. Inside a group, a responsive or state variant
(`md:`, `lg:`, `sm:`) goes right after the class it changes.

1. **Layout:** display, position and flex or grid settings. `flex`, `grid`, `sticky`, `top-6`,
   `flex-col`, `flex-wrap`, `items-center`, `grid-cols-1 md:grid-cols-2`
2. **Size:** `w-*`, `h-*`, `min-w-*`, `max-w-*`
3. **Border and corners:** `border`, `border-b`, `border-slate-200`, `border-dashed`, `rounded-xl`
4. **Background:** `bg-*`
5. **Text:** color, then size, then weight, then any other text classes.
   `text-slate-600 text-sm font-medium`, then `leading-*`, `tracking-*`, `font-mono`, `underline`
6. **Effects and states:** `shadow-*`, `transition`, `opacity-*`, then `hover:*`, `focus-visible:*`, `aria-*:`
7. **Spacing, always last:** `gap-*`, then margin, then padding. `space-x-*` and `space-y-*` count as
   margin. `mx-auto` is margin.

Example:

```html
<a class="flex flex-col h-full border border-slate-200 rounded-xl bg-white text-slate-900 text-lg font-semibold transition hover:border-emerald-600 gap-2 mt-4 p-5">
```

Classes added from code (for example a `[class]` binding or a string in a `.ts` file) follow the same order.
