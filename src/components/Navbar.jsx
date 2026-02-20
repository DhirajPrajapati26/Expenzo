import { FiMenu, FiX } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import hamburger2 from "../assets/hamburger2.jpg";
import logo from "../assets/logo.webp";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);


  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">

          {/* Hamburger */}
          <button
            className="min-[700px]:hidden p-2 rounded-lg hover:bg-white/20 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          {/* Logo */}
          <Link
            className="flex items-center gap-2 font-semibold tracking-wide"
            to="/user"
          >
            <img
              src={logo}
              alt="logo"
              className="w-7 h-7 sm:w-8 sm:h-8"
            />
            <span className="text-sm sm:text-xl whitespace-nowrap">
              Expense Tracker
            </span>
          </Link>

        </div>

        {/* Desktop Menu */}
        <div className="hidden min-[700px]:flex items-center gap-8 text-sm font-medium">

          <Link
            to="/transaction/create"
            className="text-indigo-100 hover:text-white transition"
          >
            Add Transaction
          </Link>

          <Link
            to="/transaction"
            className="text-indigo-100 hover:text-white transition"
          >
            Transactions
          </Link>

          <button
            onClick={logout}
            className="bg-white text-indigo-600 px-4 py-1.5 rounded-xl font-medium hover:bg-indigo-100 transition"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="min-[700px]:hidden bg-indigo-600/95 backdrop-blur-md px-6 py-4 space-y-4 shadow-lg">

          <Link
            className="block text-indigo-100 hover:text-white transition"
            to="/transaction/create"
            onClick={() => setOpen(false)}
          >
            Add Transaction
          </Link>

          <Link
            className="block text-indigo-100 hover:text-white transition"
            to="/transaction"
            onClick={() => setOpen(false)}
          >
            Transactions
          </Link>

          <button
            className="block text-left text-red-200 hover:text-red-100 transition"
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
};

export default Navbar;