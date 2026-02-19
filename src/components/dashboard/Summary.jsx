import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import CountUp from "react-countup";


const SummaryPage = () => {
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSummary = async (m = month, y = year) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions/summary?month=${m}&year=${y}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("Failed to load summary");

      const data = await res.json();
      setSummary(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, [month, year]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-24 text-slate-500">
        Loading summary...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-24 text-red-500">
        {error}
      </div>
    );

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-2"
    >
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Monthly Summary
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Overview of income and expenses
          </p>
        </div>

        <div className="flex gap-3">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString("en", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards */}
      {/* <div className="grid lg:grid-cols-3 gap-6">

        {/* Income */}
      {/* <div className="relative bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="absolute top-0 left-0 h-1 w-full bg-green-500 rounded-t-2xl" />

          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-medium text-slate-500">
              Income
            </span>
            <div className="p-2 rounded-lg bg-green-100 text-green-600">
              <TrendingUp size={18} />
            </div>
          </div>

          <p className="text-4xl font-bold text-slate-900 tracking-tight">
            ₹{summary.income}
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Total earnings this month
          </p>
        </div> */}

      {/* Expense */}
      {/* <div className="relative bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="absolute top-0 left-0 h-1 w-full bg-red-500 rounded-t-2xl" />

          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-medium text-slate-500">
              Expense
            </span>
            <div className="p-2 rounded-lg bg-red-100 text-red-600">
              <TrendingDown size={18} />
            </div>
          </div>

          <p className="text-4xl font-bold text-slate-900 tracking-tight">
            ₹{summary.expense}
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Total spending this month
          </p>
        </div> */}

      {/* Balance */}
      {/* <div className="relative bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="absolute top-0 left-0 h-1 w-full bg-blue-500 rounded-t-2xl" />

          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-medium text-slate-500">
              Balance
            </span>
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Wallet size={18} />
            </div>
          </div>

          <p
            className={`text-4xl font-bold tracking-tight ${
              summary.balance >= 0
                ? "text-slate-900"
                : "text-red-600"
            }`}
          >
            ₹{summary.balance}
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Net position this period
          </p>
        </div> */}

      {/* </div>  */}

      <div className="grid   lg:grid-cols-3 gap-5">

        {/* Income */}
        <div className=" p-2 bg-white rounded-2xl shadow-md flex justify-between items-center">

          <div>
            <p className="text-slate-500 font-medium mb-2">
              Total Income
            </p>

            <p className="text-3xl font-bold text-slate-900">
              <CountUp end={summary.income} duration={1.2} prefix="₹" />
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl">
            <TrendingUp size={22} className="text-green-600" />
          </div>
        </div>


        {/* Expense */}
        <div className="bg-white p-2  rounded-2xl shadow-md flex justify-between items-center">

          <div>
            <p className="text-slate-500 font-medium mb-2">
              Total Expenses
            </p>

            <p className="text-3xl font-bold text-slate-900">
              <CountUp end={summary.expense} duration={1.2} prefix="₹" />
            </p>
          </div>

          <div className="bg-red-100 p-4 rounded-xl">
            <TrendingDown size={22} className="text-red-600" />
          </div>
        </div>


        {/* Balance */}
        <div className="bg-white p-2 rounded-2xl shadow-md flex justify-between items-center">

          <div>
            <p className="text-slate-500 font-medium mb-2">
              Balance
            </p>

            <p className="text-3xl font-bold text-slate-900">
              <CountUp end={summary.balance} duration={1.2} prefix="₹" />
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl">
            <Wallet size={22} className="text-green-600" />
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default SummaryPage;