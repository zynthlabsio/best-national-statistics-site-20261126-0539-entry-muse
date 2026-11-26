// view-sources.js — sources & methods: where every figure comes from,
// how it is defined, and when it is released. This page is what makes the
// numbers elsewhere on the site checkable.

export function renderSources(main) {
  main.innerHTML = `
  <h1 class="section-title">Sources &amp; methods</h1>
  <p class="section-lede">Every figure on this site is a published estimate. This page names the
  publisher, the series and the reference period for each one, so any number here can be traced
  back to its release.</p>

  <section class="panel">
    <h2>The sources</h2>
    <table class="data">
      <thead><tr><th>Publisher</th><th>Series used</th><th>Used for</th></tr></thead>
      <tbody>
        <tr><td><strong>BPS — Statistics Indonesia</strong></td><td>Population censuses 1971–2020; mid-year estimates; Susenas; Sakernas; national accounts; CPI; foreign trade</td><td>Population, poverty, jobs, GDP, prices, trade, provinces</td></tr>
        <tr><td><strong>World Bank</strong></td><td>World Development Indicators</td><td>GDP per capita, life expectancy</td></tr>
        <tr><td><strong>UNDP</strong></td><td>Human Development Report 2023–24</td><td>Human Development Index and rank</td></tr>
        <tr><td><strong>APJII</strong></td><td>Indonesia internet penetration survey 2024</td><td>Internet users</td></tr>
      </tbody>
    </table>
  </section>

  <div class="grid grid-2">
    <section class="panel">
      <h2>Definitions</h2>
      <ul class="fact-list">
        <li><strong>Poverty rate</strong> — share of the population whose monthly spending per person falls below the BPS poverty line (food and non-food basic needs).</li>
        <li><strong>Open unemployment</strong> — share of the labour force not working but available for and seeking work, measured each February and August (Sakernas).</li>
        <li><strong>GDP growth</strong> — change in GDP at constant 2010 prices, year on year.</li>
        <li><strong>Inflation</strong> — change in the consumer price index across 150 cities, year on year.</li>
        <li><strong>Mid-year population</strong> — BPS estimate for 30 June, projected from the 2020 census and vital statistics.</li>
      </ul>
    </section>
    <section class="panel">
      <h2>Release rhythm</h2>
      <ul class="fact-list">
        <li><strong>GDP</strong> — quarterly, about five weeks after the quarter ends</li>
        <li><strong>Inflation &amp; trade</strong> — monthly, on the first working day</li>
        <li><strong>Jobs</strong> — twice a year, February and August rounds</li>
        <li><strong>Poverty</strong> — twice a year, March and September rounds</li>
        <li><strong>Population</strong> — mid-year estimate every year; census every ten years (next: 2030)</li>
      </ul>
      <p class="source-note">Figures on this site are rounded for readability and may differ in the
      last digit from the releases. Where an estimate has been revised by its publisher, the
      revised figure is the one shown.</p>
    </section>
  </div>`;
}
