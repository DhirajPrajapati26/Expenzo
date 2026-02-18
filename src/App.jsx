import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import Navbar from "./components/Navbar";
import CreateTransaction from "./pages/CreateTransaction";
import TransactionPage from "./pages/TransactionPage"
import Dashboard from "./pages/Dashboard"
import UserDashboard from "./components/dashboard/UserDashboard";
import SummaryPage from "./components/dashboard/Summary";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { loading, user } = auth;
  if (loading) return <h2>Loading....</h2>;
  return user ? children : <Navigate to="/" />;
};

const Layout = ({ children }) => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname === "/signup";
  return (
    <div>
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
};

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/user"
              element={<PrivateRoute>{<UserDashboard />}</PrivateRoute>}
            />
            <Route
              path="/transaction/create"
              element={<PrivateRoute>{<CreateTransaction />}</PrivateRoute>}
            />
            <Route
              path="/transaction"
              element={<PrivateRoute>{<TransactionPage />}</PrivateRoute>}
            />
            <Route
              path="/transaction/summary"
              element={<PrivateRoute>{<SummaryPage />}</PrivateRoute>}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
