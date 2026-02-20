import { Link } from "react-router-dom";
// import dashboardPreview from "../assets/dashboard-preview.png"; // optional screenshot

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5">
        <h1 className="text-2xl font-bold tracking-wide">
          💰 Expense Tracker
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-white text-indigo-600 font-semibold hover:scale-105 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center text-center px-6 mt-16">
        <h2 className="text-5xl font-bold leading-tight max-w-3xl">
          Take Control of Your Money.
        </h2>

        <p className="mt-6 text-lg max-w-xl text-white/80">
          Track your income, manage expenses, and understand your spending
          habits with beautiful analytics and real-time insights.
        </p>

        <div className="mt-8 space-x-4">
          <Link
            to="/signup"
            className="px-8 py-3 rounded-2xl bg-white text-indigo-600 font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Started Free
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 rounded-2xl border border-white hover:bg-white/20 transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="mt-28 px-8 pb-20 bg-white text-gray-800 rounded-t-[60px]">

        <div className="text-center pt-20">
          <h3 className="text-3xl font-bold">Why Use Our Expense Tracker?</h3>
          <p className="text-gray-500 mt-3">
            Everything you need to manage finances smartly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mt-16 max-w-6xl mx-auto">

          <div className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-3">📊 Smart Analytics</h4>
            <p className="text-gray-600">
              Visual charts and monthly breakdown to understand your spending.
            </p>
          </div>

          <div className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-3">💼 Income & Expense Tracking</h4>
            <p className="text-gray-600">
              Easily add, edit, and delete transactions anytime.
            </p>
          </div>

          <div className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-3">🔐 Secure & Private</h4>
            <p className="text-gray-600">
              Your financial data is safe and protected with authentication.
            </p>
          </div>

        </div>

        {/* PREVIEW SECTION */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold">Clean & Powerful Dashboard</h3>

          {/* <div className="mt-10 flex justify-center">
            <img
              src={dashboardPreview}
              alt="Dashboard Preview"
              className="rounded-3xl shadow-2xl w-full max-w-4xl"
            />
          </div> */}
        </div>

        {/* CTA SECTION */}
        <div className="mt-24 text-center pb-16">
          <h3 className="text-3xl font-bold">
            Ready to manage your finances better?
          </h3>

          <Link
            to="/signup"
            className="inline-block mt-8 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Create Your Free Account
          </Link>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="text-center py-6 text-white/70 text-sm">
        © {new Date().getFullYear()} Expense Tracker. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;