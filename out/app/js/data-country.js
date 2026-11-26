// data-country.js — every figure the site shows, in one place, each with
// its source and year. Published estimates: Statistics Indonesia (BPS),
// the World Bank, UNDP and APJII. Values are rounded for display; the
// sources view lists definitions and release dates.

export const headline = {
  population: { value: 281603800, label: "Population", note: "Mid-year estimate", source: "BPS", year: 2024 },
  gdpGrowth: { value: 5.03, label: "GDP growth", note: "Year on year, 2024", source: "BPS", year: 2024 },
  gdpPerCapita: { value: 4981, label: "GDP per capita", note: "Current US$", source: "World Bank", year: 2024 },
  inflation: { value: 1.57, label: "Inflation", note: "Dec 2024, year on year", source: "BPS", year: 2024 },
  unemployment: { value: 4.76, label: "Open unemployment", note: "February 2025", source: "BPS", year: 2025 },
  poverty: { value: 8.57, label: "Poverty rate", note: "24.06 million people", source: "BPS", year: 2024 },
};

// Census counts and the mid-2024 estimate, in millions of people.
export const populationSeries = [
  { year: 1971, value: 119.2 }, { year: 1980, value: 147.5 },
  { year: 1990, value: 179.4 }, { year: 2000, value: 206.3 },
  { year: 2010, value: 237.6 }, { year: 2020, value: 270.2 },
  { year: 2024, value: 281.6 },
];

// Share of the population living in urban areas, per cent (BPS).
export const urbanSeries = [
  { year: 1971, value: 17.4 }, { year: 1980, value: 22.3 },
  { year: 1990, value: 30.9 }, { year: 2000, value: 42.0 },
  { year: 2010, value: 49.8 }, { year: 2020, value: 56.6 },
  { year: 2024, value: 58.6 },
];

// Population by five-year age group, per cent of the total (BPS, 2024).
export const agePyramid = [
  { group: "0–4", male: 4.4, female: 4.2 }, { group: "5–9", male: 4.3, female: 4.1 },
  { group: "10–14", male: 4.2, female: 4.0 }, { group: "15–19", male: 4.2, female: 4.0 },
  { group: "20–24", male: 4.3, female: 4.1 }, { group: "25–29", male: 4.2, female: 4.0 },
  { group: "30–34", male: 4.0, female: 3.9 }, { group: "35–39", male: 3.8, female: 3.7 },
  { group: "40–44", male: 3.5, female: 3.4 }, { group: "45–49", male: 3.1, female: 3.1 },
  { group: "50–54", male: 2.7, female: 2.7 }, { group: "55–59", male: 2.2, female: 2.3 },
  { group: "60–64", male: 1.8, female: 1.9 }, { group: "65–69", male: 1.3, female: 1.5 },
  { group: "70–74", male: 0.9, female: 1.1 }, { group: "75+", male: 0.9, female: 1.3 },
];

// Real GDP growth, per cent year on year (BPS).
export const gdpGrowthSeries = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 }, { year: 2017, value: 5.07 },
  { year: 2018, value: 5.17 }, { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// December consumer-price inflation, per cent year on year (BPS).
export const inflationSeries = [
  { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
];

// Poverty rate, per cent of the population, September each year (BPS).
export const povertySeries = [
  { year: 2015, value: 11.13 }, { year: 2017, value: 10.12 }, { year: 2019, value: 9.22 },
  { year: 2020, value: 10.19 }, { year: 2021, value: 9.71 }, { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 }, { year: 2024, value: 8.57 },
];

// GDP by industry, share of current-price GDP, per cent (BPS, 2024).
export const gdpSectors = [
  { name: "Manufacturing", value: 19.0 }, { name: "Wholesale & retail trade", value: 13.1 },
  { name: "Agriculture & fisheries", value: 12.6 }, { name: "Construction", value: 10.1 },
  { name: "Mining & quarrying", value: 8.9 }, { name: "Transport & storage", value: 6.4 },
  { name: "Information & communication", value: 4.3 }, { name: "Financial services", value: 4.1 },
  { name: "Public administration", value: 3.4 }, { name: "Education", value: 3.1 },
  { name: "All other industries", value: 15.0 },
];

// The sixteen most populous provinces: mid-2024 estimates (BPS).
// population in millions, density in people per km², both rounded.
export const provinces = [
  { name: "West Java", capital: "Bandung", population: 50.3, density: 1420 },
  { name: "East Java", capital: "Surabaya", population: 42.1, density: 880 },
  { name: "Central Java", capital: "Semarang", population: 38.2, density: 1160 },
  { name: "North Sumatra", capital: "Medan", population: 15.9, density: 218 },
  { name: "Banten", capital: "Serang", population: 12.6, density: 1300 },
  { name: "Jakarta", capital: "Jakarta", population: 10.6, density: 16100 },
  { name: "South Sulawesi", capital: "Makassar", population: 9.6, density: 210 },
  { name: "Lampung", capital: "Bandar Lampung", population: 9.5, density: 282 },
  { name: "South Sumatra", capital: "Palembang", population: 8.9, density: 102 },
  { name: "Riau", capital: "Pekanbaru", population: 6.9, density: 79 },
  { name: "West Sumatra", capital: "Padang", population: 5.9, density: 140 },
  { name: "West Nusa Tenggara", capital: "Mataram", population: 5.7, density: 305 },
  { name: "Aceh", capital: "Banda Aceh", population: 5.6, density: 98 },
  { name: "Bali", capital: "Denpasar", population: 4.4, density: 764 },
  { name: "East Kalimantan", capital: "Samarinda", population: 4.1, density: 33 },
  { name: "Jambi", capital: "Jambi City", population: 3.8, density: 76 },
];

// Indicator table rows for the overview: name, value, source, year.
export const indicatorTable = [
  { name: "GDP at current prices", value: "Rp 22,139 trillion", source: "BPS", year: 2024 },
  { name: "Exports of goods", value: "US$ 264.7 billion", source: "BPS", year: 2024 },
  { name: "Imports of goods", value: "US$ 233.7 billion", source: "BPS", year: 2024 },
  { name: "Trade surplus", value: "US$ 31.0 billion", source: "BPS", year: 2024 },
  { name: "Life expectancy at birth", value: "71.9 years", source: "World Bank", year: 2023 },
  { name: "Human Development Index", value: "0.728 (rank 112)", source: "UNDP", year: 2023 },
  { name: "Adult literacy rate", value: "96.5%", source: "BPS", year: 2024 },
  { name: "Internet users", value: "79.5% of population", source: "APJII", year: 2024 },
  { name: "Mean years of schooling", value: "8.9 years", source: "BPS", year: 2024 },
  { name: "Access to safe drinking water", value: "91.7% of households", source: "BPS", year: 2024 },
];
