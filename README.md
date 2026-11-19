# Learning Ropes

A website about learning Git and GitHub as part of a team,
built while learning it.

The team is one human developer and a group of Claude agents.
Every sprint we learn one new Git skill, and add a page about it to this site.

Built with Angular and Tailwind CSS.

## Run it locally

You need Node.js 26. If you use nvm, switch to the right version first:

```
nvm use 26.13.1
```

Then, in the repo folder:

1. Install the packages (only needed the first time, or after `package.json` changes):

   ```
   npm install
   ```

2. Start the site:

   ```
   npm start
   ```

3. Open http://localhost:4200 in your browser. The page reloads by itself when you save a file.

Other useful commands:

| Command | What it does |
| --- | --- |
| `npm test` | Runs the unit tests |
| `npm run build` | Builds the site into the `dist/` folder |
