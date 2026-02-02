// calendar.js
import { dayKey, formatMonth } from "./dates.js";
import { dailyTotal } from "./expenses.js";
import { state } from "./state.js";

export function renderCalendar(elements, onSelectDate) {
  const { calendarGrid, monthLabel } = elements;

  calendarGrid.innerHTML = "";
  monthLabel.textContent = formatMonth(state.currentMonth);

  const year = state.currentMonth.getFullYear();
  const month = state.currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < (firstDay + 6) % 7; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = dayKey(date);
    const total = dailyTotal(state.expenses, key);

    const cell = document.createElement("div");
    cell.className = "calendar-day";
    if (key === state.selectedDate) cell.classList.add("active");

    cell.innerHTML = `
      <div>${day}</div>
      ${total ? `<span class="sum">${total}</span>` : ""}
    `;

    cell.onclick = () => onSelectDate(key);
    calendarGrid.appendChild(cell);
  }
}
