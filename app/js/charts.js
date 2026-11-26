// charts.js — the site's own canvas charts: line, bar, donut and a
// mirrored horizontal-bar population pyramid. Axes, gridlines and value
// labels are all drawn on the canvas; nothing is loaded from elsewhere.

export const AMBER = '#dd8f26';
export const AMBER_DEEP = '#b06f14';
export const INK = '#241d12';
export const INK_SOFT = '#5c5344';
export const INK_FAINT = '#8a7f6c';
export const GRID = '#e2d7c2';
export const RED = '#c0452f';
export const GREEN = '#3f7a4e';

/** Size a canvas to its box (crisp on high-density screens) and return
 *  its 2d context plus CSS width and height. */
export function prepareCanvas(canvas, heightCss) {
  const boxWidth = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  const ratio = window.devicePixelRatio || 1;
  canvas.style.height = `${heightCss}px`;
  canvas.width = Math.round(boxWidth * ratio);
  canvas.height = Math.round(heightCss * ratio);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, boxWidth, heightCss);
  return { ctx, width: boxWidth, height: heightCss };
}

function niceCeil(value) {
  if (value <= 0) return 1;
  const power = Math.pow(10, Math.floor(Math.log10(value)));
  const scaled = value / power;
  const step = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return step * power;
}

function niceFloor(value) {
  if (value >= 0) return 0;
  return -niceCeil(-value);
}

/** Shared plot frame: y gridlines with labels, x labels, zero line. */
function frame(ctx, width, height, pad, min, max, xLabels, formatValue) {
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const steps = 4;
  ctx.font = '11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.textBaseline = 'middle';
  for (let i = 0; i <= steps; i++) {
    const value = min + ((max - min) * i) / steps;
    const y = pad.top + plotH - ((value - min) / (max - min)) * plotH;
    ctx.strokeStyle = value === 0 ? '#c9b995' : GRID;
    ctx.lineWidth = value === 0 ? 1.4 : 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + plotW, y);
    ctx.stroke();
    ctx.fillStyle = INK_FAINT;
    ctx.textAlign = 'right';
    ctx.fillText(formatValue(value), pad.left - 8, y);
  }
  ctx.fillStyle = INK_SOFT;
  ctx.textAlign = 'center';
  xLabels.forEach((label, i) => {
    const x = pad.left + (plotW * (xLabels.length === 1 ? 0.5 : i / (xLabels.length - 1)));
    ctx.fillText(String(label), x, height - pad.bottom + 16);
  });
  return { plotW, plotH, xFor: (i) => pad.left + (plotW * (xLabels.length === 1 ? 0.5 : i / (xLabels.length - 1))), yFor: (v) => pad.top + plotH - ((v - min) / (max - min)) * plotH };
}

/** Line chart. points: [{label, value}]. options: {color, unit, decimals}. */
export function drawLineChart(canvas, points, options = {}) {
  const color = options.color || AMBER;
  const decimals = options.decimals ?? 1;
  const formatValue = (v) => v.toFixed(decimals) + (options.unit || '');
  const { ctx, width, height } = prepareCanvas(canvas, options.height || 260);
  const values = points.map((p) => p.value);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const min = Math.min(0, niceFloor(rawMin * 0.95));
  const max = niceCeil(rawMax * 1.08);
  const pad = { left: 52, right: 14, top: 22, bottom: 28 };
  const f = frame(ctx, width, height, pad, min, max, points.map((p) => p.label), (v) => v.toFixed(0));
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = f.xFor(i);
    const y = f.yFor(p.value);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.font = 'bold 11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  points.forEach((p, i) => {
    const x = f.xFor(i);
    const y = f.yFor(p.value);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textAlign = i === 0 ? 'left' : i === points.length - 1 ? 'right' : 'center';
    ctx.fillText(formatValue(p.value), x, y - 13);
  });
}

/** Vertical bar chart. points: [{label, value}]. options: {color,
 *  negativeColor, unit, decimals}. A negative bar uses negativeColor. */
export function drawBarChart(canvas, points, options = {}) {
  const color = options.color || AMBER;
  const negativeColor = options.negativeColor || RED;
  const decimals = options.decimals ?? 2;
  const formatValue = (v) => v.toFixed(decimals) + (options.unit || '');
  const { ctx, width, height } = prepareCanvas(canvas, options.height || 260);
  const values = points.map((p) => p.value);
  const rawMin = Math.min(0, ...values);
  const rawMax = Math.max(...values);
  const min = rawMin < 0 ? niceFloor(rawMin * 1.15) : 0;
  const max = niceCeil(rawMax * 1.1);
  const pad = { left: 52, right: 14, top: 24, bottom: 28 };
  const f = frame(ctx, width, height, pad, min, max, points.map((p) => p.label), (v) => v.toFixed(0));
  const slot = f.plotW / points.length;
  const barW = Math.min(44, slot * 0.62);
  const zeroY = f.yFor(0);
  ctx.font = 'bold 11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  points.forEach((p, i) => {
    const x = f.xFor(i) - barW / 2;
    const y = f.yFor(p.value);
    ctx.fillStyle = p.value < 0 ? negativeColor : color;
    if (p.value >= 0) ctx.fillRect(x, y, barW, zeroY - y);
    else ctx.fillRect(x, zeroY, barW, y - zeroY);
    ctx.fillStyle = p.value < 0 ? negativeColor : INK;
    ctx.textAlign = 'center';
    ctx.fillText(formatValue(p.value), f.xFor(i), p.value >= 0 ? y - 11 : y + 12);
  });
}

/** Donut chart. slices: [{label, value, color}]. options: {centerLabel}. */
export function drawDonutChart(canvas, slices, options = {}) {
  const height = options.height || 260;
  const { ctx, width } = prepareCanvas(canvas, height);
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const cx = width / 2;
  const cy = height / 2;
  const outer = Math.min(width, height) / 2 - 14;
  const inner = outer * 0.58;
  let angle = -Math.PI / 2;
  slices.forEach((slice) => {
    const sweep = (slice.value / total) * Math.PI * 2;
    ctx.fillStyle = slice.color || AMBER;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, outer, angle, angle + sweep);
    ctx.closePath();
    ctx.fill();
    angle += sweep;
  });
  ctx.fillStyle = '#fffdf8';
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 15px Georgia, "Times New Roman", serif';
  ctx.fillText(options.centerLabel || '100%', cx, cy - 8);
  ctx.font = '11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.fillStyle = INK_SOFT;
  ctx.fillText(options.centerNote || 'of GDP', cx, cy + 12);
}

/** Population pyramid: mirrored horizontal bars, men left, women right.
 *  groups: [{group, male, female}] in percent of total population. */
export function drawPyramidChart(canvas, groups, options = {}) {
  const maleColor = options.maleColor || AMBER;
  const femaleColor = options.femaleColor || '#8a7f6c';
  const height = options.height || 430;
  const { ctx, width } = prepareCanvas(canvas, height);
  const labelW = 46;
  const top = 30;
  const bottom = 26;
  const plotH = height - top - bottom;
  const rowH = plotH / groups.length;
  const barH = Math.min(15, rowH * 0.62);
  const centre = labelW + (width - labelW) / 2;
  const half = (width - labelW) / 2 - 34;
  const maxValue = Math.max(...groups.flatMap((g) => [g.male, g.female]));
  const scale = half / (maxValue * 1.15);
  ctx.font = '11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = INK_SOFT;
  ctx.fillText('Men', centre - half / 2, 12);
  ctx.fillText('Women', centre + half / 2, 12);
  groups.forEach((g, i) => {
    const y = top + i * rowH + rowH / 2;
    ctx.fillStyle = INK_SOFT;
    ctx.textAlign = 'right';
    ctx.fillText(g.group, labelW - 8, y);
    const maleW = g.male * scale;
    const femaleW = g.female * scale;
    ctx.fillStyle = maleColor;
    ctx.fillRect(centre - maleW, y - barH / 2, maleW, barH);
    ctx.fillStyle = femaleColor;
    ctx.fillRect(centre, y - barH / 2, femaleW, barH);
    ctx.fillStyle = INK;
    ctx.font = '10.5px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(g.male.toFixed(1), centre - maleW - 5, y);
    ctx.textAlign = 'left';
    ctx.fillText(g.female.toFixed(1), centre + femaleW + 5, y);
    ctx.font = '11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  });
  ctx.strokeStyle = GRID;
  ctx.beginPath();
  ctx.moveTo(centre, top - 6);
  ctx.lineTo(centre, top + plotH);
  ctx.stroke();
  ctx.fillStyle = INK_FAINT;
  ctx.textAlign = 'center';
  ctx.fillText('Share of total population, %  ·  2024', width / 2, height - 8);
}
