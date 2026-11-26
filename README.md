# Indonesia in Numbers — a national statistics site

An entry for the make.fun bounty **best-national-statistics-site-20261126-0539**.

A working national statistics site for Indonesia, the world's fourth most
populous country, built as plain static files with no build step and no
network requests:

- **Overview** — six headline indicators (population, GDP growth, GDP per
  capita, inflation, unemployment, poverty), a population chart back to the
  1971 census with a population/urban-share toggle, GDP by industry as a
  donut, and a ten-figure indicator table — every figure with source and year.
- **People** — the 2024 age pyramid, the poverty trend since 2015, and a
  society fact list.
- **Economy** — GDP growth bars 2015–2024 (the pandemic year in red),
  December inflation since 2019, and work & trade facts.
- **Regions** — the sixteen most populous provinces in a searchable,
  sortable table, plus a ranked top-five bar view.
- **Sources & methods** — publishers, series, definitions and the release
  rhythm behind every figure on the site.

Figures are published estimates from Statistics Indonesia (BPS), the World
Bank, UNDP and APJII, labelled with source and year wherever they appear.

## Layout

- `main.ts` — the hand-in program: copies `app/` and `screenshots/` to
  `/output` and writes `dossier.json` with the vendored library.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.
- `app/` — the site: `index.html`, three stylesheets (`css/tokens.css`,
  `css/layout.css`, `css/components.css`) and one JS module per job
  (`js/main.js` router, `js/data-country.js`, `js/charts.js`,
  `js/format.js`, one `js/view-*.js` per section, loaded lazily).
- `screenshots/` — four real renders of the site (three desktop, one phone).
- `serve.ts` — a tiny local server for `app/` (`node serve.ts`, port 8080).

Run the hand-in locally:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
