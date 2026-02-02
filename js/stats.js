// stats.js
import { today, dateNDaysAgo, inRange } from "./dates.js";
import { totalInRange } from "./expenses.js";
import { state } from "./state.js";

export function renderStats(elements) {
  const {
    rangeSelect,
    customRange,
    fromDate,
    toDate,
    budgetInput,
    statsTotal,
    statsPercent,
    progressBar
  } = elements;

  let from, to;

  if (rangeSelect.value === "custom") {
    customRange.hidden = false;
    from = fromDate.value;
    to = toDate.value;
    if (!from || !to) return;
  } else {
    customRange.hidden = true;
    from = dateNDaysAgo(Number(rangeSelect.value));
    to = today();
  }

  const total = totalInRange(state.expenses, from, to);
  statsTotal.textContent = `Total: ${total}`;

  const budget = Number(budgetInput.value);
  if (budget > 0) {
    const pct = Math.min(100, Math.round((total / budget) * 100));
    progressBar.style.width = pct + "%";
    statsPercent.textContent = `${pct}% of budget used`;
  } else {
    progressBar.style.width = "0%";
    statsPercent.textContent = "No budget set";
  }
}
