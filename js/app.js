// app.js
import { state } from "./state.js";
import { loadExpenses, saveExpenses } from "./storage.js";
import { renderCalendar } from "./calendar.js";
import { renderList } from "./list.js";
import { renderStats } from "./stats.js";

state.expenses = loadExpenses();

const elements = {
  tabCalendar: document.getElementById("tabCalendar"),
  tabStats: document.getElementById("tabStats"),
  calendarView: document.getElementById("calendarView"),
  statsView: document.getElementById("statsView"),

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

// Check for missing elements
for (const [key, el] of Object.entries(elements)) {
  if (!el) {
    console.warn(`Missing DOM element: ${key}`);
  }
}

/* Tab switching logic */ 
const tabs = [
  { button: elements.tabCalendar, view: elements.calendarView, render: refresh },
  { button: elements.tabStats, view: elements.statsView, render: renderStats }
];


tabs.forEach(({ button, view, render }) => {
  button.addEventListener("click", () => {
    tabs.forEach(t => {
      t.view.hidden = true;
      t.button.classList.remove("active");
    });
    view.hidden = false;
    button.classList.add("active");
    render();
  });
});

/* Refresh function to update views */
function refresh() {
  renderCalendar(elements, date => {
    state.selectedDate = date;
    refresh();
  });

  renderList(elements, id => {
    state.expenses = state.expenses.filter(e => e.id !== id);
    saveExpenses(state.expenses);
    refresh();
  });
}

refresh();

