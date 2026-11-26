// view-overview.js — the Overview route: hero, six headline KPIs, the
// population chart with its measure toggle, the GDP-by-industry donut
// with the ten-figures table, and links into the other sections.

import { HEADLINES, POPULATION_SERIES, URBAN_SERIES, INDUSTRY_SHARES, TEN_FIGURES } from './data-country.js';
import { drawLineChart, drawDonutChart, AMBER } from './charts.js';
import { escapeHtml } from './format.js';
import { onResizeRedraw } from './main.js';

function kpiCard(item) {
  return '<article class="kpi">'
    + `<p class="kpi-label">${escapeHtml(item.label)}</p>`
    + `<p class="kpi-value">${escapeHtml(item.value)}${item.unit ? ` <span class="kpi-unit">${escapeHtml(item.unit)}</span>` : ''}</p>`
    + `<p class="kpi-note">${escapeHtml(item.note)}</p>`
    + `<p class="kpi-source">Source: ${escapeHtml(item.source)} · ${escapeHtml(item.year)}</p>`
    + '</article>';
}

function tenFiguresRows() {
  return TEN_FIGURES.map((row) => '<tr>'
    + `<td>${escapeHtml(row.name)}</td>`
    + `<td class="num">${escapeHtml(row.value)}</td>`
    + `<td>${escapeHtml(row.source)}</td>`
    + `<td class="num">${escapeHtml(row.year)}</td>`
    + '</tr>').join('');
}

function industryLegend() {
  return INDUSTRY_SHARES.map((slice) => '<li>'
    + `<span class="swatch" style="background:${slice.color}"></span>`
    + `${escapeHtml(slice.label)} — <strong>${slice.value.toFixed(1)}%</strong>`
    + '</li>').join('');
}

export function render(main) {
  main.innerHTML = ''
    + '<section class="hero" aria-labelledby="page-title">'
    + '<p class="eyebrow">Statistics Indonesia · BPS, World Bank, UNDP, APJII</p>'
    + '<h1 id="page-title">One country, 281.6 million people, every figure sourced.</h1>'
    + '<p class="lede">Indonesia is the world\u2019s fourth most populous country — 38 provinces across 17,508 islands. '
    + 'This site gathers the figures people actually look up: how many people there are, how the economy is doing, '
    + 'where they live, and what has changed. Every figure names its publisher and its year.</p>'
    + '<ul class="hero-stats">'
    + '<li><strong>4th</strong> most populous country</li>'
    + '<li><strong>38</strong> provinces</li>'
    + '<li><strong>17,508</strong> islands</li>'
    + '<li>Passed <strong>250 million</strong> in 2016</li>'
    + '<li>Adds about <strong>2.5 million</strong> people a year</li>'
    + '</ul>'
    + '</section>'

    + '<section aria-label="Headline figures">'
    + '<div class="grid-kpi">'
    + HEADLINES.map(kpiCard).join('')
    + '</div>'
    + '<p class="source-note">Population 281,603,800 at mid-year 2024 (BPS). GDP per capita in current US dollars (World Bank, 2024).</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="population-title">'
    + '<div class="panel-head"><div><h2 id="population-title">Population since 1971</h2>'
    + '<p>From 119.2 million at the 1971 census to 281.6 million at mid-2024 — and a country that has moved to town: the urban share rose from 17.4% to 58.6% over the same span.</p></div>'
    + '<div class="toggle-group" role="group" aria-label="Chart measure">'
    + '<button type="button" data-measure="population" aria-pressed="true">Population in millions</button>'
    + '<button type="button" data-measure="urban" aria-pressed="false">Urban share %</button>'
    + '</div></div>'
    + '<div class="chart-wrap"><canvas id="population-chart" height="260" aria-label="Line chart of population or urban share, 1971 to 2024" role="img"></canvas></div>'
    + '<p class="source-note">Source: BPS — censuses 1971–2020 and the mid-2024 estimate. Urban share: BPS.</p>'
    + '</section>'

    + '<div class="grid-two">'
    + '<section class="panel" aria-labelledby="industry-title">'
    + '<div class="panel-head"><div><h2 id="industry-title">What the economy makes</h2>'
    + '<p>Share of GDP at current prices, 2024. Manufacturing is still the largest single industry, at just under a fifth of the economy.</p></div></div>'
    + '<div class="chart-wrap"><canvas id="industry-chart" height="260" aria-label="Donut chart of GDP by industry, 2024" role="img"></canvas></div>'
    + '<ul class="chart-legend">' + industryLegend() + '</ul>'
    + '<p class="source-note">Source: BPS national accounts, 2024. The economy is worth about US$ 1.4 trillion.</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="ten-title">'
    + '<div class="panel-head"><div><h2 id="ten-title">Ten figures worth knowing</h2>'
    + '<p>The numbers visitors ask for first — trade, living standards, schooling and connectivity.</p></div></div>'
    + '<div class="table-scroll"><table class="data-table">'
    + '<caption>Each figure with its publisher and year.</caption>'
    + '<thead><tr><th scope="col">Figure</th><th scope="col" class="num">Value</th><th scope="col">Source</th><th scope="col" class="num">Year</th></tr></thead>'
    + '<tbody>' + tenFiguresRows() + '</tbody>'
    + '</table></div>'
    + '</section>'
    + '</div>'

    + '<section aria-label="Explore the sections">'
    + '<div class="grid-three">'
    + '<a class="link-card" href="#/people"><h3>People &amp; society</h3><p>An age pyramid for 2024, the poverty line since 2015, and nine facts about who Indonesians are.</p></a>'
    + '<a class="link-card" href="#/economy"><h3>The economy</h3><p>Growth since 2015 — including the pandemic year — inflation, jobs and trade.</p></a>'
    + '<a class="link-card" href="#/regions"><h3>Regions &amp; provinces</h3><p>The sixteen largest provinces, searchable and sortable, from West Java to Jambi.</p></a>'
    + '</div>'
    + '</section>';

  let measure = 'population';
  const populationCanvas = main.querySelector('#population-chart');
  const drawPopulation = () => {
    if (measure === 'urban') {
      drawLineChart(populationCanvas, URBAN_SERIES.map((p) => ({ label: String(p.year), value: p.value })), { color: AMBER, unit: '%', decimals: 1 });
    } else {
      drawLineChart(populationCanvas, POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.value })), { color: AMBER, unit: 'm', decimals: 1 });
    }
  };
  drawPopulation();
  onResizeRedraw(drawPopulation);

  main.querySelectorAll('[data-measure]').forEach((button) => {
    button.addEventListener('click', () => {
      measure = button.getAttribute('data-measure');
      main.querySelectorAll('[data-measure]').forEach((b) => {
        b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
      });
      drawPopulation();
    });
  });

  const industryCanvas = main.querySelector('#industry-chart');
  const drawIndustry = () => drawDonutChart(industryCanvas, INDUSTRY_SHARES, { centerLabel: '100%', centerNote: 'of GDP' });
  drawIndustry();
  onResizeRedraw(drawIndustry);
}
