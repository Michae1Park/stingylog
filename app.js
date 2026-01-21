const amountInput = document.getElementById("amount");
const noteInput = document.getElementById("note");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function render() {
  list.innerHTML = "";

  const todayExpenses = expenses.filter(e => e.date === today());
  let total = 0;

  todayExpenses.forEach(e => {
    total += e.amount;

    const li = document.createElement("li");
    li.innerHTML = `<span>${e.note}</span><strong>${e.amount}</strong>`;
    list.appendChild(li);
  });

  totalEl.textContent = `Total: ${total}`;
}

addBtn.onclick = () => {
  const amount = Number(amountInput.value);
  const note = noteInput.value.trim();

  if (!amount) return;

  expenses.push({
    amount,
    note,
    date: today()
  });

  save();
  render();

  amountInput.value = "";
  noteInput.value = "";
};

render();
