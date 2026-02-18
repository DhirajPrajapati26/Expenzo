import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Navigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, user, errInfo } = useContext(AuthContext);
  const navigate = useNavigate();
// console.log(useContext(AuthContext));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    navigate("/login");
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-center font-bold text-3xl sm:text-4xl mb-6">
          Create an account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 rounded-md pl-3 border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 rounded-md pl-3 border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errInfo && (
            <p className="text-sm text-red-600 font-medium">{errInfo}</p>
          )}

          <button
            className="h-11 rounded-md w-full text-white bg-blue-600 hover:bg-blue-700 transition"
            type="submit"
          >
            Sign up
          </button>
        </form>

        <div className="flex justify-center mt-5 text-sm sm:text-base">
          <p className="font-medium">Already have an account?</p>
          <Link
            to="/login"
            className="font-semibold text-blue-700 pl-1 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
