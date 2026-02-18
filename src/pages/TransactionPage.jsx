import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import TransactionGrid from "../components/transaction/TransactionGrid";
import { motion } from "framer-motion";



const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("All");
  const [category, setCategory] = useState("All");
  const isIncome = transactions.type === "income"

  //summaries from backend
  const [monthSummaries, setMonthSummaries] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const getMonthYear = (date) =>
    new Date(date).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  // console.log(type)
  // console.log(category)

  // ================= LOAD TRANSACTIONS =================
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


  // Filter

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {

      const typeMatch =
        type === "All" || t.type === type;

      const categoryMatch =
        category === "All" || t.category === category;

      return typeMatch && categoryMatch;
    });

  }, [transactions, type, category]);

  const categoryData = transactions.filter(t => t.type === "expense")
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


  // ================= GROUP BY MONTH =================
  const transactionsByMonth = useMemo(() => {
    return filteredTransactions.reduce((acc, item) => {
      const monthYear = getMonthYear(item.date);

      if (!acc[monthYear]) acc[monthYear] = [];

      acc[monthYear].push(item);
      return acc;
    }, {});
  }, [filteredTransactions]);


  // ================= LOAD SUMMARY FROM BACKEND =================
  const loadMonthSummary = async (month, year, key) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions/summary?month=${month}&year=${year}`,
        { credentials: "include" },
      );

      const data = await res.json();

      setMonthSummaries((prev) => ({
        ...prev,
        [key]: data,
      }));
    } catch (err) {
      console.log("summary error", err);
    }
  };

  useEffect(() => {
    Object.keys(transactionsByMonth).forEach((monthKey) => {
      const date = new Date(monthKey);

      const m = date.getMonth() + 1;
      const y = date.getFullYear();

      loadMonthSummary(m, y, monthKey);
    });
  }, [transactionsByMonth]);

  // ================= DELETE =================
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

  // ================= EDIT =================
  const handleEdit = (transactionId, transaction) => {
    navigate("/transaction/create", {
      state: { transactionId, transaction },
    });
  };

  // ================= =================
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-slate-500">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500">
        {error}
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-4 py-6 grid gap-5"
    >
      {/* HEADER */}
      <div className="grid sm:grid-cols-2 gap-4 items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Transactions
          </h1>
          <p className="text-sm text-slate-500">
            Track and manage your financial activity
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <select
            className="border rounded-xl px-3 py-2 text-sm"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {type === "expense" ?
            <select
              className="border rounded-xl px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            : type === "income" ?
              <select
                className="border rounded-xl px-3 py-2 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Business">Business</option>
                <option value="Shopping">Shopping</option>
                <option value="Investment">Investment</option>
                <option value="Gift">Gift</option>
                <option value="Other">Other</option>
              </select>
              :
              <select
                className="border rounded-xl px-3 py-2 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Business">Business</option>
                <option value="Shopping">Shopping</option>
                <option value="Investment">Investment</option>
                <option value="Gift">Gift</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
          }

          <Link
            to="/transaction/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl"
          >
            + Add Transaction
          </Link>
        </div>
      </div>

      {filteredTransactions.length === 0 &&
        <div className="rounded-2xl bg-white border shadow p-10 text-center">
          <h2 className="text-xl font-semibold">No transactions</h2>
        </div>
      }

      {/* EMPTY */}
      {transactions.length === 0 ? (
        <div className="rounded-2xl bg-white border shadow p-10 text-center">
          <h2 className="text-xl font-semibold">No transactions yet</h2>
        </div>
      ) : (
        <div className="grid gap-5">
          {Object.entries(transactionsByMonth).map(([month, items]) => {
            //  totals now from backend
            const summary = monthSummaries[month] || {
              income: 0,
              expense: 0,
              balance: 0,
            };

            return (
              <motion.div
                key={month}
                className="rounded-2xl bg-white border shadow"
              >
                {/* MONTH */}
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">{month}</h3>
                </div>

                {/* STATS FROM BACKEND */}
                <div className="p-4 grid  sm:grid-cols-3 gap-3">
                  <div className="p-3   justify-items-center bg-green-50 rounded-xl">
                    <p className="text-xs">Income</p>
                    <p className="text-xl font-bold text-green-600">
                      +₹{summary.income}
                    </p>
                  </div>

                  <div className="p-3 justify-items-center bg-red-50 rounded-xl">
                    <p className="text-xs">Expense</p>
                    <p className="text-xl font-bold text-red-600">
                      - ₹{summary.expense}
                    </p>
                  </div>

                  <div className="p-3 justify-items-center bg-blue-50 rounded-xl">
                    <p className="text-xs">Balance</p>
                    <p className="text-xl font-bold">₹{summary.balance}</p>
                  </div>
                </div>

                <div className="p-3">
                  <TransactionGrid
                    transactions={items}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default TransactionPage;
