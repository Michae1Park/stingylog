// list.js
import { expensesForDate } from "./expenses.js";
import { state } from "./state.js";
import { enableSwipe } from "./swipe.js";

export function renderList(elements, onDelete) {
  const { list, totalEl } = elements;

  list.innerHTML = "";
  const items = expensesForDate(state.expenses, state.selectedDate);

  let total = 0;

  items.forEach(e => {
    total += e.amount;

    const li = document.createElement("li");
    li.className = "expense-item";

    const content = document.createElement("div");
    content.className = "expense-content";

    content.innerHTML = `
      <span>${e.note || "(no note)"}</span>
      <strong>${e.amount}</strong>
    `;

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "✕";
    del.onclick = () => onDelete(e.id);

    li.appendChild(content);
    li.appendChild(del);
    list.appendChild(li);

    enableSwipe(content, () => onDelete(e.id));
  });

  totalEl.textContent = `Total (${state.selectedDate}): ${total}`;
}
