import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = [
  "#0ea5e9",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
  "#14b8a6",
];

const ExpenseCategoryChart = ({ data }) => {
  const totalExpense = data.reduce((acc, item) => acc + item.total, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl outline-none shadow-sm hover:shadow-md transition p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Spending by Category
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Breakdown of your expenses
        </p>
      </div>

      {data.length === 0 ? (
        <div className="h-72 flex items-center justify-center text-slate-400">
          No expense data available
        </div>
      ) : (
        <div className="h-72 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                stroke="none"
                tabIndex={-1}
                className="focus:outline-none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Total */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-sm text-slate-500">Total</p>
              <p className="text-lg font-semibold text-slate-800">
                ₹{totalExpense}
              </p>
            </div>
          </div>
        </div>
      )}


      {data.length > 0 && (
        <div className="mt-6 space-y-2">
          {data.map((item, index) => (
            <div
              key={item.category}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />
                <span className="text-slate-700">
                  {item.category}
                </span>
              </div>
              <span className="font-medium text-slate-800">
                ₹{item.total}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ExpenseCategoryChart;