// view-regions.js — the provinces compared: a searchable, sortable table
// of the sixteen most populous provinces and a ranked bar view of the top
// five. Sorting and filtering happen here, in the page, with no reload.

import { provinces } from "./data-country.js";
import { oneDecimal, whole, escapeHtml } from "./format.js";

let sortKey = "population";
let sortDir = -1;
let query = "";

function sortedRows() {
  const rows = provinces.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  rows.sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    return (typeof av === "string" ? av.localeCompare(bv) : av - bv) * sortDir;
  });
  return rows;
}

function tableHtml() {
  const head = (key, label, numeric = false) =>
    `<th${numeric ? ' class="n"' : ""}><button type="button" class="sort" data-sort="${key}">${label}</button></th>`;
  return `<table class="data">
    <thead><tr>${head("name", "Province")}${head("capital", "Capital")}${head("population", "Population (m)", true)}${head("density", "Density /km²", true)}</tr></thead>
    <tbody>${sortedRows().map((p) => `<tr><td><strong>${escapeHtml(p.name)}</strong></td><td>${escapeHtml(p.capital)}</td><td class="n">${oneDecimal(p.population)}</td><td class="n">${whole(p.density)}</td></tr>`).join("")}</tbody>
  </table>`;
}

export function renderRegions(main) {
  const top5 = [...provinces].sort((a, b) => b.population - a.population).slice(0, 5);
  const max = top5[0].population;
  main.innerHTML = `
  <h1 class="section-title">Regions &amp; provinces</h1>
  <p class="section-lede">Indonesia has 38 provinces. The three Javanese provinces in this table
  alone hold 130.6 million people — more than all but a handful of countries. Jakarta is the
  densest province at about 16,100 people per km²; East Kalimantan the sparsest here at 33.</p>

  <section class="panel">
    <h2>The five largest provinces</h2>
    <p class="panel-sub">Population, millions, mid-2024 estimate.</p>
    ${top5.map((p) => `<div class="hbar-row"><span>${escapeHtml(p.name)}</span><span class="hbar-track"><span class="hbar-fill" style="display:block;width:${(p.population / max) * 100}%"></span></span><span class="hbar-val numbers">${oneDecimal(p.population)}m</span></div>`).join("")}
    <p class="source-note">Source: BPS, population by province, mid-2024 estimates.</p>
  </section>

  <section class="panel">
    <h2>Compare the sixteen largest provinces</h2>
    <p class="panel-sub">Search by name, or sort by any column. Together these sixteen hold
    248.4 million people — 88% of the country.</p>
    <div class="controls">
      <label for="province-search">Search provinces</label>
      <input type="search" id="province-search" placeholder="e.g. Java, Bali, Sumatra…" autocomplete="off">
      <span id="province-count" role="status"></span>
    </div>
    <div id="province-table"></div>
    <p class="source-note">Source: BPS mid-2024 provincial estimates; population and density rounded. The remaining 22 provinces each hold under 3.5 million people.</p>
  </section>`;

  const tableBox = main.querySelector("#province-table");
  const count = main.querySelector("#province-count");
  const paint = () => {
    tableBox.innerHTML = tableHtml();
    count.textContent = `${sortedRows().length} of ${provinces.length} provinces`;
    tableBox.querySelectorAll("[data-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.sort;
        if (key === sortKey) sortDir = -sortDir;
        else { sortKey = key; sortDir = key === "name" || key === "capital" ? 1 : -1; }
        paint();
      });
    });
  };
  paint();
  main.querySelector("#province-search").addEventListener("input", (event) => {
    query = event.target.value;
    paint();
  });
}
