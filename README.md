# adarsh.work

An updated portfolio / personal site for 2023, built with [Astro](https://astro.build) and typeset in [Fragment Mono](https://fonts.google.com/specimen/Fragment+Mono) and [Inter](https://fonts.google.com/specimen/Inter).

## 🚧 Project Structure

```
/
├── public/
│   └── CNAME
│   └── favicon.svg
│   └── banana_favicon.svg      (self-explanatory)
├── src/
│   └── pages/
│       └── about.astro
│       └── works/
│           └── .md files
│       └── notes/              (symbolic link to notes repo written in Obsidian)
│       └── index.astro
│       └── links.astro
│       └── notes.astro         (WIP)
│       └── 404.astro
│   └── components/             (React components + Astro islands)
│   └── data/                   (static data of works and global store for tags)
│   └── layouts/                (for sidebar and articles)
│   └── styles/ 
└── package.json
```

Project pages in `src/pages/works` are written in `.md` files, and each page is exposed as a route based on its filename.

`src/components/` contains miscellaneous React/Astro components.

All assets, compressed and converted to `.webp` format wherever possible, are hosted on an S3 bucket.

## 💻 Development

```bash
# clone project
git clone https://github.com/adarzh-sys/adarsh-work.git
cd adarsh-work

# install dependencies
npm install

# build project
npm run build
```

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


Based on a template by Yihui Hu.

## 🔖 Sites referenced:
1. [https://kevinnchen.com/](https://kevinnchen.com/)
2. [https://gemmacope.land/](https://gemmacope.land/)
3. [https://jake.isnt.online/](https://jake.isnt.online/)
4. [https://www.sang.design/](https://www.sang.design/)
5. [https://allpibslowplay.org/](https://allpibslowplay.org/#v2)
6. [https://www.tiger.exposed/index](https://www.tiger.exposed/index)
7. [https://tdingsun.github.io/reading-machines/](https://tdingsun.github.io/reading-machines/)
8. [https://eternal.how/](https://eternal.how/)
9. [http://r-m.work/](http://r-m.work/)
10. [http://studioran.tokyo/](http://studioran.tokyo/)

## 🛠️ Resources:
1. [Astro Crash Course in 20 minutes](https://www.youtube.com/watch?v=zrPVTf761OI&t=4s)
2. [Sass in 100 seconds](https://www.youtube.com/watch?v=akDIJa0AP5c)
3. [Framer Motion](https://www.framer.com/motion/)