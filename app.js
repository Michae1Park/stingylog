const calendarGrid = document.getElementById("calendarGrid");
const monthLabel = document.getElementById("monthLabel");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentMonth = new Date();
currentMonth.setDate(1);

const amountInput = document.getElementById("amount");
const noteInput = document.getElementById("note");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// --- stats logib --
const calendarView = document.getElementById("calendarView");
const statsView = document.getElementById("statsView");
const tabCalendar = document.getElementById("tabCalendar");
const tabStats = document.getElementById("tabStats");

const rangeSelect = document.getElementById("range");
const customRange = document.getElementById("customRange");
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const budgetInput = document.getElementById("budget");

const statsTotal = document.getElementById("statsTotal");
const statsPercent = document.getElementById("statsPercent");
const progressBar = document.getElementById("progressBar");


// ---- date helpers ----
function today() {
  return new Date().toISOString().slice(0, 10);
}

let selectedDate = today();

// ---- persistence ----
function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// ---- data helpers ----
function expensesFor(date) {
  return expenses.filter(e => e.date === date);
}

// ---- rendering ----
function render() {
  list.innerHTML = "";

  const dayExpenses = expensesFor(selectedDate);
  let total = 0;

  dayExpenses.forEach(e => {
    total += e.amount;

    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = e.note || "(no note)";

    const amount = document.createElement("strong");
    amount.textContent = e.amount;

    const del = document.createElement("button");
    del.textContent = "✕";
    del.style.background = "transparent";
    del.style.color = "#999";
    del.style.border = "none";
    del.style.fontSize = "18px";
    del.style.cursor = "pointer";

    del.onclick = () => {
      expenses = expenses.filter(x => x.id !== e.id);
      save();
      render();
    };

    li.appendChild(text);
    li.appendChild(amount);
    li.appendChild(del);

    list.appendChild(li);
  });

  totalEl.textContent = `Total (${selectedDate}): ${total}`;
}

// ---- add expense ----
addBtn.onclick = () => {
  const amount = Number(amountInput.value);
  const note = noteInput.value.trim();

  if (!amount) return;

  expenses.push({
    id: crypto.randomUUID(),
    amount,
    note,
    date: selectedDate,
    createdAt: Date.now()
  });

  save();
  render();

  amountInput.value = "";
  noteInput.value = "";
};


function formatMonth(date) {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

function dailyTotal(dateStr) {
  return expenses
    .filter(e => e.date === dateStr)
    .reduce((sum, e) => sum + e.amount, 0);
}

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

prevMonthBtn.onclick = () => {
  currentMonth.setMonth(currentMonth.getMonth() - 1);
  renderCalendar();
};

nextMonthBtn.onclick = () => {
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  renderCalendar();
};


// -- stats logic
tabCalendar.onclick = () => {
  calendarView.hidden = false;
  statsView.hidden = true;
  tabCalendar.classList.add("active");
  tabStats.classList.remove("active");
};

tabStats.onclick = () => {
  calendarView.hidden = true;
  statsView.hidden = false;
  tabStats.classList.add("active");
  tabCalendar.classList.remove("active");
  renderStats();
};

function dateNDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n + 1);
  return d.toISOString().slice(0, 10);
}

function inRange(date, from, to) {
  return date >= from && date <= to;
}

function renderStats() {
  let from, to;

  if (rangeSelect.value === "custom") {
    customRange.hidden = false;
    from = fromDate.value;
    to = toDate.value;
    if (!from || !to) return;
  } else {
    customRange.hidden = true;
    const days = Number(rangeSelect.value);
    from = dateNDaysAgo(days);
    to = today();
  }

  const total = expenses
    .filter(e => inRange(e.date, from, to))
    .reduce((sum, e) => sum + e.amount, 0);

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

rangeSelect.onchange =
budgetInput.oninput =
fromDate.onchange =
toDate.onchange = renderStats;


renderCalendar();
render();