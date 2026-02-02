// dates.js
export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

export function formatMonth(date) {
  return date.toLocaleString("en-US", {
    month: "long",
    year: "numeric"
  });
}

export function dateNDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n + 1);
  return d.toISOString().slice(0, 10);
}

export function inRange(date, from, to) {
  return date >= from && date <= to;
}
