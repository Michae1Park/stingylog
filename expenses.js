// expenses.js
export function expensesForDate(expenses, date) {
  return expenses.filter(e => e.date === date);
}

export function dailyTotal(expenses, date) {
  return expenses
    .filter(e => e.date === date)
    .reduce((sum, e) => sum + e.amount, 0);
}

export function totalInRange(expenses, from, to) {
  return expenses
    .filter(e => e.date >= from && e.date <= to)
    .reduce((sum, e) => sum + e.amount, 0);
}
