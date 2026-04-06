import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function SummaryCards() {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="Balance" value={balance} />
      <Card title="Income" value={income} />
      <Card title="Expense" value={expense} />
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="p-4 bg-white shadow rounded">
    <h2 className="text-gray-500">{title}</h2>
    <p className="text-2xl font-bold">₹{value}</p>
  </div>
);