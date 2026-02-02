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

/* Tab switching logic */ 
const tabs = [
  { button: tabCalendar, view: calendarView, render: refresh },
  { button: tabStats, view: statsView, render: renderStats }
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