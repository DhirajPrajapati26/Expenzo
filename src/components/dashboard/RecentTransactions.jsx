import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecentTransactionList from "../transaction/RecentTransactionsGrid";
import { ArrowRight } from "lucide-react";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTransactions();
  }, []);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  //   const recentTransactions = useMemo(() => {
  //   return [...transactions]
  //     .sort((a, b) => new Date(b.date) - new Date(a.date))
  //     .slice(0, 5);
  // }, [transactions]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions`,
        {
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new error("Failed to load transactions");
      }
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      // console.log(error.message)
      console.log("Error loading transactions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (transactionId) => {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions/${transactionId}`,
        { method: "DELETE", credentials: "include" },
      );

      setTransactions((prev) => prev.filter((n) => n._id !== transactionId));
    } catch (error) {
      setError("Error deleting transaction");
    }
  };

  const handleEdit = (transactionId, transaction) => {
    navigate("/transaction/create", {
      state: { transactionId, transaction },
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-lg transition p-6 ">


      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Recent Transactions
          </h2>
          {/* <p className="text-xs text-slate-500">
            Your latest 5 financial activities
            </p> */}
        </div>

        <Link
          to="/transaction"
          className="text-sm font-medium  flex gap-2 bg-pink-50 px-2 py-1 border rounded-md text-black hover:text-blue-800 transition"
        >
          View All  <ArrowRight size={22} />

        </Link>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-500">
          Loading transactions...
        </div>
      ) : recentTransactions.length === 0 ? (
        <div className="py-10 text-center text-slate-400">
          No recent transactions found.
        </div>
      ) : (
        <RecentTransactionList
          transactions={recentTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default RecentTransactions;
