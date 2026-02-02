// state.js
import { today } from "./dates.js";

export const state = {
  currentMonth: (() => {
    const d = new Date();
    d.setDate(1);
    return d;
  })(),

  selectedDate: today(),
  expenses: []
};
