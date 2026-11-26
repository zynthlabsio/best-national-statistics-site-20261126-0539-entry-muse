// data-country.js — every figure on the site, in one place.
// Sources: Statistics Indonesia (BPS), World Bank, UNDP, APJII.
// Figures are rounded; years and publishers travel with each value.

export const COUNTRY = {
  name: 'Indonesia',
  provinces: 38,
  islands: 17508,
  population: 281603800,
  populationLabel: '281.6 million',
};

export const HEADLINES = [
  {
    label: 'Population',
    value: '281.6',
    unit: 'million',
    note: 'Mid-year estimate, 30 June 2024',
    source: 'BPS',
    year: '2024',
  },
  {
    label: 'GDP growth',
    value: '5.03',
    unit: '%',
    note: 'Year on year, constant 2010 prices',
    source: 'BPS',
    year: '2024',
  },
  {
    label: 'GDP per capita',
    value: 'US$4,981',
    unit: '',
    note: 'Current US dollars',
    source: 'World Bank',
    year: '2024',
  },
  {
    label: 'Inflation',
    value: '1.57',
    unit: '%',
    note: 'December, year on year',
    source: 'BPS',
    year: '2024',
  },
  {
    label: 'Unemployment',
    value: '4.76',
    unit: '%',
    note: 'Open unemployment, February round',
    source: 'BPS',
    year: '2025',
  },
  {
    label: 'Poverty',
    value: '8.57',
    unit: '%',
    note: '24.06 million people, September round',
    source: 'BPS',
    year: '2024',
  },
];

// Census counts plus the mid-2024 estimate, in millions (BPS).
export const POPULATION_SERIES = [
  { year: 1971, value: 119.2 },
  { year: 1980, value: 147.5 },
  { year: 1990, value: 179.4 },
  { year: 2000, value: 206.3 },
  { year: 2010, value: 237.6 },
  { year: 2020, value: 270.2 },
  { year: 2024, value: 281.6 },
];

// Share of the population living in urban areas, percent (BPS).
export const URBAN_SERIES = [
  { year: 1971, value: 17.4 },
  { year: 1980, value: 22.3 },
  { year: 1990, value: 30.9 },
  { year: 2000, value: 42.0 },
  { year: 2010, value: 49.8 },
  { year: 2020, value: 56.6 },
  { year: 2024, value: 58.6 },
];

// Age pyramid, 2024: percent of total population, male / female (BPS projection).
export const AGE_PYRAMID = [
  { group: '0–4', male: 4.4, female: 4.2 },
  { group: '5–9', male: 4.3, female: 4.1 },
  { group: '10–14', male: 4.2, female: 4.0 },
  { group: '15–19', male: 4.2, female: 4.0 },
  { group: '20–24', male: 4.3, female: 4.1 },
  { group: '25–29', male: 4.2, female: 4.0 },
  { group: '30–34', male: 4.0, female: 3.9 },
  { group: '35–39', male: 3.8, female: 3.7 },
  { group: '40–44', male: 3.5, female: 3.4 },
  { group: '45–49', male: 3.1, female: 3.1 },
  { group: '50–54', male: 2.7, female: 2.7 },
  { group: '55–59', male: 2.2, female: 2.3 },
  { group: '60–64', male: 1.8, female: 1.9 },
  { group: '65–69', male: 1.3, female: 1.5 },
  { group: '70–74', male: 0.9, female: 1.1 },
  { group: '75+', male: 0.9, female: 1.3 },
];

// GDP growth, percent year on year, constant 2010 prices (BPS).
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 },
  { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 },
  { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// December inflation, percent year on year, consumer price index (BPS).
export const INFLATION_DECEMBER = [
  { year: 2019, value: 2.72 },
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Poverty rate, percent, September each year (BPS Susenas).
export const POVERTY_RATE = [
  { year: 2015, value: 11.13 },
  { year: 2017, value: 10.12 },
  { year: 2019, value: 9.22 },
  { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 },
  { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 8.57 },
];

// GDP by industry, percent of current-price GDP, 2024 (BPS).
export const INDUSTRY_SHARES = [
  { label: 'Manufacturing', value: 19.0, color: '#dd8f26' },
  { label: 'Wholesale & retail trade', value: 13.1, color: '#b06f14' },
  { label: 'Agriculture & fisheries', value: 12.6, color: '#3f7a4e' },
  { label: 'Construction', value: 10.1, color: '#7a6a4f' },
  { label: 'Mining & quarrying', value: 8.9, color: '#5c5344' },
  { label: 'Transport & storage', value: 6.4, color: '#8a7f6c' },
  { label: 'Information & communication', value: 4.3, color: '#c98a3d' },
  { label: 'Financial services', value: 4.1, color: '#a8875a' },
  { label: 'Public administration', value: 3.4, color: '#6b7f8f' },
  { label: 'Education', value: 3.1, color: '#96855f' },
  { label: 'All other industries', value: 15.0, color: '#d8cbb2' },
];

// Sixteen largest provinces, mid-2024 estimates (BPS).
// Population in millions, density in people per km².
export const PROVINCES = [
  { province: 'West Java', capital: 'Bandung', population: 50.3, density: 1420 },
  { province: 'East Java', capital: 'Surabaya', population: 42.1, density: 880 },
  { province: 'Central Java', capital: 'Semarang', population: 38.2, density: 1160 },
  { province: 'North Sumatra', capital: 'Medan', population: 15.9, density: 218 },
  { province: 'Banten', capital: 'Serang', population: 12.6, density: 1300 },
  { province: 'Jakarta', capital: 'Jakarta', population: 10.6, density: 16100 },
  { province: 'South Sulawesi', capital: 'Makassar', population: 9.6, density: 210 },
  { province: 'Lampung', capital: 'Bandar Lampung', population: 9.5, density: 282 },
  { province: 'South Sumatra', capital: 'Palembang', population: 8.9, density: 102 },
  { province: 'Riau', capital: 'Pekanbaru', population: 6.9, density: 79 },
  { province: 'West Sumatra', capital: 'Padang', population: 5.9, density: 140 },
  { province: 'West Nusa Tenggara', capital: 'Mataram', population: 5.7, density: 305 },
  { province: 'Aceh', capital: 'Banda Aceh', population: 5.6, density: 98 },
  { province: 'Bali', capital: 'Denpasar', population: 4.4, density: 764 },
  { province: 'East Kalimantan', capital: 'Samarinda', population: 4.1, density: 33 },
  { province: 'Jambi', capital: 'Jambi City', population: 3.8, density: 76 },
];

export const PROVINCE_TOTALS = {
  topSixteenPopulation: 248.4,
  topSixteenShare: 88,
  javaThreePopulation: 130.6,
};

export const TEN_FIGURES = [
  { name: 'GDP at current prices', value: 'Rp 22,139 trillion', source: 'BPS', year: '2024' },
  { name: 'Exports of goods', value: 'US$ 264.7 billion', source: 'BPS', year: '2024' },
  { name: 'Imports of goods', value: 'US$ 233.7 billion', source: 'BPS', year: '2024' },
  { name: 'Trade surplus', value: 'US$ 31.0 billion', source: 'BPS', year: '2024' },
  { name: 'Life expectancy at birth', value: '71.9 years', source: 'World Bank', year: '2023' },
  { name: 'Human Development Index', value: '0.728 (rank 112)', source: 'UNDP', year: '2023' },
  { name: 'Adult literacy rate', value: '96.5%', source: 'BPS', year: '2024' },
  { name: 'Internet users', value: '79.5% of population', source: 'APJII', year: '2024' },
  { name: 'Mean years of schooling', value: '8.9 years', source: 'BPS', year: '2024' },
  { name: 'Access to safe drinking water', value: '91.7% of households', source: 'BPS', year: '2024' },
];

export const PEOPLE_FACTS = [
  { text: 'Median age 30.4 years — a young country, slowly ageing.', source: 'BPS', year: '2024' },
  { text: 'Life expectancy at birth is 71.9 years.', source: 'World Bank', year: '2023' },
  { text: '58.6% live in urban areas, up from 17.4% in 1971.', source: 'BPS', year: '2024' },
  { text: 'Total fertility rate: 2.1 children per woman.', source: 'BPS', year: '2023' },
  { text: 'Adult literacy rate is 96.5%.', source: 'BPS', year: '2024' },
  { text: 'Mean years of schooling: 8.9 years.', source: 'BPS', year: '2024' },
  { text: 'Human Development Index 0.728, rank 112 of 193 countries.', source: 'UNDP', year: '2023' },
  { text: '79.5% of the population use the internet.', source: 'APJII', year: '2024' },
  { text: 'More than 700 living local languages are spoken across the archipelago.', source: 'BPS / Ethnologue', year: '' },
];

export const ECONOMY_FACTS = [
  { text: 'Open unemployment is 4.76%.', source: 'BPS', year: 'February 2025' },
  { text: '143.6 million people are in work.', source: 'BPS', year: 'February 2025' },
  { text: '59.1% of workers are in informal work.', source: 'BPS', year: 'February 2025' },
  { text: 'Average monthly net wage is about Rp 3.0 million.', source: 'BPS', year: 'February 2025' },
  { text: 'Exports of goods were US$ 264.7 billion in 2024.', source: 'BPS', year: '2024' },
  { text: 'Imports of goods were US$ 233.7 billion in 2024.', source: 'BPS', year: '2024' },
  { text: 'Trade surplus of US$ 31.0 billion in 2024 — the fifth in a row.', source: 'BPS', year: '2024' },
  { text: 'Three biggest export earners: coal, palm oil and steel.', source: 'BPS', year: '2024' },
];

export const PUBLISHERS = [
  {
    publisher: 'BPS — Statistics Indonesia',
    series: 'Censuses 1971–2020, mid-year estimates, Susenas, Sakernas, national accounts, CPI, foreign trade',
    usedFor: 'Population, poverty, jobs, GDP, prices, trade, provinces',
  },
  {
    publisher: 'World Bank',
    series: 'World Development Indicators',
    usedFor: 'GDP per capita, life expectancy',
  },
  {
    publisher: 'UNDP',
    series: 'Human Development Report 2023–24',
    usedFor: 'Human Development Index and rank',
  },
  {
    publisher: 'APJII',
    series: 'Internet penetration survey 2024',
    usedFor: 'Internet users',
  },
];

export const DEFINITIONS = [
  {
    term: 'Poverty rate',
    text: 'The share of the population whose monthly spending per person falls below the BPS poverty line.',
  },
  {
    term: 'Open unemployment',
    text: 'The share of the labour force not working but available for and seeking work, measured each February and August (Sakernas).',
  },
  {
    term: 'GDP growth',
    text: 'The change in GDP at constant 2010 prices, year on year.',
  },
  {
    term: 'Inflation',
    text: 'The change in the consumer price index across 150 cities, year on year.',
  },
  {
    term: 'Mid-year population',
    text: 'The BPS estimate for 30 June, projected from the 2020 census and vital statistics.',
  },
];

export const RELEASE_RHYTHM = [
  { release: 'GDP', rhythm: 'Quarterly, about five weeks after the quarter ends.' },
  { release: 'Inflation & trade', rhythm: 'Monthly, on the first working day.' },
  { release: 'Jobs', rhythm: 'Twice a year, the February and August rounds.' },
  { release: 'Poverty', rhythm: 'Twice a year, the March and September rounds.' },
  { release: 'Population', rhythm: 'Mid-year estimate every year; census every ten years (next in 2030).' },
];
