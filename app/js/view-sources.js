// view-sources.js — the Sources & methods route: who publishes the
// figures, what the terms mean, and how often each series is released.

import { PUBLISHERS, DEFINITIONS, RELEASE_RHYTHM } from './data-country.js';
import { escapeHtml } from './format.js';

function publisherRows() {
  return PUBLISHERS.map((row) => '<tr>'
    + `<td><strong>${escapeHtml(row.publisher)}</strong></td>`
    + `<td>${escapeHtml(row.series)}</td>`
    + `<td>${escapeHtml(row.usedFor)}</td>`
    + '</tr>').join('');
}

function definitionItems() {
  return DEFINITIONS.map((d) => `<dt>${escapeHtml(d.term)}</dt><dd>${escapeHtml(d.text)}</dd>`).join('');
}

function rhythmItems() {
  return RELEASE_RHYTHM.map((r) => `<li><strong>${escapeHtml(r.release)}:</strong> ${escapeHtml(r.rhythm)}</li>`).join('');
}

export function render(main) {
  main.innerHTML = ''
    + '<section aria-labelledby="page-title">'
    + '<p class="eyebrow">Sources &amp; methods</p>'
    + '<h1 id="page-title">Where every figure comes from.</h1>'
    + '<p class="lede">Four publishers supply every number on this site. Statistics Indonesia (BPS) '
    + 'does most of the work — censuses, surveys and the national accounts — while the World Bank, '
    + 'UNDP and APJII supply the international and connectivity figures.</p>'
    + '</section>'

    + '<section class="panel" aria-labelledby="publishers-title">'
    + '<div class="panel-head"><div><h2 id="publishers-title">Publishers</h2>'
    + '<p>Each figure on the site names its publisher and year; this table is the full list behind those notes.</p></div></div>'
    + '<div class="table-scroll"><table class="data-table">'
    + '<thead><tr><th scope="col">Publisher</th><th scope="col">Series used</th><th scope="col">Used for</th></tr></thead>'
    + '<tbody>' + publisherRows() + '</tbody>'
    + '</table></div>'
    + '</section>'

    + '<div class="grid-two">'
    + '<section class="panel" aria-labelledby="definitions-title">'
    + '<div class="panel-head"><div><h2 id="definitions-title">Definitions</h2>'
    + '<p>What the terms on this site actually mean.</p></div></div>'
    + '<dl class="def-list">' + definitionItems() + '</dl>'
    + '</section>'

    + '<section class="panel" aria-labelledby="rhythm-title">'
    + '<div class="panel-head"><div><h2 id="rhythm-title">Release rhythm</h2>'
    + '<p>How often each series is published — so you know when a figure will next move.</p></div></div>'
    + '<ul class="rhythm-list">' + rhythmItems() + '</ul>'
    + '</section>'
    + '</div>'

    + '<p class="rounding-note"><strong>A note on rounding.</strong> Figures on this site are rounded and may differ in the last digit from the releases they come from. '
    + 'Population counts are estimates: the mid-year figure is the BPS estimate for 30 June, projected from the 2020 census and vital statistics. '
    + 'The next census is in 2030.</p>';
}
