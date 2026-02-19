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
    <div className="flex h-screen  bg-slate-50">

      <div className="flex-1  p-6 md:p-8 space-y-8">

        <SummaryPage />

        <div className="grid lg:grid-cols-2 gap-8">
          <ExpenseCategoryChart data={categoryData} />
          <RecentTransactions className="" />
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
