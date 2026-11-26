// view-regions.js — the Regions & provinces route: the five largest
// provinces as horizontal bars, and a searchable, sortable table of
// the sixteen largest provinces.

import { PROVINCES, PROVINCE_TOTALS } from './data-country.js';
import { formatWhole, formatOneDecimal, escapeHtml } from './format.js';

const COLUMNS = [
  { key: 'province', label: 'Province', numeric: false },
  { key: 'capital', label: 'Capital', numeric: false },
  { key: 'population', label: 'Population in millions', numeric: true },
  { key: 'density', label: 'Density per km²', numeric: true },
];

let query = '';
let sortKey = 'population';
let sortDir = 'desc';

function filteredRows() {
  const needle = query.trim().toLowerCase();
  const rows = PROVINCES.filter((row) => row.province.toLowerCase().includes(needle));
  const column = COLUMNS.find((c) => c.key === sortKey);
  rows.sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = column.numeric ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });
  return rows;
}

function tableRows(rows) {
  return rows.map((row) => '<tr>'
    + `<td>${escapeHtml(row.province)}</td>`
    + `<td>${escapeHtml(row.capital)}</td>`
    + `<td class="num">${formatOneDecimal(row.population)}</td>`
    + `<td class="num">${formatWhole(row.density)}</td>`
    + '</tr>').join('');
}

function topFiveBars() {
  const top = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 5);
  const max = top[0].population;
  return top.map((row) => '<li>'
    + `<span class="bar-name">${escapeHtml(row.province)}</span>`
    + `<span class="bar-track"><span class="bar-fill" style="width:${((row.population / max) * 100).toFixed(1)}%"></span></span>`
    + `<span class="bar-value">${formatOneDecimal(row.population)}m</span>`
    + '</li>').join('');
}

export function render(main) {
  main.innerHTML = ''
    + '<section aria-labelledby="page-title">'
    + '<p class="eyebrow">Regions &amp; provinces</p>'
    + '<h1 id="page-title">Half the country lives on Java.</h1>'
    + '<p class="lede">Indonesia has 38 provinces, but the population is far from evenly spread. '
    + 'The three Javanese provinces alone hold 130.6 million people, and Jakarta is the densest place in the country '
    + 'at about 16,100 people per km² — against 33 per km² in East Kalimantan, the sparsest of the sixteen largest.</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="top-title">'
    + '<div class="panel-head"><div><h2 id="top-title">The five largest provinces</h2>'
    + '<p>Population in millions, mid-2024 estimates. West Java alone holds more people than most countries.</p></div></div>'
    + '<ul class="bar-list">' + topFiveBars() + '</ul>'
    + '<p class="source-note">Source: BPS mid-2024 estimates.</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="table-title">'
    + '<div class="panel-head"><div><h2 id="table-title">Sixteen largest provinces</h2>'
    + '<p>Search by name, or click a column header to sort — click again to reverse the order.</p></div></div>'
    + '<div class="field-row">'
    + '<label for="province-search">Search provinces</label>'
    + '<input type="search" id="province-search" placeholder="Type a province name, e.g. Bali" autocomplete="off">'
    + '<p class="count-line" id="province-count" aria-live="polite"></p>'
    + '</div>'
    + '<div class="table-scroll"><table class="data-table" id="province-table">'
    + '<caption>Mid-2024 estimates, population in millions and density in people per km².</caption>'
    + '<thead><tr>'
    + COLUMNS.map((c) => `<th scope="col" class="sortable${c.numeric ? ' num' : ''}" data-sort="${c.key}" tabindex="0">${escapeHtml(c.label)}</th>`).join('')
    + '</tr></thead>'
    + '<tbody></tbody>'
    + '</table></div>'
    + `<p class="source-note">Source: BPS mid-2024 estimates. The sixteen together hold ${PROVINCE_TOTALS.topSixteenPopulation} million people — ${PROVINCE_TOTALS.topSixteenShare}% of the country.</p>`
    + '</section>';

  const search = main.querySelector('#province-search');
  const count = main.querySelector('#province-count');
  const tbody = main.querySelector('#province-table tbody');
  const headers = [...main.querySelectorAll('#province-table th[data-sort]')];

  function refresh() {
    const rows = filteredRows();
    tbody.innerHTML = tableRows(rows);
    count.textContent = `${rows.length} of ${PROVINCES.length} provinces`;
    headers.forEach((th) => {
      th.classList.remove('sorted-asc', 'sorted-desc');
      if (th.getAttribute('data-sort') === sortKey) {
        th.classList.add(sortDir === 'asc' ? 'sorted-asc' : 'sorted-desc');
      }
    });
  }

  search.addEventListener('input', () => {
    query = search.value;
    refresh();
  });

  headers.forEach((th) => {
    const applySort = () => {
      const key = th.getAttribute('data-sort');
      const column = COLUMNS.find((c) => c.key === key);
      if (key === sortKey) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey = key;
        sortDir = column.numeric ? 'desc' : 'asc';
      }
      refresh();
    };
    th.addEventListener('click', applySort);
    th.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        applySort();
      }
    });
  });

  refresh();
}
