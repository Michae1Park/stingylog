// storage.js
const KEY = "expenses";

export function loadExpenses() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveExpenses(expenses) {
  localStorage.setItem(KEY, JSON.stringify(expenses));
}
