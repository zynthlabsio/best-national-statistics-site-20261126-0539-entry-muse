// format.js — number and text formatting helpers shared by every view.

const nf = new Intl.NumberFormat("en-GB");
const nf1 = new Intl.NumberFormat("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function whole(value) { return nf.format(Math.round(value)); }
export function oneDecimal(value) { return nf1.format(value); }
export function twoDecimals(value) { return nf2.format(value); }

export function millions(value) {
  if (value >= 100) return `${oneDecimal(value)} million`;
  return `${twoDecimals(value)} million`;
}

export function signed(value, suffix = "%") {
  const sign = value > 0 ? "+" : "";
  return `${sign}${twoDecimals(value)}${suffix}`;
}

export function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
