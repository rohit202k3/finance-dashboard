import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";

export default function Transactions() {
  const { transactions, setTransactions, search, setSearch, role } =
    useContext(AppContext);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase()),
  );

  // ✅ FIX 1: handleDelete OUTSIDE
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
  };

  const handleAdd = () => {
    if (!formData.date || !formData.amount || !formData.category) return;

    const newTx = {
      id: uuidv4(),
      ...formData,
      amount: Number(formData.amount),
    };

    setTransactions([...transactions, newTx]);

    setFormData({
      date: "",
      amount: "",
      category: "",
      type: "expense",
    });

    setShowForm(false);
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      {/* Top Bar */}
      <div className="flex justify-between mb-3">
        <input
          placeholder="Search..."
          className="border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        {role === "admin" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showForm ? "Close" : "Add"}
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && role === "admin" && (
        <div className="grid md:grid-cols-4 gap-2 mb-4">
          <input
            type="date"
            className="border p-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          <input
            type="number"
            placeholder="Amount"
            className="border p-2"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Category"
            className="border p-2"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />

          <select
            className="border p-2"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 col-span-4"
          >
            Save Transaction
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          {/* Header */}
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Type</th>
              {role === "admin" && <th className="p-4 text-left">Action</th>}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-gray-700">
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="p-4">{t.date}</td>

                {/* Category with badge */}
                <td className="p-4">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                    {t.category}
                  </span>
                </td>

                {/* Amount with color */}
                <td
                  className={`p-4 font-semibold ${
                    t.type === "income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  ₹{t.amount}
                </td>

                {/* Type badge */}
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      t.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                {/* Action */}
                {role === "admin" && (
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-6">
            No transactions found 🚫
          </p>
        )}
      </div>
    </div>
  );
}
