// charts.js — small canvas chart renderers (line, bars, donut, pyramid).
// No library: each function takes a canvas and plain data, scales for
// devicePixelRatio, and draws axes, gridlines and value labels so a
// screenshot of the chart is readable on its own.

const INK = "#10222e";
const SOFT = "#3d5566";
const GRID = "#ddd5c3";
const ACCENT = "#0e7c7b";
const AMBER = "#dd8f26";
const RED = "#c0452f";
const TEAL_LIGHT = "#7fd1cf";

function setup(canvas, cssHeight) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.parentElement.clientWidth;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(cssHeight * ratio);
  canvas.style.height = `${cssHeight}px`;
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  ctx.font = "12px 'Avenir Next', 'Segoe UI', system-ui, sans-serif";
  return { ctx, width, height: cssHeight };
}

function niceMax(value) {
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const unit = value / pow;
  const step = unit <= 1 ? 1 : unit <= 2 ? 2 : unit <= 2.5 ? 2.5 : unit <= 5 ? 5 : 10;
  return step * pow;
}

// Line chart of {year, value} points with labelled extremes.
export function lineChart(canvas, series, { color = ACCENT, unit = "", height = 260 } = {}) {
  const { ctx, width } = setup(canvas, height);
  const pad = { l: 46, r: 14, t: 16, b: 26 };
  const values = series.map((p) => p.value);
  const min = Math.min(0, ...values);
  const max = niceMax(Math.max(...values) * 1.05);
  const x0 = series[0].year, x1 = series[series.length - 1].year;
  const X = (year) => pad.l + ((year - x0) / (x1 - x0)) * (width - pad.l - pad.r);
  const Y = (v) => pad.t + (1 - (v - min) / (max - min)) * (height - pad.t - pad.b);
  ctx.strokeStyle = GRID; ctx.fillStyle = SOFT; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const v = min + ((max - min) * i) / 4, y = Y(v);
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(width - pad.r, y); ctx.stroke();
    ctx.textAlign = "right"; ctx.fillText(`${Math.round(v)}${unit}`, pad.l - 6, y + 4);
  }
  ctx.textAlign = "center";
  for (const p of series) ctx.fillText(String(p.year), X(p.year), height - 8);
  ctx.beginPath();
  series.forEach((p, i) => { const x = X(p.year), y = Y(p.value); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
  ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.lineTo(X(x1), Y(min)); ctx.lineTo(X(x0), Y(min)); ctx.closePath();
  ctx.fillStyle = color + "22"; ctx.fill();
  ctx.fillStyle = color;
  for (const p of series) { ctx.beginPath(); ctx.arc(X(p.year), Y(p.value), 3.5, 0, Math.PI * 2); ctx.fill(); }
  const last = series[series.length - 1];
  ctx.fillStyle = INK; ctx.font = "bold 13px 'Avenir Next', 'Segoe UI', system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${last.value}${unit}`, X(last.year), Y(last.value) - 10);
}

// Vertical bars of {year, value}; negative bars turn red.
export function barChart(canvas, series, { unit = "%", height = 260 } = {}) {
  const { ctx, width } = setup(canvas, height);
  const pad = { l: 40, r: 10, t: 18, b: 26 };
  const values = series.map((p) => p.value);
  const max = niceMax(Math.max(...values) * 1.1);
  const min = Math.min(0, ...values) * 1.15;
  const Y = (v) => pad.t + (1 - (v - min) / (max - min)) * (height - pad.t - pad.b);
  const slot = (width - pad.l - pad.r) / series.length;
  ctx.strokeStyle = GRID; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const v = min + ((max - min) * i) / 4, y = Y(v);
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(width - pad.r, y); ctx.stroke();
    ctx.fillStyle = SOFT; ctx.textAlign = "right"; ctx.fillText(`${v.toFixed(1)}`, pad.l - 6, y + 4);
  }
  ctx.strokeStyle = SOFT; ctx.beginPath(); ctx.moveTo(pad.l, Y(0)); ctx.lineTo(width - pad.r, Y(0)); ctx.stroke();
  series.forEach((p, i) => {
    const x = pad.l + slot * i + slot * 0.18, w = slot * 0.64;
    ctx.fillStyle = p.value < 0 ? RED : ACCENT;
    ctx.fillRect(x, Y(Math.max(p.value, 0)), w, Math.abs(Y(p.value) - Y(0)));
    ctx.fillStyle = INK; ctx.textAlign = "center";
    ctx.font = "bold 11px 'Avenir Next', 'Segoe UI', system-ui, sans-serif";
    ctx.fillText(p.value.toFixed(2), x + w / 2, p.value < 0 ? Y(p.value) + 14 : Y(p.value) - 5);
    ctx.font = "12px 'Avenir Next', 'Segoe UI', system-ui, sans-serif";
    ctx.fillStyle = SOFT; ctx.fillText(String(p.year), x + w / 2, height - 8);
  });
}

// Donut of {name, value} slices; returns nothing, legend is HTML beside it.
export function donutChart(canvas, slices, { height = 250 } = {}) {
  const { ctx, width } = setup(canvas, height);
  const palette = [ACCENT, AMBER, "#4d7fa8", "#8a9a5b", "#b56576", "#5e548e", "#2a9d8f", "#bc6c25", "#6d6875", "#386641", "#9b2226"];
  const total = slices.reduce((s, x) => s + x.value, 0);
  const cx = width / 2, cy = height / 2, r = Math.min(width, height) / 2 - 8, inner = r * 0.58;
  let angle = -Math.PI / 2;
  slices.forEach((s, i) => {
    const sweep = (s.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, angle, angle + sweep);
    ctx.arc(cx, cy, inner, angle + sweep, angle, true);
    ctx.closePath();
    ctx.fillStyle = palette[i % palette.length];
    ctx.fill();
    angle += sweep;
  });
  ctx.fillStyle = INK; ctx.textAlign = "center";
  ctx.font = "bold 15px 'Avenir Next', 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("GDP 2024", cx, cy - 2);
  ctx.font = "12px 'Avenir Next', 'Segoe UI', system-ui, sans-serif";
  ctx.fillStyle = SOFT;
  ctx.fillText("share by industry", cx, cy + 15);
  return palette;
}

// Population pyramid: male bars left, female bars right, per cent of total.
export function pyramidChart(canvas, rows, { height = 330 } = {}) {
  const { ctx, width } = setup(canvas, height);
  const mid = width / 2, rowH = (height - 24) / rows.length;
  const max = Math.max(...rows.flatMap((r) => [r.male, r.female])) * 1.15;
  const scale = (mid - 70) / max;
  ctx.textAlign = "center"; ctx.fillStyle = SOFT;
  ctx.fillText("Male", mid - (mid - 70) / 2, 12);
  ctx.fillText("Female", mid + (mid - 70) / 2, 12);
  rows.forEach((r, i) => {
    const y = 20 + i * rowH;
    ctx.fillStyle = ACCENT;
    ctx.fillRect(mid - 34 - r.male * scale, y + 2, r.male * scale, rowH - 5);
    ctx.fillStyle = AMBER;
    ctx.fillRect(mid + 34, y + 2, r.female * scale, rowH - 5);
    ctx.fillStyle = INK; ctx.textAlign = "center";
    ctx.fillText(r.group, mid, y + rowH - 6);
    ctx.fillStyle = SOFT; ctx.textAlign = "right";
    ctx.fillText(`${r.male.toFixed(1)}%`, mid - 40 - r.male * scale, y + rowH - 6);
    ctx.textAlign = "left";
    ctx.fillText(`${r.female.toFixed(1)}%`, mid + 40 + r.female * scale, y + rowH - 6);
  });
}
