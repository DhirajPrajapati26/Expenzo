import {
  Wallet,
  PlusCircle,
  List,
  Clock,
  BarChart3,
  LogIn,
  Edit,
} from "lucide-react";
import { Link } from "react-router-dom";

function FeatureCard(feature) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
      <div className="text-indigo-600 mb-2">{feature.icon}</div>
      <h4 className="font-semibold mb-1">{feature.title}</h4>
      <p className="text-sm text-gray-600">{feature.text}</p>
    </div>
  );
}

export default function ExpenseTrackerHomeDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Take Control of Your Money
            </h1>
            <p className="text-base opacity-90 mb-4">
              Add transactions, monitor recent activities and analyze monthly
              spending - all in one simple expense tracker.
            </p>

            <div className="flex gap-4">
              <Link
                to="/signup"
                className="bg-white text-indigo-700 px-6 py-3 rounded-2xl font-semibold shadow"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="border border-white px-6 py-3 rounded-2xl"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <Wallet size={110} className="opacity-80" />
          </div>
        </div>
      </section>

      {/* MOTIVE */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-3">Why This Platform?</h2>
        <p className="text-gray-600">
          Many people lose track of small expenses. This tracker helps you keep
          a clear record of income and spending so you can build better
          financial habits and avoid unnecessary expenses.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <Link to="/transaction/create">
          <FeatureCard
            icon={<PlusCircle size={28} />}
            title="Add Transactions"
            text="Add income or expense with amount, category and note in seconds."
          />
        </Link>
        <Link to="/transaction">
          <FeatureCard
            icon={<List size={28} />}
            title="View Transactions"
            text="See complete history with clean and simple table view."
          />
        </Link>
        <Link>
          <FeatureCard
            icon={<Clock size={28} />}
            title="Recent Activities"
            text="Quick overview of your latest spending and income."
          />
        </Link>
        <Link>
          <FeatureCard
            icon={<BarChart3 size={28} />}
            title="Last Month Summary"
            text="Understand your previous month spending pattern easily."
          />
        </Link>
        <Link>
          <FeatureCard
            icon={<LogIn size={28} />}
            title="Personal Dashboard"
            text="Secure account with private data for every user."
          />
        </Link>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h3 className="text-2xl font-semibold mb-3">
          Start Managing Your Expenses Today
        </h3>
        <p className="text-gray-600 mb-6">Track it. Control it. Save it.</p>

        <div className="flex justify-center gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl">
            Sign Up Now
          </button>
          <button className="border px-6 py-3 rounded-2xl">
            Add Transaction
          </button>
        </div>
      </section>
    </div>
  );
}
