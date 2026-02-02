// app.js
import { state } from "./state.js";
import { loadExpenses, saveExpenses } from "./storage.js";
import { renderCalendar } from "./calendar.js";
import { renderList } from "./list.js";
import { renderStats } from "./stats.js";

state.expenses = loadExpenses();

const elements = {
  calendarGrid: document.getElementById("calendarGrid"),
  monthLabel: document.getElementById("monthLabel"),
  list: document.getElementById("list"),
  totalEl: document.getElementById("total"),

  rangeSelect: document.getElementById("range"),
  customRange: document.getElementById("customRange"),
  fromDate: document.getElementById("fromDate"),
  toDate: document.getElementById("toDate"),
  budgetInput: document.getElementById("budget"),
  statsTotal: document.getElementById("statsTotal"),
  statsPercent: document.getElementById("statsPercent"),
  progressBar: document.getElementById("progressBar")
};

// function refresh() {
//   renderCalendar(elements, date => {
//     state.selectedDate = date;
//     refresh();
//   });

//   renderList(elements, id => {
//     state.expenses = state.expenses.filter(e => e.id !== id);
//     saveExpenses(state.expenses);
//     refresh();
//   });
// }

// refresh();

function renderCalendar() {
  calendarGrid.innerHTML = "";
  monthLabel.textContent = formatMonth(currentMonth);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // leading blanks
  for (let i = 0; i < (firstDay + 6) % 7; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = dayKey(date);
    const total = dailyTotal(key);

    const cell = document.createElement("div");
    cell.className = "calendar-day";
    if (key === selectedDate) cell.classList.add("active");

    cell.innerHTML = `
      <div>${day}</div>
      ${total ? `<span class="sum">${total}</span>` : ""}
    `;

    cell.onclick = () => {
      selectedDate = key;
      renderCalendar();
      render();
    };

    calendarGrid.appendChild(cell);
  }
}

renderCalendar();