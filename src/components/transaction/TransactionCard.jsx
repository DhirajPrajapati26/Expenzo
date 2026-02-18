import bin from "../../assets/bin.png"
import edit from "../../assets/edit.png"


const TransactionCard = ({ transaction, onDelete, onEdit }) => {
  const isIncome = transaction.type === "income";

  return (
    // <div className="w-full rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-md px-5 py-4 flex justify-between items-start transition hover:shadow-lg">
    <div className="bg-white border border-gray-200 rounded-xl backdrop-blur-md transition shadow-sm p-4 max-w-md">
      {/* TOP ROW */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {transaction.category}
          </h3>

          <p className="text-sm text-gray-500">
            {new Date(transaction.date).toLocaleDateString("en-GB")}
          </p>
        </div>

        <p
          className={`text-lg font-semibold ${isIncome ? "text-emerald-600" : "text-red-600"
            }`}
        >
          {isIncome ? "+" : "-"}₹{transaction.amount}
        </p>
      </div>

      <div className="border-t my-3"></div>

      <div className="flex items-center justify-between">
        {/* LEFT – Payment | Note */}
        <div className="flex items-center gap-2 text-sm">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
            {transaction.paymentMethod}
          </span>

          <span className="text-gray-400">|</span>

          <span className="text-gray-600 truncate max-w-[160px]">
            {transaction.note || "No note"}
          </span>
        </div>

        <div className="flex gap-2 text-sm">
          <button
            onClick={() => onEdit(transaction._id, transaction)}
            className="  text-blue-900 rounded-md px-3 py-1 hover:bg-blue-50 transition"
          >
            <img src={edit} alt="" className="h-5" />
          </button>

          <button
            onClick={() => onDelete(transaction._id)}
            className="  text-red-600 rounded-md px-3 py-1 hover:bg-red-50 transition"
          >
            <img src={bin} className="h-5" />
          </button>
        </div>
      </div>
    </div>

    // </div>
  );
};

export default TransactionCard;
