import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useContext(AppContext);

  const expenses = transactions.filter(t => t.type === "expense");

  const categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const highest = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  , Object.keys(categoryTotals)[0]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold">Insights</h2>
      <p>Top spending: {highest}</p>
    </div>
  );
}