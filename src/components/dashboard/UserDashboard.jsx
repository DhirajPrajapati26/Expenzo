import SummaryPage from "./Summary";
import RecentTransactions from "./RecentTransactions";
import ExpenseCategoryChart from "./ExpenseChart";
import { useState, useEffect, useMemo } from "react";


const UserDashboard = () => {

  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("All");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions`,
        { credentials: "include" },
      );

      if (!res.ok) throw new Error("Failed to load transactions");

      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {

      const typeMatch =
        type === "All" || t.type === type;

      const categoryMatch =
        category === "All" || t.category === category;

      return typeMatch && categoryMatch;
    });

  }, [transactions, type, category]);

  const categoryData = filteredTransactions.filter(t => t.type === "expense")
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.category === curr.category)
      if (existing) {
        existing.total += curr.amount
      }
      else {
        acc.push({
          category: curr.category,
          total: curr.amount
        })
      }
      console.log(acc)
      return acc;
    }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Summary Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-4 sm:p-6">
          <SummaryPage />
        </div>

        {/* Charts + Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-4 sm:p-6">
            <ExpenseCategoryChart data={categoryData} />
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-4 sm:p-6">
            <RecentTransactions />
          </div>

        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
