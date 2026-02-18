import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Navigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, errInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/user");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (user) {
    return <Navigate to="/user" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-center font-bold text-3xl sm:text-4xl mb-6">
          Login
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
            Login
          </button>
        </form>

        <div className="flex justify-center mt-5 text-sm sm:text-base">
          <p className="font-medium">Don't have an account?</p>
          <Link
            to="/signup"
            className="font-semibold text-blue-700 pl-1 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
