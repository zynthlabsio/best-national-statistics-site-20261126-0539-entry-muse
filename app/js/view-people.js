// view-people.js — the People & society route: the 2024 age pyramid,
// the poverty-rate line chart, and nine facts about Indonesian society.

import { AGE_PYRAMID, POVERTY_RATE, PEOPLE_FACTS } from './data-country.js';
import { drawPyramidChart, drawLineChart, AMBER } from './charts.js';
import { escapeHtml } from './format.js';
import { onResizeRedraw } from './main.js';

function factItem(fact) {
  const source = fact.year ? `${fact.source} · ${fact.year}` : fact.source;
  return '<li><span class="fact-mark" aria-hidden="true"></span><span>'
    + `${escapeHtml(fact.text)}<span class="fact-source">Source: ${escapeHtml(source)}</span></span></li>`;
}

export function render(main) {
  main.innerHTML = ''
    + '<section aria-labelledby="page-title">'
    + '<p class="eyebrow">People &amp; society</p>'
    + '<h1 id="page-title">A young country, slowly ageing.</h1>'
    + '<p class="lede">One in four Indonesians is under 15, the median age is 30.4, and the '
    + 'population pyramid still has a wide base — but the top is widening every census. '
    + 'Poverty, meanwhile, is at its lowest on the series.</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="pyramid-title">'
    + '<div class="panel-head"><div><h2 id="pyramid-title">Who lives here, by age</h2>'
    + '<p>Population pyramid, 2024. Each bar is the share of the total population in that five-year age group — men to the left, women to the right.</p></div></div>'
    + '<div class="chart-wrap"><canvas id="pyramid-chart" height="430" aria-label="Population pyramid for 2024, men on the left and women on the right" role="img"></canvas></div>'
    + '<p class="source-note">Source: BPS population projection, 2024. The youngest groups are still the largest; the 75+ group is the smallest, at 0.9% men and 1.3% women.</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="poverty-title">'
    + '<div class="panel-head"><div><h2 id="poverty-title">Poverty is falling — slowly</h2>'
    + '<p>Poverty rate in September each year. It rose during the pandemic, then fell to 8.57% in September 2024, the lowest on this series — 24.06 million people.</p></div></div>'
    + '<div class="chart-wrap"><canvas id="poverty-chart" height="260" aria-label="Line chart of the poverty rate, 2015 to 2024" role="img"></canvas></div>'
    + '<p class="source-note">Source: BPS Susenas, September rounds. The poverty line is the monthly spending per person below which a person counts as poor.</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="facts-title">'
    + '<div class="panel-head"><div><h2 id="facts-title">Society in facts</h2>'
    + '<p>Nine numbers that describe the people behind the totals.</p></div></div>'
    + '<ul class="fact-list">' + PEOPLE_FACTS.map(factItem).join('') + '</ul>'
    + '</section>';

  const pyramidCanvas = main.querySelector('#pyramid-chart');
  const drawPyramid = () => drawPyramidChart(pyramidCanvas, AGE_PYRAMID, {});
  drawPyramid();
  onResizeRedraw(drawPyramid);

  const povertyCanvas = main.querySelector('#poverty-chart');
  const drawPoverty = () => drawLineChart(
    povertyCanvas,
    POVERTY_RATE.map((p) => ({ label: String(p.year), value: p.value })),
    { color: AMBER, unit: '%', decimals: 2 },
  );
  drawPoverty();
  onResizeRedraw(drawPoverty);
}
