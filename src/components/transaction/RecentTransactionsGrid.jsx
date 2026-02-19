import bin from "../../assets/bin.png"
import edit from "../../assets/edit.png"
const RecentTransactionList = ({ transactions, onDelete, onEdit }) => {
    return (
        <div className="divide-y  divide-slate-100" >
            {transactions.map((item) => {
                const isIncome = item.type === "income";

                return (
                    <div
                        key={item._id}
                        className="flex  items-center justify-between py-4 hover:bg-slate-50 px-2 rounded-xl transition"
                    >

                        <div>
                            <p className="font-medium text-slate-800">
                                {item.category}
                            </p>
                            <p className="text-sm text-slate-500">
                                {new Date(item.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span
                                className={`font-semibold ${isIncome ? "text-green-600" : "text-red-500"
                                    }`}
                            >
                                {isIncome ? "+" : "-"}₹{item.amount}
                            </span>

                            <button
                                onClick={() => onEdit(item._id, item)}
                                className="text-xs text-slate-400 hover:text-slate-600"
                            >
                                <img src={edit} className="h-4" alt="" />
                            </button>

                            <button
                                onClick={() => onDelete(item._id)}
                                className="text-xs text-red-400 hover:text-red-600"
                            >
                                <img src={bin} className="h-4" alt="" />
                            </button>
                        </div>
                    </div>
                );
            })}

            {transactions.length === 0 && (
                <div className="text-center py-6 text-slate-400">
                    No transactions yet.
                </div>
            )}
        </div>
    );
};

export default RecentTransactionList;