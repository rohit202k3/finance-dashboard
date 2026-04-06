import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function Charts() {
  const { transactions } = useContext(AppContext);

  const categoryData = Object.values(
    transactions.reduce((acc, curr) => {
      if (curr.type === "expense") {
        acc[curr.category] = acc[curr.category] || { name: curr.category, value: 0 };
        acc[curr.category].value += curr.amount;
      }
      return acc;
    }, {})
  );

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <PieChart width={300} height={300}>
        <Pie data={categoryData} dataKey="value" outerRadius={100}>
          {categoryData.map((_, i) => <Cell key={i} />)}
        </Pie>
        <Tooltip />
      </PieChart>

      <LineChart width={300} height={300} data={transactions}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" />
      </LineChart>
    </div>
  );
}