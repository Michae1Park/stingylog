// state.js
import { today } from "./dates.js";

// Create a Date object representing the first day of the current month
const firstDayOfCurrentMonth = new Date();
firstDayOfCurrentMonth.setDate(1);

export const state = {
  currentMonth: firstDayOfCurrentMonth,  // the month currently displayed in the calendar
  selectedDate: today(),                 // the date the user has selected (defaults to today)
  expenses: []                           // array to hold all expense entries
};
