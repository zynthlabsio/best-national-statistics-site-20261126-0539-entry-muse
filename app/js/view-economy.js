// view-economy.js — the economy: growth, prices, jobs and trade, each
// chart with the release it came from.

import { gdpGrowthSeries, inflationSeries } from "./data-country.js";
import { barChart, lineChart } from "./charts.js";

export function renderEconomy(main) {
  main.innerHTML = `
  <h1 class="section-title">The economy</h1>
  <p class="section-lede">A US$ 1.4 trillion economy growing at about 5% a year, with inflation
  back inside the central bank's 2.5% ± 1 target band and a trade surplus in every year since 2020.</p>

  <section class="panel">
    <h2>GDP growth, 2015–2024</h2>
    <p class="panel-sub">Real growth, per cent year on year. The red bar is 2020, the pandemic
    contraction of −2.07% — the only negative year in the series. Growth in the second quarter
    of 2025 was 5.12% year on year (BPS).</p>
    <div class="chart-frame"><canvas id="growth-chart" role="img" aria-label="Bar chart of GDP growth: about 5 per cent every year from 2015 to 2024 except a fall of 2.07 per cent in 2020"></canvas></div>
    <p class="source-note">Source: BPS, GDP at constant 2010 prices, annual releases 2015–2024.</p>
  </section>

  <div class="grid grid-2">
    <section class="panel">
      <h2>Inflation, December each year</h2>
      <p class="panel-sub">Consumer prices, per cent year on year. The 2022 spike to 5.51% followed
      the subsidised fuel price rise; by December 2024 inflation was 1.57%, the softest in the series.</p>
      <div class="chart-frame"><canvas id="inflation-chart" role="img" aria-label="Line chart of December inflation peaking at 5.51 per cent in 2022 and easing to 1.57 per cent in 2024"></canvas></div>
      <p class="source-note">Source: BPS, consumer price index, December releases.</p>
    </section>
    <section class="panel">
      <h2>Work &amp; trade in facts</h2>
      <ul class="fact-list">
        <li><strong>4.76%</strong> — open unemployment rate, February 2025 (BPS)</li>
        <li><strong>143.6 million</strong> — people in work, February 2025 (BPS)</li>
        <li><strong>59.1%</strong> — of workers are in informal work (BPS, Feb 2025)</li>
        <li><strong>Rp 3.0 million</strong> — average monthly net wage, approx. (BPS, Feb 2025)</li>
        <li><strong>US$ 264.7 bn</strong> — exports of goods in 2024 (BPS)</li>
        <li><strong>US$ 233.7 bn</strong> — imports of goods in 2024 (BPS)</li>
        <li><strong>US$ 31.0 bn</strong> — trade surplus in 2024, the fifth in a row (BPS)</li>
        <li><strong>Coal, palm oil, steel</strong> — the three biggest export earners (BPS, 2024)</li>
      </ul>
    </section>
  </div>`;

  barChart(main.querySelector("#growth-chart"), gdpGrowthSeries);
  lineChart(main.querySelector("#inflation-chart"), inflationSeries, { color: "#dd8f26", unit: "%" });
}
