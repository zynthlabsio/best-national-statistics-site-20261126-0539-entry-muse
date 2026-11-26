// view-economy.js — the Economy route: the GDP growth bar chart with
// the pandemic year in red, the December inflation line, and eight
// facts about work and trade.

import { GDP_GROWTH, INFLATION_DECEMBER, ECONOMY_FACTS } from './data-country.js';
import { drawBarChart, drawLineChart, AMBER, RED } from './charts.js';
import { escapeHtml } from './format.js';
import { onResizeRedraw } from './main.js';

function factItem(fact) {
  return '<li><span class="fact-mark" aria-hidden="true"></span><span>'
    + `${escapeHtml(fact.text)}<span class="fact-source">Source: ${escapeHtml(fact.source)} · ${escapeHtml(fact.year)}</span></span></li>`;
}

export function render(main) {
  main.innerHTML = ''
    + '<section aria-labelledby="page-title">'
    + '<p class="eyebrow">The economy</p>'
    + '<h1 id="page-title">Growth held at 5.03% in 2024.</h1>'
    + '<p class="lede">An economy of about US$ 1.4 trillion that has grown near 5% a year for a decade — '
    + 'with one exception, the pandemic year 2020, when it shrank 2.07%. Inflation is back inside the '
    + 'central bank\u2019s 2.5% ± 1 target band, and the trade surplus has run every year since 2020.</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="growth-title">'
    + '<div class="panel-head"><div><h2 id="growth-title">GDP growth, year on year</h2>'
    + '<p>Real GDP growth at constant 2010 prices, 2015–2024. The single red bar is 2020, the only negative year in the decade.</p></div></div>'
    + '<div class="chart-wrap"><canvas id="growth-chart" height="260" aria-label="Bar chart of GDP growth, 2015 to 2024" role="img"></canvas></div>'
    + '<p class="source-note">Source: BPS national accounts. Growth picked up again in 2025: GDP in the second quarter of 2025 grew 5.12% year on year (BPS).</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="inflation-title">'
    + '<div class="panel-head"><div><h2 id="inflation-title">Inflation: the December reading</h2>'
    + '<p>Consumer price inflation in December, year on year. The 2022 spike to 5.51% followed the fuel-price adjustment; by December 2024 it was 1.57%.</p></div></div>'
    + '<div class="chart-wrap"><canvas id="inflation-chart" height="260" aria-label="Line chart of December inflation, 2019 to 2024" role="img"></canvas></div>'
    + '<p class="source-note">Source: BPS consumer price index, across 150 cities. The central bank\u2019s target band is 2.5% ± 1 percentage point.</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="facts-title">'
    + '<div class="panel-head"><div><h2 id="facts-title">Work &amp; trade in facts</h2>'
    + '<p>Jobs, wages and what the country sells to the world.</p></div></div>'
    + '<ul class="fact-list">' + ECONOMY_FACTS.map(factItem).join('') + '</ul>'
    + '</section>';

  const growthCanvas = main.querySelector('#growth-chart');
  const drawGrowth = () => drawBarChart(
    growthCanvas,
    GDP_GROWTH.map((p) => ({ label: String(p.year), value: p.value })),
    { color: AMBER, negativeColor: RED, unit: '%', decimals: 2 },
  );
  drawGrowth();
  onResizeRedraw(drawGrowth);

  const inflationCanvas = main.querySelector('#inflation-chart');
  const drawInflation = () => drawLineChart(
    inflationCanvas,
    INFLATION_DECEMBER.map((p) => ({ label: String(p.year), value: p.value })),
    { color: AMBER, unit: '%', decimals: 2 },
  );
  drawInflation();
  onResizeRedraw(drawInflation);
}
