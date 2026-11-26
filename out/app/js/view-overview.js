// view-overview.js — the front page: headline indicators, the population
// story since 1971, GDP by industry and the sourced indicator table.

import { headline, populationSeries, urbanSeries, gdpSectors, indicatorTable } from "./data-country.js";
import { lineChart, donutChart } from "./charts.js";
import { whole, oneDecimal, twoDecimals, escapeHtml } from "./format.js";

function kpiCard(item, format, cls = "") {
  return `<article class="kpi ${cls}">
    <p class="kpi-label">${item.label}</p>
    <p class="kpi-value numbers">${format(item.value)}</p>
    <p class="kpi-note">${item.note} · ${item.source}, ${item.year}</p>
  </article>`;
}

export function renderOverview(main) {
  main.innerHTML = `
  <section class="hero">
    <h1>One country, <span class="hl">281.6 million</span> people, every figure sourced.</h1>
    <p class="lede">The essential statistics of Indonesia — the world's fourth most populous country —
    gathered from the official releases: how many people live here, how the economy is doing,
    where people live, and how life is changing. Every number carries its source and year.</p>
    <p class="hero-meta">
      <span class="badge">38 provinces</span>
      <span class="badge">17,508 islands</span>
      <span class="badge amber">Updated to BPS releases, 2025</span>
    </p>
  </section>

  <section class="grid kpi-band" aria-label="Headline indicators">
    ${kpiCard(headline.population, (v) => `${oneDecimal(v / 1e6)}<small> million</small>`)}
    ${kpiCard(headline.gdpGrowth, (v) => `${twoDecimals(v)}<small>%</small>`)}
    ${kpiCard(headline.gdpPerCapita, (v) => `<small>US$</small> ${whole(v)}`)}
    ${kpiCard(headline.inflation, (v) => `${twoDecimals(v)}<small>%</small>`, "amber")}
    ${kpiCard(headline.unemployment, (v) => `${twoDecimals(v)}<small>%</small>`, "amber")}
    ${kpiCard(headline.poverty, (v) => `${twoDecimals(v)}<small>%</small>`, "red")}
  </section>

  <section class="panel">
    <h2>Population since 1971</h2>
    <p class="panel-sub">Census counts and the mid-2024 estimate. Indonesia passed 250 million in 2016
    and adds roughly 2.5 million people a year. Switch the measure to see the move to the cities.</p>
    <div class="controls" role="group" aria-label="Chart measure">
      <span id="pop-toggle-label"><strong>Measure:</strong></span>
      <span class="seg" role="group" aria-labelledby="pop-toggle-label">
        <button type="button" data-measure="population" aria-pressed="true">Population (millions)</button>
        <button type="button" data-measure="urban" aria-pressed="false">Urban share (%)</button>
      </span>
    </div>
    <div class="chart-frame"><canvas id="pop-chart" role="img" aria-label="Line chart of Indonesia's population from 119.2 million in 1971 to 281.6 million in 2024"></canvas></div>
    <p class="source-note">Source: Statistics Indonesia (BPS) — population censuses 1971–2020 and mid-year estimate 2024; urban share, BPS 2024.</p>
  </section>

  <div class="grid grid-2">
    <section class="panel">
      <h2>What the economy makes</h2>
      <p class="panel-sub">Share of GDP by industry, 2024. Manufacturing is the largest single
      industry; farms, mines and quarries together still employ the most people.</p>
      <div class="chart-frame"><canvas id="sector-chart" role="img" aria-label="Donut chart of GDP by industry, 2024: manufacturing 19.0 per cent is the largest slice"></canvas></div>
      <div class="legend" id="sector-legend"></div>
      <p class="source-note">Source: BPS, GDP by industry at current prices, 2024.</p>
    </section>
    <section class="panel">
      <h2>Ten figures worth knowing</h2>
      <p class="panel-sub">The numbers people look up most, each with the release it came from.</p>
      <table class="data">
        <thead><tr><th>Indicator</th><th class="n">Value</th><th>Source</th></tr></thead>
        <tbody>
          ${indicatorTable.map((r) => `<tr><td>${escapeHtml(r.name)}</td><td class="n">${escapeHtml(r.value)}</td><td>${r.source}, ${r.year}</td></tr>`).join("")}
        </tbody>
      </table>
    </section>
  </div>

  <div class="grid grid-3">
    <section class="panel"><h3>People</h3><p class="panel-sub">A young country, slowly ageing: median age 30.4, one Indonesian in four under 15. See the full age pyramid and the poverty trend.</p><p><a href="#/people">Explore people &amp; society →</a></p></section>
    <section class="panel"><h3>Economy</h3><p class="panel-sub">Growth held at 5.03% in 2024 — a decade of near-5% growth broken only by the pandemic year. Charts for growth, prices and jobs.</p><p><a href="#/economy">Explore the economy →</a></p></section>
    <section class="panel"><h3>Regions</h3><p class="panel-sub">Half the country lives on Java. Compare all sixteen largest provinces by population and density, and search the full table.</p><p><a href="#/regions">Explore the regions →</a></p></section>
  </div>`;

  const canvas = main.querySelector("#pop-chart");
  const draw = (measure) => {
    if (measure === "urban") lineChart(canvas, urbanSeries, { color: "#dd8f26", unit: "%" });
    else lineChart(canvas, populationSeries, {});
  };
  draw("population");
  main.querySelectorAll("[data-measure]").forEach((button) => {
    button.addEventListener("click", () => {
      main.querySelectorAll("[data-measure]").forEach((b) => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      draw(button.dataset.measure);
    });
  });

  const palette = donutChart(main.querySelector("#sector-chart"), gdpSectors);
  main.querySelector("#sector-legend").innerHTML = gdpSectors
    .map((s, i) => `<span><span class="swatch" style="background:${palette[i % palette.length]}"></span>${escapeHtml(s.name)} ${oneDecimal(s.value)}%</span>`)
    .join("");
}
