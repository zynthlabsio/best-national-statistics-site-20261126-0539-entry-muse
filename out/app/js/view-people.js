// view-people.js — population & society: the age pyramid, poverty and
// wellbeing trends, and the facts behind the headline numbers.

import { agePyramid, povertySeries } from "./data-country.js";
import { pyramidChart, lineChart } from "./charts.js";

export function renderPeople(main) {
  main.innerHTML = `
  <h1 class="section-title">People &amp; society</h1>
  <p class="section-lede">281.6 million people, a median age of 30.4 years, and a demographic
  dividend that peaks this decade: two of every three Indonesians are of working age.</p>

  <section class="panel">
    <h2>The age pyramid, 2024</h2>
    <p class="panel-sub">Share of the population in each five-year age group, men on the left,
    women on the right. The wide base is narrowing — the 0–4 group is smaller than the 20–24
    group for the first time — while the top keeps growing.</p>
    <div class="chart-frame"><canvas id="pyramid-chart" role="img" aria-label="Population pyramid for 2024: the largest groups are aged 20 to 24 at about 8.4 per cent of the population combined"></canvas></div>
    <p class="source-note">Source: BPS population projection by age and sex, 2024. Shares are per cent of the total population.</p>
  </section>

  <div class="grid grid-2">
    <section class="panel">
      <h2>Poverty is falling again</h2>
      <p class="panel-sub">Share of the population below the national poverty line each September.
      The pandemic pushed the rate back above 10% in 2020; by September 2024 it reached 8.57%,
      the lowest on this series — 24.06 million people.</p>
      <div class="chart-frame"><canvas id="poverty-chart" role="img" aria-label="Line chart of the poverty rate falling from 11.13 per cent in 2015 to 8.57 per cent in 2024, with a rise in 2020"></canvas></div>
      <p class="source-note">Source: BPS, National Socio-Economic Survey (Susenas), September rounds.</p>
    </section>
    <section class="panel">
      <h2>Society in facts</h2>
      <ul class="fact-list">
        <li><strong>30.4 years</strong> — median age of the population (BPS, 2024)</li>
        <li><strong>71.9 years</strong> — life expectancy at birth (World Bank, 2023)</li>
        <li><strong>58.6%</strong> — live in urban areas, up from 17.4% in 1971 (BPS, 2024)</li>
        <li><strong>2.1 children</strong> — total fertility rate per woman (BPS, 2023)</li>
        <li><strong>96.5%</strong> — adult literacy rate (BPS, 2024)</li>
        <li><strong>8.9 years</strong> — mean years of schooling for adults (BPS, 2024)</li>
        <li><strong>0.728</strong> — Human Development Index, rank 112 of 193 (UNDP, 2023)</li>
        <li><strong>79.5%</strong> — of the population use the internet (APJII, 2024)</li>
        <li><strong>700+</strong> — living local languages, the most of any country but one (BPS / Ethnologue)</li>
      </ul>
    </section>
  </div>`;

  pyramidChart(main.querySelector("#pyramid-chart"), agePyramid);
  lineChart(main.querySelector("#poverty-chart"), povertySeries, { color: "#c0452f", unit: "%" });
}
