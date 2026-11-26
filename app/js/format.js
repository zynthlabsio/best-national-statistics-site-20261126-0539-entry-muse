// format.js — small number and text formatters shared by every view.

/** Whole number with thousands separators, e.g. 281603800 -> "281,603,800". */
export function formatWhole(value) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
}

/** One decimal place, e.g. 5.03 -> "5.0". */
export function formatOneDecimal(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

/** Two decimal places, e.g. 5.031 -> "5.03". */
export function formatTwoDecimals(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Escape text before it is placed into an HTML string. */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
