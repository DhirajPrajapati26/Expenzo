import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CreateTransaction = () => {
  const today = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const editingTrans = location.state?.transaction;
  const editingTransId = location.state?.transaction._id;

  const expenseCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Other",
  ];

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Other",
  ];

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: today,
    paymentMethod: "",
    note: "",
  });

  useEffect(() => {
    if (editingTrans) {
      setForm({
        type: editingTrans.type,
        amount: editingTrans.amount,
        category: editingTrans.category,
        paymentMethod: editingTrans.paymentMethod,
        note: editingTrans.note,
        date: editingTrans.date.split("T")[0],
      });
    }
  }, [editingTrans]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const url = editingTrans
        ? `${import.meta.env.VITE_BACKEND_URL}/api/transactions/${editingTransId}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/transactions`;

      const method = editingTrans ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        editingTrans
          ? alert("Transaction updated successfully")
          : alert("Transaction added successfully");
      }
      navigate("/transaction");
      setForm({
        type: "expense",
        amount: "",
        category: "",
        date: today,
        paymentMethod: "",
        note: "",
      });
    } catch (error) {
      console.log("Error creating trans..", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingTrans ? "Update Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Type */}
          <div className="border  border-gray-300 rounded-lg flex overflow-hidden">
            <button
              type="button"
              className={`w-1/2 p-2 transition-all ${form.type === "expense"
                  ? "bg-orange-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700"
                }`}
              onClick={() =>
                setForm({ ...form, type: "expense", category: "" })
              }
            >
              Expense
            </button>

            <button
              type="button"
              className={`w-1/2 p-2 transition-all ${form.type === "income"
                  ? "bg-orange-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700"
                }`}
              onClick={() => setForm({ ...form, type: "income", category: "" })}
            >
              Income
            </button>
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select type
              </option>
              {(form.type === "expense"
                ? expenseCategories
                : incomeCategories
              ).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              max={today}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="CASH">CASH</option>
              <option value="CARD">CARD</option>
              <option value="UPI">UPI</option>
              <option value="BANK">BANK</option>
            </select>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Note (optional)
            </label>
            <textarea
              type="text"
              placeholder="Add a note..."
              name="note"
              value={form.note}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            // disabled={loading}
            type="submit"
            className="mt-2 bg-orange-600 text-white py-2 rounded-lg
                       hover:bg-blue-700 transition font-medium"
          >
            {editingTrans ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTransaction;
