import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import hamburger2 from "../assets/hamburger2.jpg";
import logo from "../assets/logo.webp";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between relative">

        {/* Logo */}
        <Link
          className="flex items-center gap-2 text-xl md:text-2xl font-semibold"
          to="/user"
        >
          <img src={logo} alt="logo" className="w-7 h-7 md:w-8 md:h-8" />
          Expense Tracker
        </Link>

        <div className="hidden min-[700px]:flex items-center gap-10 text-sm font-medium">
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
            className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg hover:bg-indigo-100 transition"
          >
            Logout
          </button>
        </div>

        <button
          className="min-[700px]:hidden"
          onClick={() => setOpen(!open)}
        >
          <img className="h-8" src={hamburger2} alt="menu" />
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-14 left-0 w-full bg-indigo-700 flex flex-col py-4 px-6 space-y-3 min-[700px]:hidden shadow-lg">
            
            <Link
              className="block"
              to="/transaction/create"
              onClick={() => setOpen(false)}
            >
              Add Transaction
            </Link>

            <Link
              className="block"
              to="/transaction"
              onClick={() => setOpen(false)}
            >
              Transactions
            </Link>

            <button
              className="text-left text-red-300"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;