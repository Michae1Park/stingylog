// calendar.js
import { dayKey, formatMonth } from "./dates.js";
import { dailyTotal } from "./expenses.js";
import { state } from "./state.js";

export function renderCalendar(elements, onSelectDate) {
  const { calendarGrid, monthLabel } = elements;

  // Clear the calendar
  calendarGrid.innerHTML = "";
  monthLabel.textContent = formatMonth(state.currentMonth);

  const year = state.currentMonth.getFullYear();
  const month = state.currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // --- Add day names row (Mon - Sun) ---
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  dayNames.forEach(name => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "calendar-day-name";
    dayHeader.textContent = name; // safe
    calendarGrid.appendChild(dayHeader);
  });

  // --- Empty cells for alignment ---
  const emptyCells = (firstDay + 6) % 7; // Monday as first day
  for (let i = 0; i < emptyCells; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  // --- Render the days ---
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = dayKey(date);
    const total = dailyTotal(state.expenses, key);

    const cell = document.createElement("div");
    cell.className = "calendar-day";
    if (key === state.selectedDate) cell.classList.add("active");

    // Day number
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    cell.appendChild(dayDiv);

    // Total for the day (if any)
    if (total) {
      const totalSpan = document.createElement("span");
      totalSpan.className = "sum";
      totalSpan.textContent = total; // safe
      cell.appendChild(totalSpan);
    }

    cell.onclick = () => onSelectDate(key);
    calendarGrid.appendChild(cell);
  }
}
