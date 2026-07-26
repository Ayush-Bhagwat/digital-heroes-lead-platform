import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export default function LeadAnalytics({ leads }) {
  const data = [
    {
      name: "New",
      value: leads.filter((l) => l.status === "New").length,
    },
    {
      name: "Contacted",
      value: leads.filter((l) => l.status === "Contacted").length,
    },
    {
      name: "Qualified",
      value: leads.filter((l) => l.status === "Qualified").length,
    },
    {
      name: "Proposal",
      value: leads.filter((l) => l.status === "Proposal").length,
    },
    {
      name: "Won",
      value: leads.filter((l) => l.status === "Won").length,
    },
    {
      name: "Lost",
      value: leads.filter((l) => l.status === "Lost").length,
    },
  ];

  const COLORS = [
    "#3b82f6",
    "#06b6d4",
    "#8b5cf6",
    "#f59e0b",
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Lead Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Lead Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}