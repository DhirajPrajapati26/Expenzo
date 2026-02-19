import TransactionCard from "./TransactionCard";

const TransactionGrid = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className="mt-1">
      <div
        className="
        w-full
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-3 md:gap-4
      "
      >
        {transactions.map((item) => (
          <div
            key={item._id}
            className="
              bg-white
              rounded-2xl
              border border-slate-200
              hover:border-indigo-200
              transition
              shadow-sm hover:shadow
            "
          >
            <TransactionCard
              transaction={item}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        ))}

        {transactions.length === 0 && (
          <div className="col-span-full text-center py-6 text-slate-400">
            No transactions in this month
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionGrid;
